import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { io } from 'socket.io-client';
import { BottomSheet, ListItem } from 'react-native-elements';

import { useConfig, useSocket, useSocketUrl } from '../contexts/context';
import { KOTGroup, RootStackScreenProps } from '../types';
import api from '../utils/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function CameraScreen({ navigation }: RootStackScreenProps<'Camera'>) {
    const dummy: any[] = []
    const ktempy: KOTGroup[] = []
    const _kotgrp: KOTGroup | any = {}

    const { config, setConfig } = useConfig();
    const { url, setUrl } = useSocketUrl();
    const { socket, connect } = useSocket();

    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [serverUrl, setServerUrl] = useState("");
    const [sheetVisiblity, setSheetVisiblity] = useState(false);
    const [kotgroups, setKotgroups] = useState(ktempy);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        const sUrl = "http://" + data
        api.checkserverstatus(new URL('checkserverstatus', sUrl).href).then(async response => {
            if (response.data.status == 200) {
                getKOTGroups(sUrl)
                setServerUrl(sUrl)
                // setUrl(sUrl)
                // connect(io(sUrl))
                // await AsyncStorage.setItem("@serverurl", sUrl)
                // navigation.replace('Root')
            }
        }, async error => {
            console.log("http://" + data + " is not the server")
        })
    };

    const getKOTGroups = (sUrl: string) => {
        api.getkotgroups(new URL('getdbdata', sUrl).href).then(async dbdata => {
            const ktgrps: KOTGroup[] = dbdata.data.printersettings[0].kotgroups
            setKotgroups(ktgrps)
            setSheetVisiblity(true)
        }, async err => {
            console.log("Failed to fetch kotgrps", err)
        })
    }

    const setKG = async (KG: KOTGroup) => {
        console.log(serverUrl)
        await AsyncStorage.multiSet([["@serverurl", serverUrl],["@kotgroupid", KG.KOTGroupId.toString()]])
        setConfig({ ...config, url: serverUrl, socket: io(serverUrl), KOTGroupId: KG.KOTGroupId, KOTGroup: KG.Description })
        // setCKG(KG)
        setSheetVisiblity(false)
        toRoot()
    }

    const toRoot = () => {
        navigation.replace('Root')
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                ratio='1:1'
                barCodeScannerSettings={{
                    barCodeTypes: ['qr'],
                }}
                style={StyleSheet.absoluteFillObject}
            />
            {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
            <BottomSheet modalProps={{}} isVisible={sheetVisiblity}>
                <ListItem
                    key={'cancel_sheet'}
                    onPress={() => setSheetVisiblity(false)}>
                    <ListItem.Content>
                        <ListItem.Title>{""}</ListItem.Title>
                    </ListItem.Content>
                    <TouchableOpacity onPress={() => setSheetVisiblity(false)} style={{ padding: 5 }}>
                        <AntDesign name="close" size={24} color="red" />
                    </TouchableOpacity>
                </ListItem>
                {kotgroups.map((kg, i) => (
                    <ListItem
                        key={i}
                        onPress={() => setKG(kg)}>
                        <ListItem.Content>
                            <ListItem.Title>{kg.Description}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

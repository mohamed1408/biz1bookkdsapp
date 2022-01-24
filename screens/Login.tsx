import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, ActivityIndicator } from 'react-native';
import { io } from 'socket.io-client';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { useConfig } from '../contexts/context';
import { KOTGroup, RootStackScreenProps } from '../types';
import api from '../utils/Api'
import { BottomSheet, ListItem } from 'react-native-elements';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
    const dummy: any[] = []
    const ktempy: KOTGroup[] = []
    const _kotgrp: KOTGroup | any = {}

    const { config, setConfig } = useConfig();

    const [serverUrl, setServerUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [kotgroups, setKotgroups] = useState(ktempy);
    const [message, setMessage] = useState("");
    const [cKg, setCKG] = useState(_kotgrp)
    const [sheetVisiblity, setSheetVisiblity] = useState(false);

    useEffect(() => {
        checkStorageUrl()
    }, dummy);

    async function checkStorageUrl() {
        const key_values: [string, string | null][] = await AsyncStorage.multiGet(["@serverurl", "@kotgroupid"]) || ''
        let sUrl: string = ""
        let kgid: number = 0
        key_values.forEach(key_val => {
            switch (key_val[0]) {
                case "@serverurl":
                    sUrl = key_val[1] ? key_val[1] : ""
                case "@kotgroupid":
                    kgid = key_val[1] ? +key_val[1] : 0
            }
        })
        console.log(key_values)
        checkServerStatus(sUrl, kgid)
    }

    function onInput(text: string) {
        setServerUrl(text)
    }

    function saveUrl() {
        // setServerUrl(serverUrl)
        setLoading(true)
        checkServerStatus("http://" + serverUrl, 0)
        // // console.log(serverUrl)
        // // return
        // api.checkserverstatus(new URL('checkserverstatus', "http://" + serverUrl).href).then(async response => {
        //     console.log(response.data.status)
        //     setLoading(false)
        //     if (response.data.status == 200) {
        //         setConfig({ ...config, url: serverUrl, socket: io(serverUrl) })
        //         setMessage("")
        //         AsyncStorage.setItem("@serverurl", "http://" + serverUrl).then(data => console.log("async st success", "http://" + serverUrl), error => console.log("async st error", error))
        //         ToastAndroid.show("Connection established", ToastAndroid.SHORT)
        //         navigation.navigate('Root')
        //     }
        // }, error => {
        //     setLoading(false)
        //     console.log("error")
        //     setMessage("No server running in this address")
        //     ToastAndroid.show("No server running in this address", ToastAndroid.SHORT)
        // })
    }

    const checkServerStatus = (sUrl: string, kgid: number) => {
        api.checkserverstatus(new URL('checkserverstatus', sUrl).href).then(async response => {
            setLoading(false)
            if (response.data.status == 200) {
                setServerUrl(sUrl)
                api.getkotgroups(new URL('getdbdata', sUrl).href).then(async dbdata => {
                    const ktgrps: KOTGroup[] = dbdata.data.printersettings[0].kotgroups
                    if (ktgrps.some(x => x.KOTGroupId == kgid)) {
                        await AsyncStorage.multiSet([["@serverurl", sUrl],["@kotgroupid", ktgrps.filter(x => x.KOTGroupId == kgid)[0].KOTGroupId.toString()]])
                        setConfig({ ...config, url: sUrl, socket: io(sUrl), KOTGroupId: ktgrps.filter(x => x.KOTGroupId == kgid)[0].KOTGroupId, KOTGroup: ktgrps.filter(x => x.KOTGroupId == kgid)[0].Description })
                        toRoot()
                        return
                    }
                    setKotgroups(ktgrps)
                    setSheetVisiblity(true)
                }, async err => {
                    console.log("Failed to fetch kotgrps", err)
                })
            }
        }, async error => {
            console.log("error")
            setLoading(false)
        })
    }

    const setKG = async (KG: KOTGroup) => {
        await AsyncStorage.multiSet([["@serverurl", serverUrl],["@kotgroupid", KG.KOTGroupId.toString()]])
        setConfig({ ...config, url: serverUrl, socket: io(serverUrl), KOTGroupId: KG.KOTGroupId, KOTGroup: KG.Description })
        setSheetVisiblity(false)
        toRoot()
    }

    const toRoot = () => {
        navigation.replace('Root')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[{ position: 'absolute', top: '5%', right: '10%' }]}
                onPress={() => navigation.navigate('Camera')}>
                <MaterialCommunityIcons name="qrcode-plus" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={onInput}
                // value={number}
                placeholder="Enter server address"
                keyboardType="default"
            />
            <Text style={styles.title}>Enter server address.</Text>
            <Text style={styles.message}>{message}</Text>
            {!loading ?
                (
                    <TouchableOpacity disabled={!serverUrl} onPress={() => saveUrl()} style={styles.link}>
                        <Text style={styles.linkText}>Connect</Text>
                    </TouchableOpacity>
                ) :
                (
                    <ActivityIndicator size="small" color="#0000ff" style={styles.link} />
                )}
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    message: {
        fontSize: 16,
        color: 'red',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#e5eaf0',
        padding: 10,
    },
});

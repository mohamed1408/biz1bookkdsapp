import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, ActivityIndicator } from 'react-native';
import { io } from 'socket.io-client';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { Config, useConfig } from '../contexts/context';
import { KOTGroup, RootStackScreenProps } from '../types';
import api from '../utils/Api'
import { Avatar, BottomSheet, ListItem } from 'react-native-elements';
import IMAGES from '../assets/images/index'

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
    const dummy: any[] = []
    const ktempy: KOTGroup[] = []
    // const _kotgrp: KOTGroup | any = {}

    const { config, setConfig } = useConfig();

    // const [serverUrl, setServerUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [kotgroups, setKotgroups] = useState(ktempy);
    const [message, setMessage] = useState("");
    // const [cKg, setCKG] = useState(_kotgrp)
    const [sheetVisiblity, setSheetVisiblity] = useState(false);
    const [loginForm, setLoginForm] = useState({ emailId: "", password: "" });

    useEffect(() => {
        checkStorageUrl()
    }, dummy);

    async function checkStorageUrl() {
        const key_values: [string, string | null][] = await AsyncStorage.multiGet(["@CompanyId", "@kotgroupid"]) || ''
        let companyid: number = 0
        let kgid: number = 0
        key_values.forEach(key_val => {
            switch (key_val[0]) {
                case "@CompanyId":
                    companyid = key_val[1] ? +key_val[1] : 0
                case "@kotgroupid":
                    kgid = key_val[1] ? +key_val[1] : 0
            }
        })
        console.log(key_values)
        // checkServerStatus("http://192.168.1.4:8000", kgid)
        if (companyid > 0) {
            // setConfig({ ...config, CompanyId: companyid })
            getKotGroups(companyid, kgid)
        }
    }

    function LoadingButton({ title, loading }: { title: string; loading: boolean }) {
        return (
            <TouchableOpacity
                style={[styles.loadinButton, { backgroundColor: loading ? '#7ac2ff' : '#2e78b7' }]}
                disabled={loading}
                onPress={Login}
            >
                {
                    loading
                        ? (<ActivityIndicator size="small" color="white" />)
                        : (<Text style={{ textAlign: 'center', color: 'white' }}>{title}</Text>)
                }
            </TouchableOpacity>
        )
    }

    function setEmail(text: string) {
        setLoginForm(prev => ({ ...prev, emailId: text }))
    }

    function setPassword(text: string) {
        setLoginForm(prev => ({ ...prev, password: text }))
    }

    // function saveUrl() {
    //     setLoading(true)
    //     checkServerStatus("http://" + serverUrl, 0)
    // }

    const Login = () => {
        setLoading(true)
        try {
            api.login(loginForm).then(response => {
                if (response.data.status != 200) {
                    setLoading(false)
                    setMessage("Credentials didn't match")
                } else {
                    setMessage("")
                    setConfig({ ...config, CompanyId: response.data.company.Id })
                    getKotGroups(response.data.company.Id, 0)
                }
            }, err => {
                setLoading(false)
                console.log("err")
            })
        } catch (err) {
            setLoading(false)
            console.log("err")
        }
    }

    const getKotGroups = (companyId: number, kgid: number) => {
        api.kotGroups(companyId).then(data => {
            const ktgrps: KOTGroup[] = data.data
            setKotgroups(ktgrps)
            if (ktgrps.some(x => x.Id == kgid)) {
                setKG(ktgrps.filter(x => x.Id == kgid)[0], companyId)
            } else {
                setSheetVisiblity(true)
                setLoading(false)
            }
        })
    }
    // const checkServerStatus = (sUrl: string, kgid: number) => {
    //     api.checkserverstatus(new URL('checkserverstatus', sUrl).href).then(async response => {
    //         setLoading(false)
    //         if (response.data.status == 200) {
    //             setServerUrl(sUrl)
    //             api.getkotgroups(new URL('getdbdata', sUrl).href).then(async dbdata => {
    //                 const ktgrps: KOTGroup[] = dbdata.data.printersettings[0].kotgroups
    //                 if (ktgrps.some(x => x.Id == kgid)) {
    //                     await AsyncStorage.multiSet([["@serverurl", sUrl], ["@kotgroupid", ktgrps.filter(x => x.Id == kgid)[0].Id.toString()]])
    //                     setConfig({ ...config, url: sUrl, socket: io(sUrl), KOTGroupId: ktgrps.filter(x => x.Id == kgid)[0].Id, KOTGroup: ktgrps.filter(x => x.Id == kgid)[0].Description })
    //                     toRoot()
    //                     return
    //                 }
    //                 setKotgroups(ktgrps)
    //                 setSheetVisiblity(true)
    //             }, async err => {
    //                 console.log("Failed to fetch kotgrps", err)
    //             })
    //         }
    //     }, async error => {
    //         console.log("error")
    //         setLoading(false)
    //     })
    // }

    const setKG = async (KG: KOTGroup, CompanyId: number) => {
        await AsyncStorage.multiSet([["@kotgroupid", KG.Id.toString()], ["@CompanyId", CompanyId.toString()]])
        setConfig({ ...config, KOTGroupId: KG.Id, KOTGroup: KG.Description, CompanyId: CompanyId })
        setSheetVisiblity(false)
        toRoot()
    }

    const toRoot = () => {
        navigation.replace('Root')
    }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity
                style={[{ position: 'absolute', top: '5%', right: '10%' }]}
                onPress={() => navigation.navigate('Camera')}>
                <MaterialCommunityIcons name="qrcode-plus" size={24} color="white" />
            </TouchableOpacity> */}
            <View style={styles.card}>
                <Avatar rounded size={50} source={IMAGES.icon} containerStyle={[styles.cardImg]} />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    textAlign='center'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder="Password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    textAlign='center'
                />
                <Text style={styles.message}>{message}</Text>
                <TouchableOpacity style={styles.link}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
                <LoadingButton title='Log In' loading={loading} />
            </View>
            <BottomSheet modalProps={{}} isVisible={sheetVisiblity}>
                <ListItem
                    key={'cancel_sheet'}
                    onPress={() => setSheetVisiblity(false)}>
                    <ListItem.Content>
                        {/* <ListItem.Title>{""}</ListItem.Title> */}
                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#2e78b7', width: '100%' }}>Select a KOT Group</Text>
                    </ListItem.Content>
                    <TouchableOpacity onPress={() => setSheetVisiblity(false)} style={{ padding: 5 }}>
                        <AntDesign name="close" size={24} color="red" />
                    </TouchableOpacity>
                </ListItem>
                {kotgroups.map((kg, i) => (
                    <ListItem
                        key={i}
                        onPress={() => setKG(kg, config.CompanyId)}>
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
        backgroundColor: '#141313',
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
        // marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    input: {
        height: 40,
        margin: 12,
        // borderWidth: 1,
        borderRadius: 2,
        backgroundColor: 'white',
        elevation: 3,
        padding: 10,
        width: '70%'
    },
    loadinButton: {
        width: '50%',
        borderRadius: 5,
        elevation: 2,
        padding: 5
    },
    card: {
        backgroundColor: '#fff',
        width: '80%',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        borderRadius: 5,
        position: 'relative'
    },
    cardImg: {
        position: 'absolute',
        top: -25,
        elevation: 3
    }
});

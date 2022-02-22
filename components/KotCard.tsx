import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert, View as RnView } from 'react-native';
import Checkbox from 'expo-checkbox';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import useInterval from '../utils/timer'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { KOT } from '../types';

interface Props {
    kot: any;
    changestatus: any;
    changeItemStatus: any;
    update_helper: boolean;
}

const colors = {
    'green': '#389b3a',
    'black': '#222222',
    'yellow': '#eeaa00',
    'red': '#f24e40',
    'purple': "#800080"
}

export default function KotCard({ kot, changestatus, changeItemStatus, update_helper }: { kot: KOT, changestatus: any, changeItemStatus: any, update_helper: boolean }) {

    const [KOT, setKOT] = useState(kot);
    const [hide, setHide] = useState(false);
    const [time_left, setTimeLeft] = useState("00:00");
    const [headerColor, setHeaderColor] = useState(colors.red)

    useEffect(() => {
        // Update the document title using the browser API
        let color = ""
        if (KOT.KOTStatusId == 1) {
            setHeaderColor(colors.red)
        } else if (KOT.KOTStatusId == 2) {
            setHeaderColor(colors.yellow)
        } else if (KOT.KOTStatusId == 3) {
            setHeaderColor(colors.green)
        } else if (KOT.KOTStatusId == 4) {
            setHeaderColor(colors.purple)
        }
    });

    useInterval(() => {
        const current_time = new Date().getTime()
        const delivery_time = new Date(KOT.deliverytimestamp).getTime()
        if (delivery_time) {
            setTimeLeft((delivery_time > current_time) ? new Date(delivery_time - current_time).toISOString().substr(11, 8) : "00:00")
            // console.log(KOT.ordername)
        }
    }, 1000);

    const getOrderType = (orderTypeId: number) => {
        const orderTypes = ["Dine In", "Take Away", "Delivery", "Pick Up", "Counter", "Online"]
        return orderTypes[orderTypeId]
    }

    const changeStatus = (statusId: number, refid: string, url: string) => {
        // let _kot = KOT
        // _kot.KOTStatusId = statusId
        // setKOT(_kot)
        // setHide(true)
        changestatus(statusId, refid, url)
        // console.log(KOT.KOTStatusId)
    }

    const getStatusBtn = () => {
        if (KOT.KOTStatusId == 1) {
            return (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.yellow }]}
                    onPress={() => { changeStatus(2, KOT.refid, KOT.sockUrl) }}>
                    <Text style={{ color: 'white' }}>Start</Text>
                </TouchableOpacity>)
        } else if (KOT.KOTStatusId == 2) {
            return (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.green, flex: 1 }]}
                    onPress={() => { changeStatus(3, KOT.refid, KOT.sockUrl) }}>
                    <Text style={{ color: 'white' }}>Complete</Text>
                </TouchableOpacity>)
        } else if (KOT.KOTStatusId == 3) {
            return (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.purple, flex: 1 }]}
                    onPress={() => { changeStatus(4, KOT.refid, KOT.sockUrl) }}>
                    <Text style={{ color: 'white' }}>Serve</Text>
                </TouchableOpacity>)
        }
    }

    const kotItem = (item: any, index: number) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }} key={"child-" + index}
                onPress={() => changeItemStatus(item.kotrefid, item.ProductKey, item.completed)}
                disabled={KOT.KOTStatusId != 2}>
                {/* <View style={{ flex: 1 }}>
                    <Text style={{ backgroundColor: 'black', width: 5, height: 5, borderRadius: 50, margin: 5 }}></Text>
                </View> */}
                {item.completed
                    ? <Feather style={{ flex: 1, paddingVertical: 5, alignSelf: 'center' }} name="check-circle" size={15} color="green" />
                    : <Feather style={{ flex: 1, paddingVertical: 5, alignSelf: 'center' }} name="circle" size={15} color={colors.yellow} />}
                {item.Quantity > 0
                    ? <Text style={{ flex: 1, alignSelf: 'center' }}>{item.Quantity + '  x'}</Text>
                    : <Text style={[{ flex: 1, alignSelf: 'center' }, styles.textStrikeThrough]}>{Math.abs(item.Quantity) + '  x'}</Text>
                }
                {item.Quantity > 0
                    ? <Text style={{ flex: 9, alignSelf: 'center' }}>{item.showname}</Text>
                    : <Text style={[{ flex: 9, alignSelf: 'center' }, styles.textStrikeThrough]}>{item.showname}</Text>
                }
            </TouchableOpacity>
        )
    }

    const create_UUID = () => {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    return (
        <View style={[styles.cardContainer]}>
            <View style={[styles.card]}>
                <View style={[styles.cardHeader, { backgroundColor: headerColor }]}>
                    {/* <Text style={[styles.carHeaderLeft, { color: 'white' }]}>#{KOT.KOTNo} - {kotStatusId}</Text> */}
                    <View style={[styles.carHeaderLeft]}>
                        <Text style={{ color: 'white', marginBottom: 10 }}>{KOT.KOTStatusId < 3 ? time_left : 'Completed'}</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{KOT.ordername.toUpperCase()}</Text>
                    </View>
                    <View style={[styles.carHeaderRight]}>
                        <Text style={{ color: 'white' }}>#{KOT.KOTNo}</Text>
                        <Text style={{ color: 'white' }}>{KOT.invoiceno}</Text>
                    </View>
                </View>
                {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
                <View style={[styles.cardBody]}>
                    <FlatList
                        // key={create_UUID()}
                        data={KOT.Items}
                        keyExtractor={(item, index) => create_UUID()}
                        renderItem={({ item, index }) => kotItem(item, index)}
                    />
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View style={[styles.cardFooter]}>
                    <View style={[styles.carFooterLeft]}>
                        <Text><Text style={{ fontWeight: 'bold' }}>Delivery Time: </Text>
                            {KOT.deliverytimestamp}</Text>
                        <TouchableOpacity onPress={() => (KOT.KOTStatusId - 1) > 0 ? changeStatus(KOT.KOTStatusId - 1, KOT.refid, KOT.sockUrl) : console.log("lowest status reached.")}>
                            <Text lightColor='red'>{"Undo"}</Text>
                        </TouchableOpacity>
                        {/* <Text><Text style={{ fontWeight: 'bold' }}>Remaining Time: </Text>
                            2 Hrs, 30 Mins</Text> */}
                    </View>
                    <View style={[styles.carFooterRight]}>
                        {getStatusBtn()}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 10,
        height: 1,
        width: '100%',
    },
    cardContainer: {
        width: '100%',
        padding: 20,
    },
    card: {
        // padding: 20,
        borderWidth: 0,
        borderRadius: 10,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        // borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        // backgroundColor: colors.red,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    carHeaderLeft: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff00',
    },
    carHeaderRight: {
        flex: 1,
        alignItems: 'flex-end',
        backgroundColor: '#ffffff00',
    },
    cardBody: {

    },
    cardFooter: {
        flexDirection: 'row',
        padding: 20,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    carFooterLeft: {
        flex: 3,
        fontWeight: 'bold',
    },
    carFooterRight: {
        flex: 1,
        alignItems: 'flex-end',
        display: 'flex',
    },
    button: {
        alignItems: "center",
        // backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 3,
        elevation: 3
    },
    textStrikeThrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    }
});
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

interface Props {
    kot: any;
    changestatus: any;
    kotStatusId: any
}

export default function KotCard({ kot, changestatus, kotStatusId }: { kot: any, changestatus: any, kotStatusId: number }) {

    const [KOT, setKOT] = useState(kot);
    const [hide, setHide] = useState(false);

    const getOrderType = (orderTypeId: number) => {
        const orderTypes = ["Dine In", "Take Away", "Delivery", "Pick Up", "Counter", "Online"]
        return orderTypes[orderTypeId]
    }
    const changeStatus = (statusId: number, refid: string) => {
        // let _kot = KOT
        // _kot.KOTStatusId = statusId
        // setKOT(_kot)
        // setHide(true)
        changestatus(statusId, refid)
        // console.log(KOT.KOTStatusId)
    }

    const kotItem = (item: any, index: number) => {
        return (
            <View style={{ flexDirection: 'row' }} key={"child-" + index}>
                <View style={{ flex: 1 }}>
                    <Text style={{ backgroundColor: 'black', width: 5, height: 5, borderRadius: 50, margin: 5 }}></Text>
                </View>
                <Text style={{ flex: 8 }}>{item.showname}</Text>
                <Text style={{ flex: 1 }}>x</Text>
                <Text style={{ flex: 1, alignSelf: 'flex-end' }}>{item.Quantity.toFixed(1)}</Text>
            </View>
        )
    }

    return (
        <View style={[styles.cardContainer]}>
            <View style={[styles.card]}>
                <View style={[styles.cardHeader]}>
                    <Text style={[styles.carHeaderLeft]}>#{KOT.KOTNo} - {kotStatusId}</Text>
                    <View style={[styles.carHeaderRight]}>
                        <Text>{KOT.invoiceno}</Text>
                        <Text>{getOrderType(KOT.ordertypeid)}</Text>
                    </View>
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View style={[styles.cardBody]}>
                    {/* <FlatList
                        key={KOT.refid + "#"}
                        data={KOT.Items}
                        keyExtractor={(item, index) => item.ProductKey}
                        renderItem={({ item, index }) => kotItem(item, index)}
                    /> */}
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View style={[styles.cardFooter]}>
                    <View style={[styles.carFooterLeft]}>
                        <Text><Text style={{ fontWeight: 'bold' }}>Delivery Time: </Text>
                            {KOT.CreatedDate}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Remaining Time: </Text>
                            2 Hrs, 30 Mins</Text>
                    </View>
                    <View style={[styles.carFooterRight]}>
                        <TouchableOpacity
                            // disabled={hide}
                            style={styles.button}
                            onPress={() => { changeStatus(1, KOT.refid) }}>
                            <Text>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
    },
    cardContainer: {
        width: '100%',
        padding: 20,
    },
    card: {
        padding: 20,
        borderWidth: 0,
        // borderRadius: 5,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row'
    },
    carHeaderLeft: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
    },
    carHeaderRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    cardBody: {

    },
    cardFooter: {
        flexDirection: 'row'
    },
    carFooterLeft: {
        flex: 3,
        fontWeight: 'bold',
    },
    carFooterRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
    },
});

// const areEqual = (prevProps: any, nextProps: any) => {
//     console.log(prevProps, nextProps)
//     // Alert.alert(prevProps, nextProps)
//     return true
// }
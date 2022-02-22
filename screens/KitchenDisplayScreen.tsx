import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, ToastAndroid, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

import KotCard from "../components/KotCard"
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, KOT } from '../types';
import api from '../utils/Api'
import { useConfig } from '../contexts/context'

const colors = {
  'green': '#389b3a',
  'black': '#222222',
  'yellow': '#eeaa00',
  'red': '#f24e40'
}

export default function KitchenDisplayScreen({ navigation }: RootTabScreenProps<'KitchenDisplay'>) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.replace('MoreScreen')}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color={'#2f95dc'} style={{ marginRight: 15 }} />
        </Pressable>
      )
    })
  })
  let kotCache: Array<KOT> = []
  const _kots: KOT[] = []

  const { config, setConfig } = useConfig()

  const [KOTS, setKOTS] = useState(_kots);
  const [update_helper, indicateUpdate] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState(0);

  useEffect(() => {
    // setRefreshing(false)
    // setConfig({ ...config, indicator: !config.indicator })
    console.log(config.sockets.length)
    socketConfig()
    // getKots()
  }, []);
  
  const notify = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getKots = (url: string) => {
    api.getkots(new URL('getKots', url).href, config.KOTGroupId).then((response: any) => {
      console.log("TOTAL KOTS by sock", response.data.kots.length, kotCache.length)
      const kts = response.data.kots.map((kt: KOT) => ({ ...kt, sockUrl: url }))
      kotCache = [...kotCache.filter((x: KOT) => x.sockUrl != url), ...kts.filter((x: KOT) => x.sockUrl == url)]
      console.log("cache length: ", kotCache.length)
      setKOTS(kotCache.sort((a: any, b: any) => compare(a.kotTimeStamp, b.kotTimeStamp)))
    }, (error: any) => {
      console.log(error, new URL('getdbdata', url).href)
    })
  }

  const compare = (a: number, b: number) => {
    return (a - b) / Math.abs((a - b))
  }

  const socketConfig = () => {
    console.log("configuring socket events...")
    let kots = []
    config.sockets.forEach(sock => {
      getKots(sock.url)
      sock.socket.off("kot:new").on("kot:new", (payl) => onNewKot(payl, sock.url))
    })
    // config.socket.off("kot:new").on("kot:new", onNewKot)
  }

  const onNewKot = (payload: any, url: string) => {
    console.log("payload", payload)
    if (payload.KOTGroupId == config.KOTGroupId) {
      getKots(url)
      notify("New KOT!")
    } else if (payload.KOTGroupId == 0) {
      getKots(url)
      notify("Updating KOT List...")
    }
  }

  const changeStatus = (statusId: number, refid: string, url: string) => {
    let _kots = KOTS
    _kots.filter(x => x.refid == refid)[0].KOTStatusId = statusId
    setKOTS(_kots)
    indicateUpdate(!update_helper)
    // config.socket.emit("kot:statusChange", { refid: refid, KOTStatusId: statusId })
    config.sockets.forEach(sock => {
      if (sock.url == url) {
        sock.socket.emit("kot:statusChange", { refid: refid, KOTStatusId: statusId })
      }
    })
  }

  const changeItemStatus = (kotrefid: string, product_key: string, completed: boolean) => {
    let _kots = KOTS
    _kots.filter(x => x.refid == kotrefid)[0].Items.filter((x: any) => x.ProductKey == product_key)[0].completed = !completed
    setKOTS(_kots)
    indicateUpdate(!update_helper)
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    let kots: Array<KOT> = []
    let fetched = 0
    // kotCache = []
    config.sockets.forEach(sock => {
      console.log(sock.url)
      api.getkots(new URL('getKots', sock.url).href, config.KOTGroupId).then((response: any) => {
        fetched++
        kots = [...kots, ...response.data.kots]
        if (fetched == config.sockets.length) {
          console.log("TOTAL KOTS by refresh", kots.length, kotCache.length)
          kotCache = kots.sort((a: any, b: any) => compare(a.kotTimeStamp, b.kotTimeStamp))
          setKOTS(kotCache.sort((a: any, b: any) => compare(a.kotTimeStamp, b.kotTimeStamp)))
          setRefreshing(false)
          // kotCache = kots
        }
      }, (error: any) => {
        fetched++
        if (fetched == config.sockets.length) {
          setRefreshing(false)
        }
      })
    })
    // api.getkots(new URL('getKots', config.url).href, config.KOTGroupId).then((response: any) => {
    //   console.log(config.KOTGroupId, config.KOTGroup)
    //   setKOTS(response.data.kots.sort((a: any, b: any) => compare(a.kotTimeStamp, b.kotTimeStamp)))
    //   setRefreshing(false)
    // }, (error: any) => {
    //   setRefreshing(false)
    // })
  }, []);

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
    <View style={styles.container} >
      <View style={{ flexDirection: 'row' }}>
        {/* <Picker
          selectedValue={statusFilter.toString()}
          mode='dropdown'
          onValueChange={(itemValue, itemIndex) => {
            setStatusFilter(+itemValue)
          }}>
          <Picker.Item label="All" value="0" />
          <Picker.Item label="Pending" value="1" />
          <Picker.Item label="Completed" value="3" />
        </Picker> */}
        <TouchableOpacity
        onPress={() => setStatusFilter(0)}
        disabled={statusFilter == 0} 
        style={[styles.stsBtn, {elevation: statusFilter == 0 ? 0 : 3}]}>
          <Text>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => setStatusFilter(1)}
        disabled={statusFilter == 1} 
        style={[styles.stsBtn, {elevation: statusFilter == 1 ? 0 : 3}]}>
          <Text>Served</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ width: '100%', marginBottom: 35 }}
        data={KOTS.filter(x => (statusFilter == 0 && x.KOTStatusId < 4) || (statusFilter == 1 && x.KOTStatusId == 4))}
        snapToAlignment='start'
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        renderItem={({ item, index }) => <KotCard key={index} kot={item} changestatus={changeStatus} changeItemStatus={changeItemStatus} update_helper={update_helper} />}
        keyExtractor={item => create_UUID()}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
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
    borderRadius: 5,
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
    flex: 1,
    fontWeight: 'bold',
  },
  carFooterRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  stsBtn: {
    flex: 1,
    // borderWidth: 1,
    // height: 50,
    alignItems: 'center',
    padding: 13,
    margin: 10,
    // elevation: 3,
    backgroundColor: 'white'
  }
});
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, ToastAndroid, StyleSheet, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import KotCard from "../components/KotCard"
import { View } from '../components/Themed';
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

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Pressable
  //         // onPress={() => setShowFloors(true)}
  //         style={({ pressed }) => ({
  //           opacity: pressed ? 0.5 : 1,
  //         })}>
  //         <MaterialIcons
  //           name="menu"
  //           size={25}
  //           color={'#2f95dc'}
  //           style={{ marginRight: 15 }}
  //         />
  //       </Pressable>
  //     )
  //   })
  // })

  const _kots: KOT[] = []

  const { config, setConfig } = useConfig()

  const [KOTS, setKOTS] = useState(_kots);
  const [update_helper, indicateUpdate] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState(0);

  useEffect(() => {
    // setConfig({ ...config, indicator: !config.indicator })
    socketConfig()
    getKots()
  }, []);

  const notify = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getKots = () => {
    api.getkots(new URL('getKots', config.url).href, config.KOTGroupId).then((response: any) => {
      setKOTS(response.data.kots.sort((a: any, b: any) => compare(a.kotTimeStamp, b.kotTimeStamp)))
    }, (error: any) => {
      console.log(error, new URL('getdbdata', config.url).href)
    })
  }

  const compare = (a: number, b: number) => {
    return (a - b) / Math.abs((a - b))
  }

  const socketConfig = () => {
    console.log("configuring socket events...")
    config.socket.off("kot:new").on("kot:new", onNewKot)
  }

  const onNewKot = (payload: any) => {
    console.log(payload)
    if (payload.KOTGroupId == config.KOTGroupId) {
      getKots()
      notify("New KOT!")
    } else if (payload.KOTGroupId == 0) {
      getKots()
      notify("Updating KOT List...")
    }
  }

  const changeStatus = (statusId: number, refid: string) => {
    let _kots = KOTS
    _kots.filter(x => x.refid == refid)[0].KOTStatusId = statusId
    setKOTS(_kots)
    indicateUpdate(!update_helper)
    config.socket.emit("kot:statusChange", { refid: refid, KOTStatusId: statusId })
  }

  const changeItemStatus = (kotrefid: string, product_key: string, completed: boolean) => {
    let _kots = KOTS
    _kots.filter(x => x.refid == kotrefid)[0].Items.filter((x: any) => x.ProductKey == product_key)[0].completed = !completed
    setKOTS(_kots)
    indicateUpdate(!update_helper)
  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    api.getkots(new URL('getKots', config.url).href, config.KOTGroupId).then((response: any) => {
      console.log(config.KOTGroupId, config.KOTGroup)
      setKOTS(response.data.kots.sort((a: any, b: any) => compare(a.kotTimeStamp, b.kotTimeStamp)))
      setRefreshing(false)
    }, (error: any) => {
      setRefreshing(false)
    })
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
      <View style={{ position: 'absolute', zIndex: 1000, top: 0, width: '100%' }}>
        <Picker
          selectedValue={statusFilter.toString()}
          mode='dropdown'
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue, typeof itemValue)
            setStatusFilter(+itemValue)
          }}>
          <Picker.Item label="All" value="0" />
          <Picker.Item label="Pending" value="1" />
          <Picker.Item label="Completed" value="3" />
        </Picker>
      </View>
      <FlatList
        style={{ width: '100%', top: 35, marginBottom: 35 }}
        data={KOTS.filter(x => statusFilter == 0 || x.KOTStatusId == statusFilter)}
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
});
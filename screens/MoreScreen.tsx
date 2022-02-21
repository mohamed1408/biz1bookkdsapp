import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { Avatar, BottomSheet, ListItem } from "react-native-elements";
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import * as Network from 'expo-network';

import { Text, View } from '../components/Themed';
import { useConfig } from '../contexts/context';
import { RootTabScreenProps, KOTGroup, Theme, SockObj } from '../types';
import IMAGES from '../assets/images/index'
import { io } from 'socket.io-client';
import api from '../utils/Api'

const DATA = [
  { "Id": 3, "KOTGroupId": 4, "StoreId": 22, "CompanyId": 3, "Description": "Tea" },
  { "Id": 30, "KOTGroupId": 5, "StoreId": 22, "CompanyId": 3, "Description": "South Indian" },
  { "Id": 57, "KOTGroupId": 6, "StoreId": 22, "CompanyId": 3, "Description": "Chinese" }
]

export default function MoreScreen({ navigation }: RootTabScreenProps<'More'>) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('Camera')}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          <MaterialCommunityIcons
            name="qrcode-plus"
            size={25}
            color={'#2f95dc'}
            style={{ marginRight: 15 }} />
        </Pressable>
      )
    })
  })

  const ktempy: KOTGroup[] = []
  const _kotgrp: KOTGroup | any = {}

  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  const { config, setConfig } = useConfig();


  const [searchText, setSearchText] = useState("");
  const [ktgrps, setKtgrps] = useState(ktempy);
  const [cKg, setCKG] = useState(_kotgrp)
  const [sheetVisiblity, setSheetVisiblity] = useState(false);
  const [shareQR, setShareQR] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [deviceIp, setDeviceIp] = useState('');
  const [scanning, setScanning] = useState(false);

  React.useEffect(() => {
    getKotGroups()
    getIp()
    // if (DATA.some(x => x.KOTGroupId == config.KOTGroupId)) {
    //   let currentKG = DATA.filter(x => x.KOTGroupId == config.KOTGroupId)[0]
    //   setCKG(currentKG)
    //   setSearchText(currentKG.Description)
    // }
  }, []);

  const getIp = async () => {
    const ipaddress = await Network.getIpAddressAsync();
    setDeviceIp(ipaddress)
  }
  // const getKOTGroups = () => {
  //   api.getkotgroups(new URL('getdbdata', config.url).href).then(async dbdata => {
  //     const ktgrps: KOTGroup[] = dbdata.data.printersettings[0].kotgroups
  //     setKtgrps(ktgrps)
  //     if (ktgrps.some(x => x.Id == config.KOTGroupId)) {
  //       let currentKG = ktgrps.filter(x => x.Id == config.KOTGroupId)[0]
  //       setCKG(currentKG)
  //     }
  //     // setSheetVisiblity(true)
  //   }, async err => {
  //     console.log("Failed to fetch kotgrps", err)
  //   })
  // }
  const getKotGroups = () => {
    console.log(config.CompanyId, config.KOTGroupId)
    api.kotGroups(config.CompanyId).then(data => {
      const ktgrps: KOTGroup[] = data.data
      setKtgrps(ktgrps)
      if (ktgrps.some(x => x.Id == config.KOTGroupId)) {
        setCKG(ktgrps.filter(x => x.Id == config.KOTGroupId)[0])
      } else {
        setSheetVisiblity(true)
      }
    })
  }

  const getBaseAdress = (ip: string) => {
    const maskArr = ip.split('.')
    return [maskArr[0], maskArr[1], maskArr[2], 'x'].join('.')
  }

  const scan = () => {
    const baseAddress = "http://" + deviceIp.split('.').slice(0, 3).join('.') + '.'
    const port = ":8000"
    let sockets: Array<SockObj> = []
    setScanning(true)
    for (let i = 1; i < 255; i++) {
      api.checkserverstatus(new URL('checkserverstatus', baseAddress + i).href).then(async response => {
        if (response.data.status == 200) {
          sockets = [...sockets, new SockObj(baseAddress + i + port)]
          if (i == 255) {
            setConfig({ ...config, sockets: sockets })
            setScanning(false)
          }
          // setConfig({ ...config, sockets: [...config.sockets, new SockObj(baseAddress + i + port)] })
        }
      }, async error => {
        console.log("http://" + baseAddress + i + " is not the server")
        if (i == 255) {
          setConfig({ ...config, sockets: sockets })
          setScanning(false)
        }
      })
    }
  }

  const search = (term: string) => {
    setKtgrps(term ? DATA.filter(x => x.Description.toLowerCase().includes(term.toLowerCase())) : [])
    setSearchText(term)
  }

  const setKG = (KG: KOTGroup) => {
    setSearchText(KG.Description)
    setConfig({ ...config, KOTGroupId: KG.Id, KOTGroup: KG.Description })
    setCKG(KG)
    setSheetVisiblity(false)
  }

  const logOut = async () => {
    setConfig({ sockets: [], CompanyId: 0, KOTGroupId: 0, theme: Theme.Light, KOTGroup: "", indicator: !config.indicator })
    const keys = ['@CompanyId', '@kotgroupid']
    await AsyncStorage.multiRemove(keys)
    navigation.replace('Login')
  }

  return (
    <View style={styles.container}>
      <ListItem key={"kot_group"} containerStyle={{
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
      }}>
        <Avatar rounded source={IMAGES.kot} />
        <ListItem.Content>
          <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>
            {"KOT Group"}
          </ListItem.Title>
          <ListItem.Subtitle style={[{ color: 'red' }]}>
            {cKg.Description ? cKg.Description : "Not Selected"}
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity onPress={() => setSheetVisiblity(true)} style={{ padding: 5 }}>
          <Text style={{ color: "blue" }}>{"CHANGE"}</Text>
        </TouchableOpacity>
      </ListItem>
      <ListItem key={"log_out"}
        containerStyle={{
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 8,
        }}>
        <MaterialCommunityIcons name="wifi" size={36} color="#2f95dc" />
        <ListItem.Content>
          <ListItem.Title style={{ color: 'black', fontWeight: 'bold' }}>
            {"Device IPv4"}
          </ListItem.Title>
          <ListItem.Subtitle style={[{ color: 'red', fontStyle: 'normal' }]}>
            {deviceIp}
          </ListItem.Subtitle>
        </ListItem.Content>
        {/* <TouchableOpacity onPress={() => setShareQR(true)} style={{ padding: 5 }}>
          <Feather name="share" size={24} color="blue" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => scan()} style={{ padding: 5 }}>
          {
            scanning
              ? (<ActivityIndicator size="small" color="#ffc107" />)
              : (<Text lightColor='#ffc107' darkColor='#ffc107'>Scan Network</Text>)
          }
        </TouchableOpacity>
      </ListItem>
      <ListItem.Accordion
        content={
          <>
            {/* <Icon name="place" size={30} /> */}
            <ListItem.Content>
              <ListItem.Title>List Accordion</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {config.sockets.map((socket, i) => (
          <ListItem key={i} bottomDivider>
            <MaterialCommunityIcons name="web" size={36} color="#2f95dc" />
            <ListItem.Content>
              <ListItem.Title>{"POS - " + (i + 1)}</ListItem.Title>
              <ListItem.Subtitle>{socket.url}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>
      <BottomSheet modalProps={{}} isVisible={sheetVisiblity}>
        <ListItem
          key={'cancel_sheet'}
          onPress={() => setSheetVisiblity(false)}>
          <ListItem.Content>
            <ListItem.Title>{""}</ListItem.Title>
          </ListItem.Content>
          <TouchableOpacity onPress={() => setSheetVisiblity(false)} style={{ padding: 5 }}>
            <AntDesign name="close" size={24} color="grey" />
          </TouchableOpacity>
        </ListItem>
        {ktgrps.map((kg, i) => (
          <ListItem
            key={i}
            onPress={() => setKG(kg)}>
            <ListItem.Content>
              <ListItem.Title>{kg.Description}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      {/* <BottomSheet modalProps={{}} isVisible={shareQR}>

        <ListItem
          key={'cancel_qr_sheet'}>
          <ListItem.Content>
            <ListItem.Title>{""}</ListItem.Title>
          </ListItem.Content>
          <TouchableOpacity onPress={() => setShareQR(false)} style={{ padding: 5 }}>
            <AntDesign name="close" size={24} color="grey" />
          </TouchableOpacity>
        </ListItem>

        <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
          <QRCode
            //QR code value
            value={config.url ? config.url : 'NA'}
            //size of QR Code
            size={250}
            //Color of the QR Code (Optional)
            color="black"
            //Background Color of the QR Code (Optional)
            backgroundColor="white"
            //Logo of in the center of QR Code (Optional)
            // logo={{
            //   url:
            //     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
            // }}
            //Center Logo size  (Optional)
            logoSize={30}
            //Center Logo margin (Optional)
            logoMargin={2}
            //Center Logo radius (Optional)
            logoBorderRadius={15}
            //Center Logo background (Optional)
            logoBackgroundColor="yellow"
          />
          <Text style={{ color: 'blue', fontStyle: 'italic', paddingVertical: 20, fontSize: 20 }}>{config.url}</Text>
        </View>

      </BottomSheet> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  searchBox: {
    height: 40,
    borderWidth: 1,
    padding: 10
  },
  searchList: {
    position: 'absolute',
    top: 35,
    left: 5,
    right: 5,
    zIndex: 100000,
    backgroundColor: 'white',
    // width: '100%',
    elevation: 3,
    padding: 10,
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { io, Socket } from "socket.io-client";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { UserContext, Theme, Config } from './contexts/context'

// import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {

  const [theme, setTheme] = React.useState(Theme.Light);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const _config: Config = {
    CompanyId: 0,
    KOTGroupId: 0,
    KOTGroup: '',
    sockets: [],
    theme: Theme.Light,
    indicator: false
  }

  const [config, setConfig] = React.useState(_config)

  // config.socket.on("connect", () => {
  //   console.log("Connected!")
  //   // console.log("testing...")
  //   // config.socket.emit("testEmit", "from kds app")
  // })

  // config.socket.on("error", (error) => {
  //   console.log(error)
  // })

  // const or = ScreenOrientation.getOrientationAsync()

  // or.then(data => {
  //   console.log("orientation", data)
  // })

  // ScreenOrientation.getOrientationLockAsync().then(data => {
  //   console.log("orientation Lock", data)
  // })

  // ScreenOrientation.getPlatformOrientationLockAsync().then(data => {
  //   console.log("orientation Platform Lock", data)
  // })

  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT).then(data => {
  //   console.log("orientation change", data)
  // })

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UserContext.Provider value={{ config, setConfig }}>
        <SafeAreaProvider>
          <Navigation colorScheme={theme} />
          <StatusBar />
        </SafeAreaProvider>
      </UserContext.Provider>
    );
  }
}
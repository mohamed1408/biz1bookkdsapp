import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { io, Socket } from "socket.io-client";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { UserContext, Theme, Config } from './contexts/context'

export default function App() {

  const [theme, setTheme] = React.useState(Theme.Light);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const _config: Config = {
    url: "",
    KOTGroupId: 0,
    KOTGroup: '',
    socket: io(),
    theme: Theme.Light,
    indicator: false
  }

  const [config, setConfig] = React.useState(_config)

  config.socket.on("connect", () => {
    console.log("Connected!")
    // console.log("testing...")
    // config.socket.emit("testEmit", "from kds app")
  })

  config.socket.on("error", (error) => {
    console.log(error)
  })

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

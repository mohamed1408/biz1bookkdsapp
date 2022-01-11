import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { io, Socket } from "socket.io-client";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ThemeContext, Theme, SocketContext, SocketUrlContext } from './contexts/context'

export default function App() {

  const [theme, setTheme] = React.useState(Theme.Light);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={theme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

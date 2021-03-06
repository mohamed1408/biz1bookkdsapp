/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import MoreScreen from '../screens/MoreScreen';
import KitchenDisplayScreen from '../screens/KitchenDisplayScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Camera from '../screens/Camera';
import LoginScreen from '../screens/Login';

import { useConfig } from '../contexts/context';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { config } = useConfig()
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={KitchenDisplayScreen} options={{ headerShown: true, title: config.KOTGroup, headerLeft: () => (<></>) }} />
      <Stack.Screen name="MoreScreen" component={MoreScreen} options={({ navigation, route }) => ({
        headerShown: true, title: "More", headerLeft: () => (
          <Pressable
            onPress={navigation.goBack}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <Ionicons name="chevron-back" size={25} color="black" style={{ marginRight: 15 }} />
          </Pressable>
        )
      })} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { config } = useConfig()

  return (
    <BottomTab.Navigator
      initialRouteName="KitchenDisplay"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      {/* <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      /> */}
      <BottomTab.Screen
        name="KitchenDisplay"
        component={KitchenDisplayScreen}
        options={{
          title: config.KOTGroup,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chef-hat" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="More"
        component={MoreScreen}
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <Feather name="more-horizontal" size={30} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

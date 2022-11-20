import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './components/register.component';
import Login from './components/login.component';
import Home from './components/home.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {

  const [loginState, setLoginState] = useState(false);

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    (!loginState) ? (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} initialParams={{setLoginState}}/>
        <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  ) : (
    <Tab.Navigator
    initialRouteName="City Name"
    labelStyle={{ fontSize: 12 }}
    style={{ backgroundColor: 'white' }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      listeners={{
        tabPress: e => {setData([]), setMode('cityname'); },
      }}
      options={{
        tabBarLabel: 'City',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="city" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Follow"
      component={Login}
      listeners={{
        tabPress: (e) => { setData([]), setMode('latlong'); },
      }}
      options={{
        tabBarLabel: 'LatLong',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cellphone-marker" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Login}
      listeners={{
        tabPress: (e) => { setData([]), setMode('latlong'); },
      }}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cellphone-marker" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
  )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

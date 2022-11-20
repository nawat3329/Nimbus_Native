import registerRootComponent from 'expo/build/launch/registerRootComponent';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import ToastManager from 'toastify-react-native'
import { LogBox } from 'react-native';


export default function Index() {
    LogBox.ignoreAllLogs()
    return (
        <NavigationContainer>
            <App />
            <ToastManager />
        </NavigationContainer>
    )
}


registerRootComponent(Index);

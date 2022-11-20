import registerRootComponent from 'expo/build/launch/registerRootComponent';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import ToastManager from 'toastify-react-native'


export default function Index() {
    return (
        <NavigationContainer>
            <App />
            <ToastManager />
        </NavigationContainer>
    )
}


registerRootComponent(Index);

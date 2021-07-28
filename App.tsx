import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import {
  DMSans_700Bold,
  DMSans_500Medium,
  DMSans_400Regular,
} from '@expo-google-fonts/dm-sans'
import {
  useFonts,
  WorkSans_400Regular,
  WorkSans_600SemiBold,
  WorkSans_700Bold
} from '@expo-google-fonts/work-sans'

import { AuthProvider } from './src/contexts/AuthContext';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    DMSans_700Bold,
    DMSans_500Medium,
    DMSans_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" animated />

        <Routes />
        <Toast ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    </AuthProvider>
  );
}

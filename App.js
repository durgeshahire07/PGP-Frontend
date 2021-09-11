import React from 'react';
import { View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts,Nunito_300Light,Nunito_400Regular,Nunito_700Bold, } from '@expo-google-fonts/nunito';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreen from './src/stack/AppStackScreen';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
     <UserProvider>
        <NavigationContainer>
            <AppStackScreen />
        </NavigationContainer>
     </UserProvider>
      
    );
  }
}
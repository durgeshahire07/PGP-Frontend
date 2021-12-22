import React,{useEffect,useState,useMemo} from 'react';
import { View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts,Nunito_300Light,Nunito_400Regular,Nunito_700Bold } from '@expo-google-fonts/nunito';
import {
  Comfortaa_700Bold,
  Comfortaa_400Regular,
} from '@expo-google-fonts/comfortaa';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreen from './src/stack/AppStackScreen';
import { UserProvider } from './src/context/UserContext';


export default function App() {

  // const [userToken,setUserToken] = useState(null);

  // useEffect(()=>{

  // },[]);


  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
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
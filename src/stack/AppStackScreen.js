import React,{useContext,useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack"
import { UserContext } from "../context/UserContext";
import MainStackScreen from "./MainStackScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export default AppStackScreen = () => {
    const [user,setUser] = useContext(UserContext);



    const AppStack = createStackNavigator();
    
    async function getUserDetails () {
        let getVal = await AsyncStorage.getItem('@app_user');
        const userDetails = JSON.parse(getVal);
        console.log(userDetails)
        setUser({
            email: userDetails?.email,
            firstname: userDetails?.firstname,
            isLoggedIn: userDetails?.isLoggedIn,
            lastname: userDetails?.lastname,
            token: userDetails?.token,
            uid: userDetails?.uid,
        })
    }
    // async function removeItemValue(key) {
    //     try {
    //         await AsyncStorage.removeItem('@app_user');
    //         return true;
    //     }
    //     catch(exception) {
    //         return false;
    //     }
    // }
    useEffect(()=>{
        getUserDetails();
    },[]);


    return(
      
        // <AppStack.Navigator screenOptions={{
        //     headerShown: false
        //   }} >
        //     {user.isLoggedIn == null ? (
        //         <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
        //     ): user.isLoggedIn ? (
        //         <AppStack.Screen name="Main" component={MainStackScreen} />        
        //     ) : (
        //         <AppStack.Screen name="Auth" component={AuthStackScreen} />
        //     )
        // }
           
        // </AppStack.Navigator>
        <AppStack.Navigator>
            {user.isLoggedIn == null ? (
                 // Screens for new users
                 <AppStack.Group screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
                    <AppStack.Screen name="SignUp" component={SignUpScreen} />
                    <AppStack.Screen name="SignIn" component={SignInScreen} />
                </AppStack.Group>

            ) : user.isLoggedIn? (
                // Screen for logged in users
                <AppStack.Group screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Main" component={MainStackScreen} />
                </AppStack.Group>
                
            ): (
                //Auth Screens
                <AppStack.Group screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="SignIn" component={SignInScreen} 
                        options={{
                            // When logging out, a pop animation feels intuitive
                            // You can remove this if you want the default 'push' animation
                            // animationTypeForReplace: user.isLoggedIn ? 'pop' : 'push',
                          }}
                />
                <AppStack.Screen name="SignUp" component={SignUpScreen} />
                </AppStack.Group>
            )}
          
            
        </AppStack.Navigator>
       
    )
}
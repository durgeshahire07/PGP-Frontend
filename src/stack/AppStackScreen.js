import React,{useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack"
import AuthStackScreen from "./AuthStackScreen";
import { UserContext } from "../context/UserContext";
import MainStackScreen from "./MainStackScreen";
export default AppStackScreen = () => {
    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext);
    return(
        <AppStack.Navigator screenOptions={{
            headerShown: false
          }} >
            {user.isLoggedIn ? (
                <AppStack.Screen name="Main" component={MainStackScreen} />
            ): (
                <AppStack.Screen name="Auth" component={AuthStackScreen} />
            )}
           
        </AppStack.Navigator>
    )
}
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Responses from '../screens/Responses';
import SurveyScreen from '../screens/SurveyScreen';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default MainStackScreen = () => {
    const Tab = createMaterialBottomTabNavigator(); 
    
    return (
        <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        shifting={true}
        // barStyle={{ backgroundColor: 'blue' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            
            tabBarLabel: 'Home',
            tabBarColor: '#0591fc',
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Responses"
          component={Responses}
          options={{
            tabBarLabel: 'Responses',
            tabBarColor: '#32a852',
            tabBarIcon: ({ color }) => (
              <AntDesign name="profile" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#7c5de3',
            tabBarIcon: ({ color }) => (
               <FontAwesome5 name="user-alt" size={22} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    )
}
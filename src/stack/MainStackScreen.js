import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Responses from '../screens/Responses';
import SurveyScreen from '../screens/SurveyScreen';

export default MainStackScreen = () => {
    const Tab = createMaterialBottomTabNavigator(); 
    
    return (
        <Tab.Navigator
        initialRouteName="Feed"
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
              <Ionicons name="home" color={color} size={24} />
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
                <Ionicons name="file-tray-full-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#9000ad',
            tabBarIcon: ({ color }) => (
                <Ionicons name="person-circle-outline" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    )
}
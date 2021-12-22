import React, { useEffect,useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Responses from '../screens/Responses';
import SurveyScreen from '../screens/SurveyScreen';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon, { Icons } from '../components/Icon';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View,StyleSheet,Text,KeyboardAvoidingView} from 'react-native'


const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen },
  { route: 'Like', label: 'Like', type: Icons.AntDesign, activeIcon: 'profile', inActiveIcon: 'profile', component: Responses},
  { route: 'Account', label: 'Account', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: ProfileScreen },
];

export default MainStackScreen = () => {

  const Tab = createBottomTabNavigator();
  
  const TabButton = (props) => {
    const viewRef = useRef(null);

    useEffect(()=>{
      if(focused){
        viewRef.current.animate({0:{scale: 1},1:{scale: 1.3}})
      }
      else{
        // viewRef.current.animate({0:{scale: 1.5},1: {scale:1}})
      }
    },[focused])

    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
   
    return (
     <View style={styles.container}>
       
       <TouchableOpacity
       style={styles.container}
        onPress={onPress}
        activeOpacity={1}
       >
      <Animatable.View style={{}}
      ref={viewRef}
      duration={200}
      >
      <Icon type={item.type} name={focused ? item.activeIcon:item.inActiveIcon}  color={focused ? Colors.primary : Colors.primaryLite}/>
      </Animatable.View>
       
       </TouchableOpacity>
     
     </View>
    )
  }
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
      
      keyboardVerticalOffset='-50'
      >
        <Tab.Navigator 
          
          screenOptions={{
            headerShown: false,
            
            tabBarStyle:{
              
              height: 60,
              position: 'absolute',
              bottom: 8,
              right: 16,
              left: 16,
              borderRadius: 16,
              // borderTopLeftRadius: 40,
              // borderTopRightRadius: 40
            }
          }}
        >
       {TabArr.map((item, index)=> {
         return(
           <Tab.Screen name={item.route} component={item.component} key={index}
              options={{
                tabBarShowLabel: false,
                // tabBarIcon: ({ color,focused }) => (
                //   <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={color} />
                // ),
                tabBarButton: (props) => <TabButton {...props} item={item}/>
              }}
           />
         )
       })}
      </Tab.Navigator>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width:50,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16
  }
})
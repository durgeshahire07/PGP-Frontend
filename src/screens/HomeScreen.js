import React,{useState,useEffect,useContext} from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Modal
} from 'react-native';
import Icon, { Icons } from '../components/Icon';
const { width,height } = Dimensions.get('screen');
import { UserContext } from "../context/UserContext";
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios'
// import Survey from '../components/Survey'
import config from '../api/config'
import {LinearGradient} from 'expo-linear-gradient';

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 0.7;
const VISIBLE_ITEMS = 3;

// const OverflowItems = ({ data, scrollXAnimated }) => {
//   const inputRange = [-1, 0, 1];
//   const translateY = scrollXAnimated.interpolate({
//     inputRange,
//     outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
//   });
//   return (
//     <View style={styles.overflowContainer}>
//       <Animated.View style={{ transform: [{ translateY }] }}>
//         {data.map((item, index) => {
//           return (
           
//           );
//         })}
//       </Animated.View>
//     </View>
//   );
// };

export default function HomeScreen() {

  const [user] = useContext(UserContext);
  console.log(user.firstname)
	
    var today = new Date();
    var time = today.getHours();
   
    const [state,setState] = useState('')

    const updateInput = (val) => {
       setState(val)
       console.log(state)
       
    }
    return (
      
    <SafeAreaView>
       {/* <View style={{
                            // flexDirection: 'row',
                            backgroundColor: "#fff",
                            height: 55,
                            paddingTop: 10,
                            elevation: 10,
                            alignItems:'center'
                        }}>
                <Text style={{
                            color: 'black',
                            fontSize: 24,
                            fontFamily: 'Nunito_400Regular'
                        }}>Home</Text>

            </View>  */}
           
    <ScrollView>
      {/* <Modal/> */}
      <LinearGradient style={{}} 
      // start={{x: 0.0, y: 0.25}} 
      // end={{x: 1.5, y: 1.2}}
      // locations={[0.1,1.0,1.0]}
      colors={['#ECE9E6', '#ECE9E6', '#ECE9E6']} >
        <View style={{flex:1,alignItems:'center',paddingTop:5}}>
          <Text syle={{}}>---</Text>
          </View>
        <View style={{paddingLeft:22,paddingTop:5,paddingBottom:10}}>
        <Text style={{fontSize:14,fontFamily:'Comfortaa_400Regular',color:'black'}}>Hi {user.firstname} {user.lastname},</Text>
          <Text style={{fontSize:25,fontFamily:'Comfortaa_400Regular',color:'black'}}>
            Good {
            time>=6 && time<=11 ? 
            <Text>Morning 🌅</Text> 
            : time>=12&&time<=15 ? 
            <Text>Afternoon ☀️️</Text> 
            : time>=16&&time<=20 ? 
            <Text>Evening 🌄</Text> 
            : 
            <Text>Night 🌃</Text>
            }
            
          </Text>
          
          {/* <Text style={{fontSize:25,fontFamily:'Comfortaa_400Regular'}}>Durgesh </Text> */}
        </View>
        <View style={{paddingLeft:25,paddingTop:10,paddingBottom:10,flexDirection:'row'}}>
          <Text style={{paddingRight:5,fontFamily:'Roboto',fontSize:12,fontWeight:'bold'}}>WHAT'S NEW TODAY</Text>
          <View style={{paddingLeft:5,backgroundColor:'#FC5656',paddingRight:5,borderRadius:10,elevation:5}}>
            <Text style={{color:'white',fontFamily:'Nunito_400Regular'}}>2</Text>
          </View>
        </View>
      {/* <View style={{height:height*0.33}}> */}
      {/* <Survey items={DATA}/> */}
      {/* <Survey /> */}
      
                            
        {/* </View> */}
        



        <View style={{paddingLeft:25,paddingRight:25,paddingBottom:10}}>
          <LinearGradient  
            start={{x: 0.0, y: 0.25}} 
            end={{x: 0.5, y: 1.2}}
            locations={[0,0.7,1.0]}
            colors={['#66c9ff', '#00a6ff', '#0095e6']} 
            style={{borderRadius:20, elevation: 7}}>
            
            <View style={{padding:20}}> 
              <Text style={{color:'white',fontSize:15,fontFamily:'Nunito_700Bold',paddingBottom:10}}>HOW AM I FEELING TODAY ?</Text>
              <View style={{backgroundColor:'white',height:2}}></View>
            </View>
            <View style={{paddingLeft:20,paddingRight:20,paddingBottom:20}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>updateInput('Awesome')}>
                  <Text style={{fontSize:25,paddingRight:10,paddingLeft:10}}>😁</Text>
                  <Text style={{color:'white',fontSize:12,paddingLeft:0}}>Awesome</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>updateInput('Great')}>
                  <Text style={{fontSize:25,paddingRight:10,paddingLeft:8}}>😀</Text>
                  <Text style={{color:'white',fontSize:12,paddingLeft:10}}>Great</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>updateInput('Good')}>
                  <Text style={{fontSize:25,paddingRight:10,paddingLeft:5}}>😊</Text>
                  <Text style={{color:'white',fontSize:12,paddingLeft:5}}>Good</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>updateInput('Low')}>
                  <Text style={{fontSize:25,paddingRight:9,paddingLeft:1}}>😔</Text>
                  <Text style={{color:'white',fontSize:12,paddingLeft:5}}>Low</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>updateInput('Horrible')}>
                  <Text style={{fontSize:25,paddingRight:10,paddingLeft:5}}>😩</Text>
                  <Text style={{color:'white',fontSize:12,paddingLeft:0}}>Horrible</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>updateInput('')}>
                  <Text style={{fontSize:25,paddingRight:10,paddingLeft:3}}>❓</Text>
                  <Text style={{color:'white',fontSize:12,paddingLeft:5}}>Other</Text>
                </TouchableOpacity>  
              </View>
              <View style={{ 
                        marginTop: 15,
                        borderWidth: 2,
                        borderColor: '#0e84d8',
                        borderRadius: 15,
                        backgroundColor:'white',
                        height: 40,
                        paddingLeft: 10,
                        paddingRight: 10}}>
                <TextInput
                    style={{flex:1}}
                   
                    placeholder="Feel free to share your feelings !"
                    value={state}
                    onChangeText={(text) => updateInput(text)}
                    // keyboardType="email-address"
                    // onFocus={() => setEmailActive(true)}
                    // onBlur={() => setEmailActive(false)}
                    
                />
              </View>
              <View style={{paddingTop:20,flex:1,alignItems:'flex-end'}}>
                
              <View style={{
                    justifyContent:'center',alignItems:'center',
                    backgroundColor:'#00a6ff',height:45,borderRadius:30,
                    width:45,borderColor:'#0c75c0',borderWidth:1, elevation: 3
                    
                  }}>
                    <TouchableOpacity>
                    <Text style={{color:'white',fontFamily:'Nunito_700Bold',fontSize:12}}>
                      
                    <Icon style={{ elevation: 10}} type={Icons.Feather} name='check'  color={'white'} size={25}/>
                    
                    </Text>
                    </TouchableOpacity>
                  </View>
              </View>
             
            </View>
          </LinearGradient>
        
        </View>



        <View style={{paddingLeft:25,paddingRight:25}}>
          <LinearGradient 
            start={{x: 0.0, y: 0.25}} 
            end={{x: 0.5, y: 1.2}}
            locations={[0,0.7,1.0]}
            colors={['#66c9ff', '#00a6ff', '#0095e6']} 
            style={{backgroundColor:'#23a9f9',borderRadius:20,elevation: 7}}>
            <View style={{padding:20,paddingBottom:0}}> 
              <Text style={{color:'white',fontSize:15,fontFamily:'Nunito_700Bold',paddingBottom:10}}>MY TODAY'S MISSION ?</Text>
              <View style={{backgroundColor:'white',height:2}}></View>
            </View>
            <View style={{paddingLeft:20,paddingRight:20,paddingBottom:20}}>
              
              <View style={{ 
                        marginTop: 15,
                        borderWidth: 2,
                        borderColor: '#0e84d8',
                        borderRadius: 15,
                        backgroundColor:'white',
                        height: 100,
                        paddingLeft: 10,
                        paddingRight: 10}}>
                <TextInput
                    style={{paddingTop:10,}}
                   
                    placeholder="Your Today's Mission..."
                    multiline
                    // value={state}
                    // onChangeText={(text) => updateInput(text)}
                    // keyboardType="email-address"
                    // onFocus={() => setEmailActive(true)}
                    // onBlur={() => setEmailActive(false)}
                    
                />
              </View>
              <View style={{paddingTop:20,flex:1,alignItems:'flex-end'}}>
                
                  <View style={{
                    justifyContent:'center',alignItems:'center',
                    backgroundColor:'#00a6ff',height:45,borderRadius:30,
                    width:45,borderColor:'#0c75c0',borderWidth:1, elevation: 3
                    
                  }}>
                    <TouchableOpacity>
                    <Text style={{color:'white',fontFamily:'Nunito_700Bold',fontSize:12}}>
                      
                    <Icon style={{ elevation: 10}} type={Icons.Feather} name='check'  color={'white'} size={25}/>
                    
                    </Text>
                    </TouchableOpacity>
                  </View>
              </View>
             
            </View>
          </LinearGradient>
        
        </View>


        <View style={{paddingBottom:100}}> 
        
        </View>
    
        </LinearGradient>
        </ScrollView>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

 

});
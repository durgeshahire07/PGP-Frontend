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
  KeyboardAvoidingView
} from 'react-native';
const { width,height } = Dimensions.get('screen');
import { UserContext } from "../context/UserContext";
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios'
// import Survey from '../components/Survey'
import config from '../api/config'

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
      <ScrollView>
    <SafeAreaView>
    
      <View style={{}}>
        <View style={{paddingLeft:22,paddingTop:10,paddingBottom:10}}>
          <Text style={{fontSize:25,fontFamily:'Comfortaa_400Regular',color:'black'}}>
            Good {
            time>=6 && time<=11 ? 
            <Text>Morning,</Text> 
            : time>=12&&time<=15 ? 
            <Text>Afternoon,</Text> 
            : time>=16&&time<=20 ? 
            <Text>Evening,</Text> 
            : 
            <Text>Night, </Text>
            }
            <Text style={{fontSize:25,fontFamily:'Comfortaa_400Regular',color:'black'}}>{user.firstname}</Text>
          </Text>
          
          {/* <Text style={{fontSize:25,fontFamily:'Comfortaa_400Regular'}}>Durgesh </Text> */}
        </View>
        <View style={{paddingLeft:25,paddingTop:10,paddingBottom:10,flexDirection:'row'}}>
          <Text style={{paddingRight:5}}>WHAT'S NEW TODAY</Text>
          <View style={{paddingLeft:5,backgroundColor:'#FC5656',paddingRight:5,borderRadius:10}}>
            <Text style={{color:'white',fontFamily:'Nunito_400Regular'}}>2</Text>
          </View>
        </View>
      {/* <View style={{height:height*0.33}}> */}
      {/* <Survey items={DATA}/> */}
      {/* <Survey /> */}
      
                            
        {/* </View> */}
        



        <View style={{paddingLeft:25,paddingRight:25,paddingBottom:10}}>
          <View style={{backgroundColor:'#23a9f9',borderRadius:20}}>
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
              <TouchableOpacity style={{paddingTop:20,flex:1,alignItems:'flex-end'}}>
                
                  <View style={{
                    justifyContent:'center',alignItems:'center',
                    backgroundColor:'#0f92f0',height:40,borderRadius:15,
                    width:80,borderColor:'#0c75c0',borderWidth:1
                    
                  }}>
                    <Text style={{color:'white',fontFamily:'Nunito_700Bold',fontSize:12}}>SUBMIT</Text>
                  </View>
              </TouchableOpacity>
             
            </View>
          </View>
        
        </View>



        <View style={{paddingLeft:25,paddingRight:25}}>
          <View style={{backgroundColor:'#23a9f9',borderRadius:20}}>
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
              <TouchableOpacity style={{paddingTop:20,flex:1,alignItems:'flex-end'}}>
                
                  <View style={{
                    justifyContent:'center',alignItems:'center',
                    backgroundColor:'#0f92f0',height:40,borderRadius:15,
                    width:80,borderColor:'#0c75c0',borderWidth:1
                    
                  }}>
                    <Text style={{color:'white',fontFamily:'Nunito_700Bold',fontSize:12}}>SUBMIT</Text>
                  </View>
              </TouchableOpacity>
             
            </View>
          </View>
        
        </View>


        <View style={{paddingBottom:100}}> 
        
        </View>
    
        </View>
        
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

 

});
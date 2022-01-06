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
  Modal,
  Pressable,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import Icon, { Icons } from '../components/Icon';
const { width,height } = Dimensions.get('screen');
import { UserContext } from "../context/UserContext";
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios'
// import Survey from '../components/Survey'
import config from '../api/config'
import {LinearGradient} from 'expo-linear-gradient';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import SelectMultiple from 'react-native-select-multiple'


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

  const [user,setUser] = useContext(UserContext);
  const [loading,setLoading] = useState(true);
  const [buttonLoading,setButtonLoading] = useState(false);
  const {HOST,GET_SURVEY,SAVE_RESPONSE} = config;
	var submit = true;
    var today = new Date();
    var time = today.getHours();
   
    const [state,setState] = useState('')
    const [data,setData] = useState({
      data: ''
    });
    const updateInput = (val) => {
       setState(val)
       console.log(state)
       
    }
    const [res, setRes] = useState({
      ans: {
          token: user.token,
          userID: user.uid,
          surveyType: "daily",
          response: []
      }
  })


    async function getSurvey (token) {
      var config = {
        method: 'post',
        url: `${HOST}${GET_SURVEY}`,
        // url: `http://192.168.43.19:3000/api/v1/survey/getSurvey`,
        headers: {},
        data: {
          surveyType: "daily",
          token: token
        }
    };
    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response));

            if (response.data.success) {
              setLoading(false);
              setButtonLoading(false);
                setData({
                    data: response.data.data
                })
                console.log(data.data);
            }
            else {
                ToastAndroid.show("Oops...something went wrong!",
                    ToastAndroid.SHORT)
            }
        })
        .catch(function (error) {
            console.log(error);
            ToastAndroid.show(error,
                ToastAndroid.SHORT)
        });
    }

    async function getUserDetails () {
      let getVal = await AsyncStorage.getItem('@app_user');
      const userDetails = JSON.parse(getVal);
      console.log(userDetails)
      await setUser({
          email: userDetails.email,
          firstname: userDetails.firstname,
          isLoggedIn: userDetails.isLoggedIn,
          lastname: userDetails.lastname,
          token: userDetails.token,
          uid: userDetails.uid,
      })
      getSurvey(user.token);

  }

    useEffect(()=>{
      getUserDetails(); 
  },[]);


  const changeRes = (que, index) => {
    var temp = res.ans;
    if (que.required) {
        if (que.type == "radio button" && (que.answer == undefined || que.answer.length === 0)) {
            submit = false;
            console.log("radio", que.answer)
        }
        else if (que.type == "short answer" && (que.answer == undefined || que.answer === "")) {
            submit = false;
            console.log("short", que.answer)
        }
        else if (que.type == "long answer" && (que.answer == undefined || que.answer === "")) {
            submit = false;
            console.log("long", que.answer)
        }
        else if (que.type == "check box" && (que.answer === undefined || que.answer.length === 0)) {
            submit = false;
            console.log("check", que.answer)
        }

    }

    if (que.type == "slider") {

        temp.response[index] = { questionID: que._id, questionType: que.type, answer: que.options }

    }
    else {
        temp.response[index] = { questionID: que._id, questionType: que.type, answer: que.answer }
    }
    setRes({
        ans: temp
    })

}


  async function submitHandler() {
    
    console.log(submit)
    data.data.map((val, key) => {
        changeRes(val, key)
    })



    if (submit) {
        setButtonLoading(true);
    //   setLoading(true);
        // setState({
        //     ...state,
        //     isLoading: true
        // })


        try {
            var config = {
                method: 'post',
                // url: `http://192.168.43.19:3000/api/v1/survey/saveResponse`,
                url: `${HOST}${SAVE_RESPONSE}`,
                headers: {},
                data: res.ans
            };
            const response = await axios(config)
            console.log(response)
            if (response.data.success) {
                
                ToastAndroid.show("Response saved successfully!👍",
                    ToastAndroid.SHORT)
                setLoading(true);
                getUserDetails(); 
                
            }
            else {

                ToastAndroid.show("Oops...something went wrong!",
                    ToastAndroid.SHORT)
            }
        } catch (error) {
          setLoading(false);
            console.log(error)
            if (error.response.status === 500) {
                ToastAndroid.show(error,
                    ToastAndroid.SHORT)
            }
            else if (error.response.status === 503) {
                ToastAndroid.show("Internal Server Error! Please try after sometime.",
                    ToastAndroid.SHORT)
            }
            else{
                ToastAndroid.show("Oops! Something went wrong.",
                    ToastAndroid.SHORT)
            }
        }
       }
    else {
      setLoading(false);
        ToastAndroid.show("Please answer all the required questions",
            ToastAndroid.SHORT)
    }

}




  const onChoiceChange = (selectedChoice, id) => {
    var tmp = data.data
    tmp.map((val) => {
        if (val._id === id) {
            val.answer = selectedChoice
            if (val.answer.length > 1) {
                val.answer.shift();
            }
        }
    })

    setData({
        ...data,
        data: tmp
    })


}

const onSelectionsChange = (selectedItems, id) => {

    var tmp = data.data
    tmp.map((val) => {
        if (val._id === id) {
            val.answer = selectedItems
        }
    })
    setData({
        ...data,
        data: tmp
    })


}

const changeParagraph = (value, id) => {
    var temp = data.data
    temp.map((val) => {
        if (val._id === id) {
            val.answer = value
        }
    })
    setData({
        ...data,
        data: temp
    })


}

const changeLongPara = (value, id) => {

    var tmp = data.data
    tmp.map((val) => {

        if (val._id === id) {

            val.answer = value

        }
    })
    setData({
        ...data,
        data: tmp
    })

}

const handleSliderChange = (val, id, subQue) => {

    var temp = data.data;
    temp.map((que) => {
        if (que._id === id) {
            que.options[subQue].value = val
        }
    })

    setData({
        ...data,
        data: temp
    })
}

const submitButton = () => {
  return (
      <View style={{ paddingBottom: 10, paddingHorizontal: 50 }}>
          <Pressable disabled={buttonLoading} onPress={submitHandler}
              android_ripple={{ color: '#fff' }}
              style={{
                  borderRadius: 20,
                  backgroundColor: '#028de1',
                  paddingHorizontal: 70,
                  paddingVertical: 15,
                 
              }} >
              <View style={{ alignItems: 'center' }}>
                  {
                      buttonLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={{
                     
                            fontSize: 17,
                            color: '#fff',
      
                        }}>Submit</Text>
                      )
                  }
                  
              </View>
          </Pressable>
      </View>
  )
}


  const display = (item, key) => {
 
    if (item.type == "radio button") {
        return <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.QuestionContainer}>

                {item.required ?

                    <Text>
                        <Text style={styles.Questions}>{item.question}</Text>
                        <Text style={styles.requiredText}> *</Text>
                    </Text>
                    :
                    <Text style={styles.Questions}>{item.question}</Text>

                }

                <SelectMultiple
                    items={item.options}
                    selectedItems={item.answer}
                    onSelectionsChange={choice => onChoiceChange(choice, key)}
                />
            </View>

        </View>
    }
    else if (item.type == "check box") {
        return <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.QuestionContainer}>
                {item.required ?

                    <Text>
                        <Text style={styles.Questions}>{item.question}</Text>
                        <Text style={styles.requiredText}> *</Text>
                    </Text>

                    :

                    <Text style={styles.Questions}>{item.question}</Text>

                }
                <SelectMultiple
                    items={item.options}
                    selectedItems={item.answer}
                    onSelectionsChange={list => onSelectionsChange(list, key)}
                />
            </View>

        </View>
    }
    else if (item.type == "short answer") {
        return <View style={{ paddingHorizontal: 15 }}>

            <View style={styles.QuestionContainer}>
                {item.required ?

                    <Text>
                        <Text style={styles.Questions}>{item.question}</Text>
                        <Text style={styles.requiredText}> *</Text>
                    </Text>

                    :
                    <Text style={styles.Questions}>{item.question}</Text>

                }
                <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 10 }}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        padding: 10
                    }}>

                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={{
                              
                                flex: 1,
                                textAlignVertical: 'top',
                                color: '#000000',
                                height: 70,
                            }}
                            onChangeText={(value) => changeParagraph(value, key)}
                        />

                    </View>
                </View>

            </View>

        </View>

    }
    else if (item.type == "long answer") {
        return <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.QuestionContainer}>
                {item.required ?

                    <Text>
                        <Text style={styles.Questions}>{item.question}</Text>
                        <Text style={styles.requiredText}> *</Text>
                    </Text>

                    :
                    <Text style={styles.Questions}>{item.question}</Text>

                }
                <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 10 }}>


                    <View style={{
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        padding: 10
                    }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={{
                              
                                flex: 1,
                                textAlignVertical: 'top',
                                color: '#000000',
                                height: 180,
                            }}
                            onChangeText={(value) => changeLongPara(value, key)}
                        />
                    </View>
                </View>
            </View>

        </View>
    }
    else if (item.type == "slider") {
        let subques = item.options.map((ques, index) => {

            return <View key={index} style={{ flex: 1, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#bfbfbf' }}>
                <Text style={{  fontSize: 16, color: '#006699' }}>{ques.subQues}</Text>

                <View style={{ flex: 1, paddingVertical: 20 }} >
                    <Slider
                        style={{ width: '100%' }}
                        minimumValue={0}
                        maximumValue={ques.maxValue}
                        minimumTrackTintColor="#5200cc"
                        maximumTrackTintColor="#944dff"
                        thumbTintColor="#5200cc"
                        value={ques.value}

                        step={1}


                        onSlidingComplete={(value) => handleSliderChange(value, key, index)}

                    />

                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{ color: '#c299ff',  }}>0</Text>

                        <Text style={{ color: '#5200cc',  fontSize: 18 }}>{ques.value}</Text>

                        <Text style={{ color: '#c299ff',  }}>{ques.maxValue}</Text>
                    </View>
                </View>

            </View>
        })
        return <View style={{ paddingHorizontal: 15, }}>
            <View style={styles.QuestionContainer}>
                {item.required ?
                    <View style={{ paddingVertical: 10 }}>
                        <Text>
                            <Text style={styles.Questions}>{item.question}</Text>
                            <Text style={styles.requiredText}> *</Text>
                        </Text>
                    </View>
                    :
                    <Text style={styles.Questions}>{item.question}</Text>

                }
                {subques}
            </View>

        </View>
    }

}


    return (
      
    <SafeAreaView style={{backgroundColor:'#fff'}}>
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
           
    <ScrollView style={{backgroundColor:'#fff'}}>
      {/* <Modal/> */}
      <LinearGradient style={{backgroundColor:'#fff'}} 
      // start={{x: 0.0, y: 0.25}} 
      // end={{x: 1.5, y: 1.2}}
      // locations={[0.1,1.0,1.0]}
      colors={['#ECE9E6', '#ECE9E6', '#ECE9E6']} >
        <View style={{flex:1,alignItems:'center',paddingTop:5,paddingBottom:10,backgroundColor:"#fff"}}>
          <Text style={{fontSize:11}}>Personal Growth Pyramid</Text>
        </View>
        <View style={{paddingLeft:22,paddingTop:5,paddingBottom:10,backgroundColor:"#fff"}}>
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
        
      {/* <View style={{height:height*0.33}}> */}
      {/* <Survey items={DATA}/> */}
      {/* <Survey /> */}
      
                            
        {/* </View> */}


        {
            loading ? (
                <View style={{backgroundColor:"#fff",flex:1,paddingTop:250,paddingBottom:390}}>
                     <ActivityIndicator size="large" color="#028de1" />
                </View>
            ) : 
            
            (
                <View style={{paddingBottom:70,backgroundColor:"#fff"}}>
                <View style={{paddingLeft:25,paddingTop:10,paddingBottom:10,flexDirection:'row',backgroundColor:"#fff"}}>
                  <Text style={{paddingRight:5,fontFamily:'Roboto',fontSize:12,fontWeight:'bold'}}>WHAT'S NEW TODAY</Text>
                  <View style={{paddingLeft:5,backgroundColor:'#FC5656',paddingRight:5,borderRadius:10,elevation:5}}>
                    <Text style={{color:'white'}}>7</Text>
                  </View>
                </View>
              
                            <FlatList
                            keyExtractor={(item) => item._id}
                            data={data.data}
                            // refreshing={loading}
                            // onRefresh={getSurvey} 
                            ListFooterComponent={submitButton}
                            renderItem={({ item }) => (
                                <View style={{ paddingVertical: 10 }} >
                                    {display(item, item._id)}
                                </View>
        
                            )}
                        />
                       
               
                </View>
            )
            
        }
       
       
            
        



        {/* <View style={{paddingLeft:25,paddingRight:25,paddingBottom:10}}>
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
        
        </View> */}



        {/* <View style={{paddingLeft:25,paddingRight:25}}>
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
        
        </View> */}

         
    
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

requiredText: {
  
    color: '#e60000',
    fontSize: 18

},
header: {
    flexDirection: 'row',
    backgroundColor: "#4700b3",
    height: 50,
    elevation: 10,
    paddingLeft: 10
},
QuestionContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 7,
},

textarea: {
    height: 180,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
  
},
Questions: {
    fontSize: 18,
  
    color: '#666666'
},
Numbers: {
 
    fontSize: 18,

},
text_options: {
    color: '#05375a',
    fontSize: 17,
  
    paddingHorizontal: 20

},
button: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
},
textSign: {
    
    fontSize: 20,
},
textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
},
color_textPrivate: {
    color: 'grey'
},


});
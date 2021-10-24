// import React,{useState} from 'react'
// import {
//     StatusBar,
//     Image,
//     FlatList,
//     Dimensions,
//     Animated,
//     Text,
//     View,
//     StyleSheet,
//     SafeAreaView,
//     TextInput
// } from 'react-native'
// import Colors from '../constants/Colors'
// import {
//     FlingGestureHandler,
//     Directions,
//     State,
//   } from 'react-native-gesture-handler';
//   import axios from 'axios'
//   import config from '../api/config'

//   const { width } = Dimensions.get('screen');
//   const OVERFLOW_HEIGHT = 70;
//   const SPACING = 0;
//   const ITEM_WIDTH = width * 0.8;
//   const ITEM_HEIGHT = ITEM_WIDTH * 0.7;
//   const VISIBLE_ITEMS = 3;
  
  
// export default function Survey ()  {
//   const {HOST,PORT,GET_SURVEY,SAVE_RESPONSE} = config;
//   const [state, setState] = useState({
//     data: [
//       {
//         question: 'HOW AM I FEELING TODAY?',
//         options: [
//          [ {
//             text: 'Awesome',
//             emoji: '😁'
//           },
//           {
//             text: 'Great',
//             emoji: '😀'
//           },
//           {
//             text: 'Good',
//             emoji: '😊'
//           },
//           {
//             text: 'Low',
//             emoji: '😔'
//           },
//           {
//             text: 'Horrible',
//             emoji: '😩'
//           },
//           {
//             text: 'Others',
//             emoji: '❓'
//           } ]
//       ],
        
//       },
//       {
//         title: 'Imp Tasks',
//         options: ['Happy','sad','good','very happy'],
//         date: 'Sept 3rd, 2020',
//       },
     
//     ]
// });
// //   const getSurvey = () => {
       
// //     var config = {
// //         method: 'post',
// //         url: `${HOST}${GET_SURVEY}`,
// //         headers: {},
// //         data: {
// //           "surveyType": "daily"
// //         }
// //     };
// //     axios(config)
// //         .then(function (response) {
// //             console.log(JSON.stringify(response));

// //             if (response.data.success) {
// //                 setState({
// //                     data: response.data.data
// //                 })
// //                 console.log(state.data)
// //             }
// //             else {
                
// //             }
// //         })
// //         .catch(function (error) {
// //             console.log(error);
            
// //         });
// // }
// // React.useEffect(() => {
// //     getSurvey()
// // }, [])



//   const scrollXIndex = React.useRef(new Animated.Value(0)).current;
//   const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
//   const [index, setIndex] = React.useState(0);
//   const setActiveIndex = React.useCallback((activeIndex) => {
//     scrollXIndex.setValue(activeIndex);
//     setIndex(activeIndex);
//   });

//   React.useEffect(() => {
//     if (index === state.data.length - VISIBLE_ITEMS - 1) {
//       // get new data
//       // fetch more data
//       const newData = [...state.data, ...state.data];
//       setState({data:newData});
//     }
//   });

//   React.useEffect(() => {
//     Animated.spring(scrollXAnimated, {
//       toValue: scrollXIndex,
//       useNativeDriver: true,
//     }).start();
//   });

//   return (

//     <FlingGestureHandler
//       key='left'
//       direction={Directions.LEFT}
//       onHandlerStateChange={(ev) => {
//         if (ev.nativeEvent.state === State.END) {
//           if (index === state.data.length - 1) {
//             return;
//           }
//           setActiveIndex(index + 1);
//         }
//       }}
//     >
//       <FlingGestureHandler
//         key='right'
//         direction={Directions.RIGHT}
//         onHandlerStateChange={(ev) => {
//           if (ev.nativeEvent.state === State.END) {
//             if (index === 0) {
//               return;
//             }
//             setActiveIndex(index - 1);
//           }
//         }}
//       >
        
//           {/* <StatusBar hidden /> */}
//           {/* <OverflowItems data={data} scrollXAnimated={scrollXAnimated} /> */}
//           <FlatList
//             data={state.data}
//             keyExtractor={(_, index) => String(index)}
//             horizontal
//             inverted
//             contentContainerStyle={{
//               flex: 1,
//               justifyContent: 'center',
             
//               marginTop: 20,
//             }}
//             scrollEnabled={false}
//             removeClippedSubviews={false}
//             CellRendererComponent={({
//               item,
//               index,
//               children,
//               style,
//               ...props
//             }) => {
//               const newStyle = [style, { zIndex: state.data.length - index }];
//               return (
//                 <View style={newStyle} index={index} {...props}>
//                   {children}
//                 </View>
//               );
//             }}
//             renderItem={({ item, index }) => {
//               const inputRange = [index - 1, index, index + 1];
//               const translateX = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [50, 0, -100],
//               });
//               const scale = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [0.8, 1, 1.3],
//               });
//               const opacity = scrollXAnimated.interpolate({
//                 inputRange,
//                 outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
//               });

//               return (
//                 <Animated.View
//                   style={{
//                     position: 'absolute',
//                     left: -ITEM_WIDTH / 2,
//                     opacity,
//                     transform: [
//                       {
//                         translateX,
//                       },
//                       { scale },
//                     ],
//                   }}
//                 >
//                   <View
//                     // source={{ uri: item.poster }}
//                     style={{
//                       width: ITEM_WIDTH,
//                       height: ITEM_HEIGHT,
//                       borderRadius: 10,
//                       backgroundColor: '#23a9f9'
//                     }}
//                   >
//                     <View style={{paddingLeft:15,paddingTop:20,paddingBottom:10}}>
//                       <Text style={{fontSize:15,fontFamily:'Nunito_700Bold',color:'white'}}>{item.question}</Text>
                      
//                     </View>
//                     <View style={{backgroundColor:'white',width:ITEM_WIDTH,height:2}} ></View>
//                     {item.question==='HOW AM I FEELING TODAY?' ?
//                         item.options.map((opt,key)=>{
//                           return(
//                             <>
//                             <View key={key} style={{flexDirection:'row'}}>
                              
//                               <Text style={{fontSize:25,paddingLeft:15,paddingTop:10}}>{opt[0].emoji}</Text>
//                               <Text style={{fontSize:25,paddingLeft:15,paddingTop:10}}>{opt[1].emoji}</Text>
//                               <Text style={{fontSize:25,paddingLeft:15,paddingTop:10}}>{opt[2].emoji}</Text>
//                               <Text style={{fontSize:25,paddingLeft:15,paddingTop:10}}>{opt[3].emoji}</Text>
//                               <Text style={{fontSize:25,paddingLeft:15,paddingTop:10}}>{opt[4].emoji}</Text>
//                               <Text style={{fontSize:25,paddingLeft:15,paddingTop:10}}>{opt[5].emoji}</Text>
//                             </View>
//                             <View style={{flexDirection:'row',paddingLeft:10,paddingTop:5}}>
//                               <Text style={{fontSize:10,color:'white'}} >Awesome</Text>
//                               <Text style={{fontSize:10,color:'white',paddingLeft:10}} >Great</Text>
//                               <Text style={{fontSize:10,color:'white',paddingLeft:22}} >Good</Text>
//                               <Text style={{fontSize:10,color:'white',paddingLeft:25}} >Low</Text>
//                               <Text style={{fontSize:10,color:'white',paddingLeft:20}} >Horrible</Text>
//                               <Text style={{fontSize:10,color:'white',paddingLeft:15}} >Others</Text>
//                             </View>
//                             <View style={{
//                                 // flexDirection: 'row',
//                                 marginTop: 7,
//                                 borderWidth: 1,
//                                 borderColor:'grey',
//                                 borderRadius: 10,
//                                 height: 40,
//                                 paddingLeft: 10,
//                                 paddingRight: 10,
                               
                          
//                               }}>
//                               <TextInput style={{flex:1}}
//                               placeholder="avensmith@gmail.com"
//                               autoCapitalize="none"
//                               // onChangeText={(user) => textInput(user)}
//                               keyboardType="email-address"
                              
//                               />
//                             </View>
//                             </>
//                           )
//                         })
                        
//                         : 
//                         console.log("no")
//                       }
//                   </View>
//                 </Animated.View>
                
//               );
//             }}
//           />
      
//       </FlingGestureHandler>
//     </FlingGestureHandler>
//   )
// }
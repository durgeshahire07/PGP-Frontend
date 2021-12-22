import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput
} from 'react-native';

// import Text from '../components/Text';
export default ProfileScreen = () => {
    return (
        <View style={styles.container}>
              {/* <View style={{
                            // flexDirection: 'row',
                            backgroundColor: "#fff",
                            height: 55,
                            paddingTop: 10,
                            elevation: 10,
                            alignItems:'center'
                        }}>
                <Text large  style={{
                            color: 'black',
                            
                        }}>Profile</Text>

            </View> */}
           <View style={{alignItems:'center',marginTop:50,height:90,justifyContent:'center'}}>
                <View style={{backgroundColor:'black',height:'100%',width:'25%',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:30,color:'white',}}>D A</Text>
                </View>
           </View>
           <View style={{paddingLeft:20,paddingRight:20,paddingTop:30}}>
                <Text style={{}}>Email Address</Text>
                    <View
                    
                    style={{
                        flexDirection: 'row',
                        marginTop: 7,
                        borderWidth: 1,
                        borderColor:  'grey',
                        borderRadius: 10,
                        height: 40,
                        paddingLeft: 10,
                        paddingRight: 10,
                       
                    }}
                    >
                        <TextInput style={{flex:1}}
                         placeholder="avensmith@gmail.com"
                         value='Durgesh'
                         autoCapitalize="none"
                        //  onChangeText={(user) => textInput(user)}
                         keyboardType="email-address"
                        //  onFocus={() => setEmailActive(true)}
                        //  onBlur={() => setEmailActive(false)}
                         
                        />  
                        
                       
                    </View>
                
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    
})
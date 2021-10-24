import React,{useEffect} from 'react';
import {
    View,
   
    StyleSheet,
    StatusBar
} from 'react-native';
import Text from '../components/Text';

export default PreviousRes = () => {
   
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
                          
                        }}>Responses</Text>

            </View> */}
            {/* <Text>Responses </Text> */}
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
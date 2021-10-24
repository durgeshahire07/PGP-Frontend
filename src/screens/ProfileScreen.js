import React from 'react';
import {
    View,
   
    StyleSheet,
    StatusBar
} from 'react-native';
import Text from '../components/Text';
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
            {/* <Text>Profile Screen</Text> */}
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
import React,{useContext} from 'react';
import {
    View,
   Platform,
    StyleSheet,
    StatusBar
} from 'react-native';
import Text from '../components/Text'
import { UserContext } from "../context/UserContext";
export default HomeScreen = () => {
    const [user] = useContext(UserContext);
    console.log(user);
    return (
        <View style={styles.container}>
           <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
            <View style={{
                            // flexDirection: 'row',
                            backgroundColor: "#0591fc",
                            height: 55,
                            paddingTop: 10,
                            elevation: 10,
                            alignItems:'center'
                        }}>
                <Text large  style={{
                            color: '#fff',
                           
                        }}>Home</Text>

            </View>
            {/* <Text>Home</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 0
    },
})
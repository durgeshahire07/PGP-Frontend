import React,{useContext} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { UserContext } from "../context/UserContext";
export default HomeScreen = () => {
    const [user] = useContext(UserContext);
    console.log(user);
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
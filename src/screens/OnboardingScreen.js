import React from 'react'
import {
    View, 
    Text, 
    StyleSheet
} from 'react-native'

export default LoadingScreen = () => {
    return (
        <View style={styles.container}>  
            <Text>Onboarding Screen</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
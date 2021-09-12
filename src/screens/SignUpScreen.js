import { StatusBar} from 'expo-status-bar'
import React,{useState} from 'react'
import {
    ScrollView,
    View,
    TextInput
} from 'react-native'
import styled from 'styled-components'
import Text from '../components/Text'
import Style from '../components/Style'
import * as Animatable from 'react-native-animatable';

export default SignInScreen = ({navigation}) => {
  
  
    const [loading, setLoading] = useState(false);
   
   
    const [fnameActive,setFnameActive] = useState(false);
    const [lnameActive,setLnameActive] = useState(false);
    const [emailActive,setEmailActive] = useState(false);
    const[passActive,setPassActive] = useState(false);
    const [pass2Active,setPass2Active] = useState(false);

    const [secureEntry, setSecureEntry] = useState({
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        confirm_password: '',
    })
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        pass: '',
    });
    const textInputFname = (first) => {
        setData({
            ...data,
            fname: first
        })
    }
    const textInputLname = (last) => {
        setData({
            ...data,
            lname: last
        })
    }
    const textInputEmail= (email) => {
            setData({
                ...data,
                email: email
            });
    }
    const textInputPass = (pass1) => {
        setData({
            ...data,
            pass: pass1
        });
    }
    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }
    const textInputPass2 = (pass2) => {
        setSecureEntry({
            ...secureEntry,
            confirm_password: pass2
        });
    }
    const updateConfirmSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            confirm_secureTextEntry: !secureEntry.confirm_secureTextEntry
        });
    }

    function signUp() {
        console.log(data);
    }
    return(
        <ScrollView>
        <Container>
            <Main>
                <Text title semi center>Sign up to get started.</Text>
            </Main>

            <Auth>
                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  fnameActive ? '#0217cf' :'#8e93a1'
                        }}
                    >First Name</Text>
                    <Animatable.View
                        // animation={
                        //     fnameErr ?
                        //     "shake"
                        //     :
                        //     null
                        // }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: fnameActive ? 1.5 : 1,
                            borderColor: fnameActive ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="Durgesh"
                                onChangeText={(user) => textInputFname(user)}
                                onFocus={() => setFnameActive(true)}
                                onBlur={() => setFnameActive(false)}
                         
                            />
                        </View>
                    </Animatable.View>
                   
                </View>
                {/* <AuthContainer>
                    <AuthTitle>First Name</AuthTitle>
                    <AuthField 
                    autoCapitalize="none" 
                    autoCompleteType="email" 
                    autoCorrect={false} 
                    autoFocus={true}
                    keyboardType="email-address"
                    onChangeText={email=>setEmail(email.trim())}
                    value={email}
                    />
                </AuthContainer> */}

                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  lnameActive ? '#0217cf' :'#8e93a1'
                        }}
                    >Last Name</Text>
                    <Animatable.View
                        // animation={
                        //     fnameErr ?
                        //     "shake"
                        //     :
                        //     null
                        // }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: lnameActive ? 1.5 : 1,
                            borderColor: lnameActive ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="Ahire"
                                onChangeText={(user) => textInputLname(user)}
                                onFocus={() => setLnameActive(true)}
                                onBlur={() => setLnameActive(false)}
                            />
                        </View>
                    </Animatable.View>
                   
                </View>

                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  emailActive ? '#0217cf' :'#8e93a1'
                        }}
                    >Email Address</Text>
                    <Animatable.View
                        // animation={
                        //     fnameErr ?
                        //     "shake"
                        //     :
                        //     null
                        // }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: emailActive ? 1.5 : 1,
                            borderColor: emailActive ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="durgesahire07@gmail.com"
                                onChangeText={(user) => textInputEmail(user)}
                                onFocus={() => setEmailActive(true)}
                                onBlur={() => setEmailActive(false)}
                            />
                        </View>
                    </Animatable.View>   
                </View>

                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  passActive ? '#0217cf' :'#8e93a1'
                        }}
                    >Your Password</Text>
                    <Animatable.View
                        // animation={
                        //     fnameErr ?
                        //     "shake"
                        //     :
                        //     null
                        // }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: passActive ? 1.5 : 1,
                            borderColor: passActive ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="********"
                                onChangeText={(user) => textInputEmail(user)}
                                onFocus={() => setPassActive(true)}
                                onBlur={() => setPassActive(false)}
                            />
                        </View>
                    </Animatable.View>   
                </View>
               
                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  pass2Active ? '#0217cf' :'#8e93a1'
                        }}
                    >Confirm Password</Text>
                    <Animatable.View
                        // animation={
                        //     fnameErr ?
                        //     "shake"
                        //     :
                        //     null
                        // }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: pass2Active ? 1.5 : 1,
                            borderColor: pass2Active ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="********"
                                onChangeText={(user) => textInputEmail(user)}
                                onFocus={() => setPass2Active(true)}
                                onBlur={() => setPass2Active(false)}
                            />
                        </View>
                    </Animatable.View>   
                </View>
               
            
                
             </Auth>   

            <SignUpContainer disabled={loading} onPress={signUp}>
                {loading? (
                    <Loading />
                ):(
                    <Text heavy center color="#fff">
                        Sign Up
                    </Text>
                )}
                
            </SignUpContainer>
            <SignIn onPress={()=>navigation.navigate("SignIn")} >
                <Text small center>Already have an account?{" "} 
                    <Text bold color="#0217cf">Sign In</Text>
                </Text>
            </SignIn>
            <HeaderGraphic>
                <RightCircle />
                <LeftCircle />
            </HeaderGraphic>
            <StatusBar style="light" />
        </Container>
        </ScrollView>
    )
}

const Container = styled.View`
    flex:1;
`
const Main = styled.View`
    margin-top: 150px;
`;

const Auth = styled.View`
    margin: 40px 32px 20px;    
`

const AuthContainer = styled.View`
    margin-bottom: 15px;
`

const AuthTitle = styled(Text)`
    color: #8e93a1;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`
const AuthField = styled.TextInput`
    border-bottom-color: #8e93a1;
    border-bottom-width: 0.5px;
    height: 30px
`
const SignUpContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #0217cf;
    border-radius: 6px
`;
const SignIn = styled.TouchableOpacity`
    margin-top: 16px;
    margin-bottom: 10px;
`
const Loading = styled.ActivityIndicator.attrs(props => ({
    color: "#fff",
    size: "small"

}))``;
const HeaderGraphic = styled.View`
    position: absolute;
    width: 100%;
    top: -50px;
    z-index: -100;
    
`;

const RightCircle = styled.View`
    background-color: #0217cf;
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 250px;
    right: -100px;
    top: -200px;
`;
const LeftCircle = styled.View`
    background-color: #23a6d5;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    left: -60px;
    top: -50px;
`;

import { StatusBar} from 'expo-status-bar'
import React,{useState,useContext} from 'react'
import {
    ScrollView,
    TextInput
} from 'react-native'
import styled from 'styled-components'
import Text from '../components/Text'
import { Entypo,Feather } from '@expo/vector-icons'; 
import * as Animatable from 'react-native-animatable';
import { UserContext } from "../context/UserContext";
import AppStackScreen from '../stack/AppStackScreen'

export default SignInScreen = ({navigation}) => {
    const [_,setUser] = useContext(UserContext);
    // console.log(setUser);
    const [data, setData] = useState({
        email: '',
        password: '',
        admin: false
    });
    const [secureEntry, setSecureEntry] = useState({
        secureTextEntry: true,
    })
    const [EmailError,setEmailError] = useState(false);
    const [PassError,setPassError] = useState(false);
   
    const [FillPassErr,setFillPassErr] = useState(false);
    const [FillEmailErr, setFillEmailErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEmailActive, setEmailActive] = useState(false);
    const [isPassActive, setPassActive] = useState(false);
    
    const textInput = (user) => {
        if(user==""){
            setFillEmailErr(true)
        }
        else{
            setFillEmailErr(false)
        }
       
        setEmailError(false)
        setData({
            ...data,
            email: user,
        });
    }
    const handlePasswordChange = (pass) => {
        if(pass==""){
            setFillPassErr(true)
        }
        else{
            setFillPassErr(false)
        }
      
        setPassError(false)
        setData({
            ...data,
            password: pass
        });
    }
    const updateSecureTextEntry = () => {
        setSecureEntry({
            ...secureEntry,
            secureTextEntry: !secureEntry.secureTextEntry
        });
    }
    const SignIn = async() => {
        
        if(data.email == "" || data.password == ""){
            if(data.email == ""){
                setEmailError(true)
                setFillEmailErr(true)
            }
             if( data.password == ""){
                setPassError(true)
                setFillPassErr(true)
            }
        }
        else {
           
            // setLoading(true)
            // try{
                setUser({
                    firstname:"df",
                    lastname: "sd",
                    email:"sdfs",
                    uid:"sdfss",
                    isLoggedIn: true,
                })
            // }catch(error){
            //     alert(error)
            // }finally{
            //     setLoading(false)
            // }
            
        }
    
    }

    return(
        <ScrollView>

        
        <Container>
            <Main>
                <Text title semi center>Welcome back.</Text>
            </Main>

            <Auth>
                <AuthContainer>
                <AuthTitle style={{color:  EmailError ? '#c41818' : isEmailActive ? '#0217cf' :'#8e93a1'}}>Email Address</AuthTitle>
                    <Animatable.View
                    animation={
                        EmailError ?
                        "shake"
                        :
                        null
                    }
                    style={{
                        flexDirection: 'row',
                        marginTop: 7,
                        borderWidth: isEmailActive ? 1.5 : 1,
                        borderColor: EmailError? '#c41818' : isEmailActive ? '#0217cf' : 'grey',
                        borderRadius: 10,
                        height: 40,
                        paddingLeft: 10,
                        paddingRight: 10,
                       
                    }}
                    >
                        <TextInput style={{flex:1}}
                         placeholder="avensmith@gmail.com"
                         autoCapitalize="none"
                         onChangeText={(user) => textInput(user)}
                         keyboardType="email-address"
                         onFocus={() => setEmailActive(true)}
                         onBlur={() => setEmailActive(false)}
                         
                        />  
                        {
                            EmailError &&
                            <Feather style={{paddingTop:5,paddingRight:5}} name="alert-circle" size={25} color="#c41818" />
                        }
                       
                    </Animatable.View>
                   {
                       FillEmailErr &&
                       <Text style={{color:'#c41818'}}>Email Address can't be empty.</Text>
                   }
                </AuthContainer>

                <AuthContainer>
                    <AuthTitle  style={{color: PassError ? '#c41818' :  isPassActive ? '#0217cf' :'#8e93a1'}}>Password</AuthTitle>
                    <Animatable.View
                        animation={
                            PassError ?
                            "shake"
                            :
                            null
                        }
                        style={{
                            flexDirection: 'row',
                            marginTop: 7,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderWidth: isPassActive ? 1.5 : 1,
                            borderColor: PassError ? '#c41818' : isPassActive ? '#0217cf' : 'grey',
                            height: 40,
                            paddingLeft: 10,
                            paddingRight: 10,
                        
                        }}
                        >
                        <TextInput style={{flex:1}}
                         placeholder="********"
                         secureTextEntry={secureEntry.secureTextEntry ? true : false}
                         autoCapitalize="none"
                         onChangeText={(pass) => handlePasswordChange(pass)}
                         onFocus={() => setPassActive(true)}
                         onBlur={() => setPassActive(false)}
                        >

                        </TextInput> 
                        <EyeToggle
                            onPress={updateSecureTextEntry}
                        >
                            {secureEntry.secureTextEntry ?
                            <Entypo style={{paddingTop:8}} name="eye-with-line" size={20} color="#bbc0c9" />
                            :
                            <Entypo style={{paddingTop:8}} name="eye" size={20} color="#0217cf" />
                            } 
                        </EyeToggle>
                        
                    </Animatable.View>
                    {
                        FillPassErr &&
                        <Text style={{color:'#c41818'}}>Password can't be empty.</Text>
                    }
                    
                     
                </AuthContainer>
                    <ForgetPass onPress={()=>navigation.navigate("SignUp")} >
                        <Text bold color="#0217cf">Forgot Password ?</Text>
                    </ForgetPass>
             </Auth>   

            
            <SignInContainer disabled={loading} onPress={SignIn}>
                {loading? (
                    <Loading />
                ):(
                    <Text heavy center color="#fff">
                        Sign In
                    </Text>
                )}
                
            </SignInContainer>
            <SignUp onPress={()=>navigation.navigate("SignUp")} >
                <Text small center>New to PGP ?{" "}
                    <Text bold color="#0217cf">Sign Up</Text>
                </Text>
            </SignUp>
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
    margin-top: 192px;
`;

const Auth = styled.View`
    margin: 64px 32px 32px;    
`

const AuthContainer = styled.View`
    margin-bottom: 15px;
`



const AuthTitle = styled(Text)`
   
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`

const SignInContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #0217cf;
    border-radius: 6px
`;
const EyeToggle = styled.TouchableOpacity``
const ForgetPass = styled.TouchableOpacity`
    margin-top: 5px;
`
const SignUp = styled.TouchableOpacity`
    margin-top: 16px;
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

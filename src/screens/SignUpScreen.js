import { StatusBar} from 'expo-status-bar'
import React,{useState} from 'react'
import {
    ScrollView,
    TextInput,View
} from 'react-native'
import styled from 'styled-components'
import Text from '../components/Text'
import { Entypo,Feather } from '@expo/vector-icons'; 
import * as Animatable from 'react-native-animatable';
import Style from '../components/Style'

export default SignInScreen = ({navigation}) => {
    
   
    //vibrate-red highlight and error states
    const [fnameError,setFnameError] = useState({
        emptyMsg: false,
        err: false
    });
    const [lnameError,setLnameError] = useState({
        emptyMsg: false,
        err: false
    });
    const [EmailError,setEmailError] = useState({
        emptyMsg: false,
        existMsg: false,
        err: false
    });
    const [PassError,setPassError] = useState({
        emptyMsg: false,
        lengthMsg: false,
        err: false
    });
    const [Pass2Error,setPass2Error] = useState({
        matchMsg: false,
        err: false
    });
    
    //touch active state
    const [fnameActive,setFnameActive] = useState(false);
    const [lnameActive,setLnameActive] = useState(false);
    const [emailActive,setEmailActive] = useState(false);
    const [passActive,setPassActive] = useState(false);
    const [pass2Active,setPass2Active] = useState(false);
    
    const [loading, setLoading] = useState(false);
    
    
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
        if(!first){
            setFnameError({ 
                emptyMsg: true,
            })
        }else{
            setFnameError({
                err: false,
                emptyMsg: false
            })
           
        }
        setData({
            ...data,
            fname: first
        })
       
    }
    const textInputLname = (last) => {

        if(!last){
            setLnameError({
                emptyMsg:true
            })
        }
        else {
            setLnameError({
                err: false,
                emptyMsg: false
            })
            
        }
        setData({
            ...data,
            lname: last
        })
        
    }
    const textInputEmail= (email) => {
        if(!email){
            setEmailError({
                emptyMsg:true
            })
        }
        else {
            setEmailError({
                err: false,
                emptyMsg: false,
                existMsg: false
            })
           
        }
        setData({
            ...data,
            email: email
        });
            
    }
    const textInputPass = (pass1) => {
        if(!pass1){
            setPassError({
                emptyMsg:true
            })
        }
        else {
            if(pass1.length<8){
                setPassError({
                    lengthMsg: true,
                })
            }
            else{
                setPassError({
                    err: false,
                    emptyMsg: false,
                    lengthMsg: false
                })
                
            }
           
            
        }
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
        if(data.pass!=pass2){
            setPass2Error({
                matchMsg: true
            })
        }
        else{
            setPass2Error({
                matchMsg: false
            })
        }
        
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

    const SignIn = () => {
        if(!data.fname || !data.lname || !data.email || !data.pass 
            || data.pass.length<8 || secureEntry.confirm_password!=data.pass){
            if(!data.fname){
                setFnameError({  
                    err: true,
                    emptyMsg: true
                })
            }
            if(!data.lname){
                setLnameError({
                    err: true,
                    emptyMsg: true,
                })
            }
            if(!data.email){
                setEmailError({
                    err: true,
                    emptyMsg: true,
                })
            }
            if(!data.pass){
                setPassError({
                    err: true,
                    emptyMsg: true,
                    lengthMsg: false
                })
                
            }
            else{
               
                if(data.pass.length<8){
                    setPassError({
                        ...PassError,
                        err: true,
                        lengthMsg: true,
                    });
                }
                if(secureEntry.confirm_password!=data.pass){
                    setPass2Error({
                        ...Pass2Error,
                        err: true,
                        matchMsg: true,
                    })
                }
            } 
        }
        else{
            console.log("all ok")
        }
    }
    return(
        <ScrollView>
        <Container>
            <Main>
                <Text title semi center>Sign Up to get started.</Text>
            </Main>

            <Auth>
            <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  fnameError.err ? '#c41818' : fnameActive ? '#0217cf' :'#8e93a1'
                        }}
                    >First Name</Text>
                    <Animatable.View
                        animation={
                            fnameError.err ?
                            "shake"
                            :
                            null
                        }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: fnameActive ? 1.5 : 1,
                            borderColor: fnameError.err ? '#c41818' : fnameActive ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="Durgesh"
                                onChangeText={(user) => textInputFname(user.trim())}
                                onFocus={() => setFnameActive(true)}
                                onBlur={() => setFnameActive(false)}
                                maxLength={20}
                            />
                             {
                            fnameError.err &&
                            <Feather style={{paddingTop:5,paddingRight:5}} name="alert-circle" size={25} color="#c41818" />
                             }
                        </View>
                    </Animatable.View>
                    {
                       fnameError.emptyMsg &&
                       <Text style={{color:'#c41818'}}>First Name can't be empty.</Text>
                    }
                </View>

                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color: lnameError.err ? '#c41818' : lnameActive ? '#0217cf' :'#8e93a1'
                        }}
                    >Last Name</Text>
                    <Animatable.View
                        animation={
                            lnameError.err ?
                            "shake"
                            :
                            null
                        }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: lnameActive ? 1.5 : 1,
                            borderColor: lnameError.err ? '#c41818' : lnameActive ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="Ahire"
                                onChangeText={(user) => textInputLname(user)}
                                onFocus={() => setLnameActive(true)}
                                onBlur={() => setLnameActive(false)}
                                maxLength={20}
                            />
                             {
                            lnameError.err &&
                            <Feather style={{paddingTop:5,paddingRight:5}} name="alert-circle" size={25} color="#c41818" />
                        }
                        </View>
                    </Animatable.View>
                    {
                       lnameError.emptyMsg &&
                       <Text style={{color:'#c41818'}}>Last Name can't be empty.</Text>
                    }
                </View>

                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  EmailError.err ? '#c41818' : emailActive ? '#0217cf' :'#8e93a1'
                        }}
                    >Email Address</Text>
                    <Animatable.View
                        animation={
                            EmailError.err ?
                            "shake"
                            :
                            null
                        }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: emailActive ? 1.5 : 1,
                            borderColor: EmailError.err ? '#c41818' : emailActive ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="durgesahire07@gmail.com"
                                onChangeText={(user) => textInputEmail(user)}
                                onFocus={() => setEmailActive(true)}
                                onBlur={() => setEmailActive(false)}
                                
                            />
                             {
                            EmailError.err &&
                            <Feather style={{paddingTop:5,paddingRight:5}} name="alert-circle" size={25} color="#c41818" />
                        }
                        </View>
                    </Animatable.View>  
                    {
                       EmailError.emptyMsg &&
                       <Text style={{color:'#c41818'}}>Email Address can't be empty.</Text>
                    }        
                </View>

                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  PassError.err ? '#c41818' : passActive ? '#0217cf' :'#8e93a1'
                        }}
                    >Your Password</Text>
                    <Animatable.View
                        animation={
                            PassError.err ?
                            "shake"
                            :
                            null
                        }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: passActive ? 1.5 : 1,
                            borderColor: PassError.err ? '#c41818' : passActive ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="********"
                                secureTextEntry={secureEntry.secureTextEntry ? true : false}
                                onChangeText={(user) => textInputPass(user.trim())}
                                onFocus={() => setPassActive(true)}
                                onBlur={() => setPassActive(false)}
                            />
                            <EyeToggle
                            onPress={updateSecureTextEntry}
                            >
                            {secureEntry.secureTextEntry ?
                            <Entypo style={{paddingTop:8}} name="eye-with-line" size={20} color="#bbc0c9" />
                            :
                            <Entypo style={{paddingTop:8}} name="eye" size={20} color="#0217cf" />
                            } 
                            </EyeToggle>
                        </View>
                    </Animatable.View>
                    {
                       PassError.emptyMsg &&
                       <Text style={{color:'#c41818'}}>Password can't be empty.</Text>
                    }    
                   {
                        PassError.lengthMsg &&
                        <Text style={{color:'#c41818'}}>Use 8 or more characters for password.</Text>
                    }
                </View>

                <View style={Style.textInputContainer}>
                    <Text 
                        style={{
                            ...Style.textInputTitle,
                            color:  Pass2Error.err ? '#c41818' :pass2Active ? '#0217cf' :'#8e93a1'
                        }}
                    >Confirm Your Password</Text>
                    <Animatable.View
                        animation={
                            Pass2Error.err ?
                            "shake"
                            :
                            null
                        }
                    >
                        <View
                        style={{
                            ...Style.textInputField,
                            borderWidth: pass2Active ? 1.5 : 1,
                            borderColor: Pass2Error.err ? '#c41818' : pass2Active ? '#0217cf' : 'grey',
                        }}>
                            <TextInput style={{flex:1}}
                                placeholder="********"
                                secureTextEntry={secureEntry.confirm_secureTextEntry ? true : false}
                                onChangeText={(user) => textInputPass2(user)}
                                onFocus={() => setPass2Active(true)}
                                onBlur={() => setPass2Active(false)}
                            />
                            <EyeToggle
                            onPress={updateConfirmSecureTextEntry}
                            >
                            {secureEntry.confirm_secureTextEntry ?
                            <Entypo style={{paddingTop:8}} name="eye-with-line" size={20} color="#bbc0c9" />
                            :
                            <Entypo style={{paddingTop:8}} name="eye" size={20} color="#0217cf" />
                            } 
                        </EyeToggle>
                        </View>
                    </Animatable.View>  
                    {
                       Pass2Error.matchMsg &&
                       <Text style={{color:'#c41818'}}>Password don't match.</Text>
                    }  
                </View>
               
             </Auth>   

            
            <SignInContainer disabled={loading} onPress={SignIn}>
                {loading? (
                    <Loading />
                ):(
                    <Text heavy center color="#fff">
                        Sign Up
                    </Text>
                )}
                
            </SignInContainer>
            <SignUp onPress={()=>navigation.navigate("SignIn")} >
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
    margin-top: 110px;
`;

const Auth = styled.View`
    margin: 20px 32px 15px;    
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
    margin-bottom: 10px;
`
const Loading = styled.ActivityIndicator.attrs(props => ({
    color: "#fff",
    size: "small"

}))``;
const HeaderGraphic = styled.View`
    position: absolute;
    width: 100%;
    top: -75px;
    z-index: -100;
    
`;

const RightCircle = styled.View`
    background-color: #0217cf;
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 250px;
    right: -100px;
    top: -220px;
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

import { StatusBar} from 'expo-status-bar'
import React,{useState} from 'react'
import {
    ScrollView
} from 'react-native'
import styled from 'styled-components'
import Text from '../components/Text'

export default SignInScreen = ({navigation}) => {
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [confirmpass, setConfirmpass] = useState();
    return(
        <ScrollView>
        <Container>
            <Main>
                <Text title semi center>Sign up to get started.</Text>
            </Main>

            <Auth>
                <AuthContainer>
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
                </AuthContainer>

                <AuthContainer>
                    <AuthTitle>Last Name</AuthTitle>
                    <AuthField 
                    autoCapitalize="none" 
                    autoCompleteType="email" 
                    autoCorrect={false} 
                    autoFocus={true}
                    keyboardType="email-address"
                    onChangeText={email=>setEmail(email.trim())}
                    value={email}
                    />
                </AuthContainer>

                <AuthContainer>
                    <AuthTitle>Email Address</AuthTitle>
                    <AuthField 
                    autoCapitalize="none" 
                    autoCompleteType="email" 
                    autoCorrect={false} 
                    autoFocus={true}
                    keyboardType="email-address"
                    onChangeText={email=>setEmail(email.trim())}
                    value={email}
                    />
                </AuthContainer>

                <AuthContainer>
                    <AuthTitle>Password</AuthTitle>
                    <AuthField 
                    autoCapitalize="none" 
                    autoCompleteType="password" 
                    autoCorrect={false} 
                    
                    secureTextEntry={true}
                    onChangeText={password=>setPassword(password.trim())}
                    value={password}
                    />
                </AuthContainer>
                <AuthContainer>
                    <AuthTitle>Confirm Password</AuthTitle>
                    <AuthField 
                    autoCapitalize="none" 
                    autoCompleteType="password" 
                    autoCorrect={false} 
                 
                    secureTextEntry={true}
                    onChangeText={confirmpass=>setConfirmpass(confirmpass.trim())}
                    value={confirmpass}
                    />
                </AuthContainer>
             </Auth>   

            <SignUpContainer disabled={loading}>
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
                    <Text bold color="#8022d9">Sign In</Text>
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
    background-color: #8022d9;
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
    background-color: #8022d9;
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

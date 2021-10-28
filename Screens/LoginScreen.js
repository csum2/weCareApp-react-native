/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React, {useState} from 'react';
//import { StatusBar } from 'expo-status-bar';
import {Formik} from 'formik';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup'

import {
   StyledContainer,
   InnerContainer,
   PageTitle,
   SubTitle,
   StyledFormArea,
   LeftIcon,
   StyledInputTheLabel,
   StyledTextInput,
   StyledInputError,
   RightIcon,
   Colors,
   StyledButton,
   ButtonText,
   MsgBox,
   Line,
   ExtraText,
   ExtraView,
   TextLink,
   TextLinkContent,
} from './../components/styles';


const {logoColor, buttonColors, blackColor, backgroundApp} = Colors;

const loginValidationSchema = yup.object().shape({
  userId: yup
    .string()
    .required('User ID is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

const LoginScreen = ({navigation}) =>{
   const [hidePassword, setHidePassword] = useState(true);

   return(
       <StyledContainer>
           <InnerContainer>
               <SubTitle>Welcome To</SubTitle>
               <PageTitle>WeCare</PageTitle>

               <Formik
                   validationSchema={loginValidationSchema}
                   initialValues={{userId:'', password:''}}
                   onSubmit={(values) =>{
                       console.log(values);
                       AsyncStorage.setItem('user_id', values.userId);
                       navigation.replace('HomeScreen');
                   }}
               >
               {({handleChange, handleBlur, handleSubmit, values, errors, isValid,})=>(
                   <StyledFormArea>
                       <MyTextInput
                           name="userId"
                           label="User ID"
                           icon="user"
                           placeholder="johndoe"
                           placeholderTextColor={logoColor}
                           onChangeText={handleChange('userId')}
                           onBlur={handleBlur('userId')}
                           value={values.userId}
                           keyboardType="default"
                       />
                       {errors.userId &&
                         <StyledInputError>{errors.userId}</StyledInputError>
                       }
                       <MyTextInput
                           name="password"
                           label="Password"
                           icon="lock"
                           placeholder="********"
                           placeholderTextColor={logoColor}
                           onChangeText={handleChange('password')}
                           onBlur={handleBlur('password')}
                           value={values.password}
                           secureTextEntry={hidePassword}
                           isPassword = {true}
                           hidePassword={hidePassword}
                           setHidePassword={setHidePassword}
                       />
                       {errors.password &&
                         <StyledInputError>{errors.password}</StyledInputError>
                       }
                       <Line />
                       <StyledButton onPress={handleSubmit} disabled={!isValid} >
                           <ButtonText> Login</ButtonText>
                       </StyledButton>

                   </StyledFormArea>
               )}
               </Formik>
           </InnerContainer>
       </StyledContainer>
   );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
  return(
      <View>
          <LeftIcon>
              <FontAwesome5 name={icon} size={38} color={buttonColors} />
          </LeftIcon>

          <StyledInputTheLabel>{label}</StyledInputTheLabel>
          <StyledTextInput {...props} />
          {isPassword && (
              <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                  <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={38} color={buttonColors} />
              </RightIcon>
          )}
      </View>
  )
}


export default LoginScreen;

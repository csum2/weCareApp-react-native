import React, {useState, useRef} from 'react';
//import { StatusBar } from 'expo-status-bar';
import {Formik} from 'formik';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MaterialHeaderButtons } from './../components/WecareHeaderButton';
import { Item, HiddenItem, OverflowMenu, Divider } from 'react-navigation-header-buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup'

import {
   StyledContainer,
   InnerContainer,
   PageTitle,
   SubTitle,
   StyledFormArea,
   LeftIcon,
   StyledInputTheLabel2,
   StyledTextInput2,
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

const {backgroundApp, logoColor, buttonColors, accentColors, accentBackground, blackColor, errorColor} = Colors;

const AddPatientValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is Required'),
  lastName: yup
    .string()
    .required('Last Name is required'),
})

const AddPatientBasicScreen = ({navigation}) => {
  const formRef = useRef();
  const [input, setInput] = useState({});

  const saveInput = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
      if (formRef.current.isValid) {
        //TODO: POST to the web service
      }
    }
  };

  // Make a option menu on the upper right for saving
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialHeaderButtons>
          <OverflowMenu
            style={{ marginHorizontal: 10 }}
            OverflowIcon={({ color }) => (
              <MaterialIcons name="more-horiz" size={30} color={backgroundApp} />
            )}
          >
            <HiddenItem title="Save" onPress={()=>{}} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <StyledContainer>
      <InnerContainer>
        <Formik
            validationSchema={AddPatientValidationSchema}
            onSubmit={(values) => setInput(values)}
            innerRef={formRef}
            initialValues={{
              firstName:'',
              lastName:'',
            }}
        >
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid,})=>(
            <StyledFormArea>
                <MyTextInput
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    keyboardType="default"
                />
                {errors.firstName &&
                  <StyledInputError>{errors.firstName}</StyledInputError>
                }
                <MyTextInput
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    keyboardType="default"
                />
                {errors.lastName &&
                  <StyledInputError>{errors.lastName}</StyledInputError>
                }
            </StyledFormArea>
        )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
    );
}

const MyTextInput = ({label, ...props}) => {
  return(
      <View>
          <StyledInputTheLabel2>{label}</StyledInputTheLabel2>
          <StyledTextInput2 {...props} />
      </View>
  )
}
export default AddPatientBasicScreen;

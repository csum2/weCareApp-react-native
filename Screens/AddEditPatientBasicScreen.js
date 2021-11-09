/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React, {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaterialHeaderButtons} from './../components/WecareHeaderButton';
import {Item, HiddenItem, OverflowMenu, Divider} from 'react-navigation-header-buttons';
import { Formik, Field } from 'formik';
import { View } from 'react-native';
import * as yup from 'yup'
import {
   StyledContainer,
   InnerContainer,
   StyledScrollView,
   StyledFormArea,
   StyledInputTheLabel2,
   StyledTextInput2,
   StyledInputError,
   Line,
   Colors,
} from './../components/styles';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
import { ScrollView } from 'react-native-gesture-handler';
import { getLatestData } from './../components/utilities';


const {backgroundApp, logoColor, buttonColors, accentColors, accentBackground, blackColor, errorColor} = Colors;
const AddPatientValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is Required'),
  lastName: yup
    .string()
    .required('Last Name is required'),
  dob: yup
    .string()
    .required('Date of birth is required'),
  email: yup
    .string()
    .required('Email is required'),
  contactNo: yup
    .string()
    .required('Contact Phone is required'),
  address: yup
    .string()
    .required('Address is required'),
  emergencyContact: yup
    .string()
    .required('Emergency Contact is required'),
  emergencyPhone: yup
    .string()
    .required('Emergency Phone is required'),
   relationship: yup
    .string()
    .required('Relationship is required'),
})
  //array for gender
  const gender = [
    {label: "Male", value: 1},
    {label: "Female", value: 2},
  ]

const AddEditPatientBasicScreen = ({ route, navigation }) => {
  var { mode } = route.params;
  const { _id } = route.params;
  const patientdata = route.params;
  console.log("AddEditPatientBasicScreen, patientdata:" + JSON.stringify(patientdata));

  if (_id === undefined || !_id.length ) {
    mode = "add"
  }

  console.log("AddEditPatientBasicScreen, route.params.mode:" + mode);

  var initVal = buildInitValues(mode, patientdata);
  console.log("AddEditPatientBasicScreen, initVal:" + JSON.stringify(initVal));

  // for the external Formik submit button
  const formRef = useRef();
  const [input, setInput] = useState({});

  const saveInput = () => {
    console.log("saveInput of edit patient data")
    //validateForm().then(() => console.log("blah"))
    if (formRef.current) {
      formRef.current.handleSubmit();
      if (formRef.current.isValid) {
        //TODO: POST to the web service
        if (mode == "add") {
          // insert a new record to the database
        } else {
          // update a record in the database
        }
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
              <MaterialIcons name="more-horiz"
                size={30} color={backgroundApp} />
            )}
          >
            <HiddenItem title="Save" onPress={() => saveInput()} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
    // Change the screen title dynamically according to the mode
    if (route.params.mode != "add") {
      navigation.setOptions({ title: 'Edit a Patient' });
    }
  }, [navigation]);

  return (
    <ScrollView>
    <StyledContainer>
      <InnerContainer>
        <Formik
            validationSchema={AddPatientValidationSchema}
            onSubmit={(values) => setInput(values)}
            innerRef={formRef}
            initialValues={{
              firstName: initVal.firstName,
              lastName: initVal.lastName,
              dob: initVal.dob,
              email: initVal.email,
              contactNo: initVal.contactNo,
              address: initVal.address,
              emergencyContact: initVal.emergencyContact,
              emergencyPhone: initVal.emergencyPhone,
              relationship: initVal.relationship,
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
                <Line/>
                  <MyTextInput
                    name="dob"
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('dob')}
                    onBlur={handleBlur('dob')}
                    value={values.dob}
                    keyboardType="default"
                />
                {errors.dob &&
                  <StyledInputError>{errors.dob}</StyledInputError>
                }
                  <MyRadioGroup
                    name="radioGroup"
                    label="Gender"
                />
                <Line/>
                   <MyTextInput
                    name="email"
                    label="Email"
                    placeholder="Email"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="default"
                />
                {errors.email &&
                  <StyledInputError>{errors.email}</StyledInputError>
                }
                  <MyTextInput
                    name="contactNo"
                    label="Contact Phone"
                    placeholder="Contact Phone"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('contactNo')}
                    onBlur={handleBlur('contactNo')}
                    value={values.contactNo}
                    keyboardType="default"
                />
                {errors.contactNo &&
                  <StyledInputError>{errors.contactNo}</StyledInputError>
                }
                   <MyTextInput
                    name="address"
                    label="Residential Address"
                    placeholder="Residential Address"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    keyboardType="default"
                />
                {errors.address &&
                  <StyledInputError>{errors.address}</StyledInputError>
                }
                <Line/>
                <MyTextInput
                    name="emergencyContact"
                    label="Emergency Contact"
                    placeholder="Emergency Contact"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('emergencyContact')}
                    onBlur={handleBlur('emergencyContact')}
                    value={values.emergencyContact}
                    keyboardType="default"
                />
                {errors.address &&
                  <StyledInputError>{errors.address}</StyledInputError>
                }
                  <MyTextInput
                    name="emergencyPhone"
                    label="Emergency Phone"
                    placeholder="Emergency Phone"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('emergencyPhone')}
                    onBlur={handleBlur('emergencyPhone')}
                    value={values.emergencyPhone}
                    keyboardType="default"
                />
                {errors.emergencyPhone &&
                  <StyledInputError>{errors.emergencyPhone}</StyledInputError>
                }
                  <MyTextInput
                    name="relationship"
                    label="Relationship"
                    placeholder="Relationship"
                    placeholderTextColor={logoColor}
                    onChangeText={handleChange('relationship')}
                    onBlur={handleBlur('relationship')}
                    value={values.relationship}
                    keyboardType="default"
                />
                {errors.relationship &&
                  <StyledInputError>{errors.relationship}</StyledInputError>
                }
            </StyledFormArea>
        )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
    </ScrollView>

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
  const MyRadioGroup = ({label} ) => {
      return (
        <View>
          <StyledInputTheLabel2> {label} </StyledInputTheLabel2>
          <RadioForm
            radio_props = {gender}
            onPress={(value) => {}}
            buttonColor={logoColor}
            selectedButtonColor={logoColor}
            buttonSize={25}
            labelStyle={{paddingHorizontal:15, fontSize: 15}}
            wrapStyle={{marginLeft: 20}}
            formHorizontal={true}
            />
        </View>


    )
}
function buildInitValues(buildMode, originalPatientData) {
  if (buildMode == "add") {    // add mode
    const returnVal = {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      email: '',
      contactNo: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
      relationship: ''
    };
    return returnVal;
  } else {
    // all inital values are coming from the params for edit mode
    const returnVal = {
      _id: originalPatientData._id,
      firstName: originalPatientData.first_name,
      lastName: originalPatientData.last_name,
      dob: originalPatientData.date_of_birth,
      gender: originalPatientData.biological_sex,
      email: originalPatientData.email,
      contactNo: originalPatientData.contact_phone,
      address: originalPatientData.residential_address,
      emergencyContact: originalPatientData.emergency_contact,
      emergencyPhone: originalPatientData.emergency_phone,
      relationship: originalPatientData.relationship
    };
    return returnVal;
  }
}


export default AddEditPatientBasicScreen;

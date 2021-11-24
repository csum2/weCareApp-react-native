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
import {
  Item,
  HiddenItem,
  OverflowMenu,
  Divider,
} from 'react-navigation-header-buttons';
import {Formik, Field} from 'formik';
import {Alert, View} from 'react-native';
import * as yup from 'yup';
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
import AddPatientValidationSchema from './../validations/AddPatientValidationSchema';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {ScrollView} from 'react-native-gesture-handler';
import {getLatestData} from './../components/utilities';

const {
  backgroundApp,
  logoColor,
  buttonColors,
  accentColors,
  accentBackground,
  blackColor,
  errorColor,
} = Colors;

const HOST = 'http://127.0.0.1:5000';

//array for gender
const gender = [
  {label: 'Male', value: 1},
  {label: 'Female', value: 2},
];

const AddEditPatientBasicScreen = ({route, navigation}) => {
  var {mode} = route.params;
  const _id = route.params._id;
  const patientdata = []; //route.params;
  console.log(
    'AddEditPatientBasicScreen, patientdata:' + JSON.stringify(patientdata),
  );

  if (_id === undefined || !_id.length) {
    mode = 'add';
  }

  console.log('AddEditPatientBasicScreen, route.params.mode:' + mode);

  var initVal = buildInitValues(mode, patientdata);
  console.log('AddEditPatientBasicScreen, initVal:' + JSON.stringify(initVal));

  // for the external Formik submit button
  const formRef = useRef();
  //const [input, setInput] = useState({});

  const saveInput = () => {
    //console.log('saveInput of edit patient data');
    //validateForm().then(() => console.log("blah"))
    if (formRef.current) {
      if (formRef.current.isValid) {
        //TODO: POST to the web service
        formRef.current.handleSubmit();
      }
    }
  };

  const savePatientData = async inputValues => {
    var newPatientData = {};
    var uri = '';
    var restOptions = {};
    if (mode == 'add') {
      console.log('AddEditPatientBasicScreen, add mode');
      newPatientData = buildNewPatientFromAdd(patientdata, inputValues);
      uri = HOST + '/patients';
      const httpBody = JSON.stringify(newPatientData);
      console.log('AddEditPatientBasicScreen, httpBody: ' + httpBody);
      //defining method value
      restOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: httpBody,
      };
    }

    console.log('AddEditPatientBasicScreen, uri: ' + uri);

    await fetch(uri, restOptions)
      .then(response => response.json())
      .then(data => {
        Alert.alert('Patien Basic data', 'saved successfully!', [
          {text: 'Ok', onPress: () => navigation.goBack()},
        ]);
      })
      .catch(response => {
        //catching error
        console.log('AddEditPatientBasicScreen, add new patient failed :(');
        console.log('response: ' + response);
        Alert.alert('Error Saving new User', response.toString(), [
          {text: 'Ok'},
        ]);
      });
  };

  // Make a option menu on the upper right for saving
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialHeaderButtons>
          <OverflowMenu
            style={{marginHorizontal: 10}}
            OverflowIcon={({color}) => (
              <MaterialIcons
                name="more-horiz"
                size={30}
                color={backgroundApp}
              />
            )}>
            <HiddenItem title="Save" onPress={() => saveInput()} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
    // Change the screen title dynamically according to the mode
    if (route.params.mode != 'add') {
      navigation.setOptions({title: 'Edit a Patient'});
    }
  }, [navigation]);

  return (
    <ScrollView>
      <StyledContainer>
        <InnerContainer>
          <Formik
            validationSchema={AddPatientValidationSchema}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={values => savePatientData(values)}
            innerRef={formRef}
            initialValues={{
              first_name: initVal.first_name,
              last_name: initVal.last_name,
              date_of_birth: initVal.date_of_birth,
              email: initVal.email,
              contact_phone: initVal.contact_phone,
              residential_address: initVal.residential_address,
              emergency_contact: initVal.emergency_contact,
              emergency_phone: initVal.emergency_phone,
              relationship: initVal.relationship,
            }}>
            {({
              handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              validateForm,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  name="first_name"
                  label="First Name"
                  placeholder="First Name"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  value={values.first_name}
                  keyboardType="default"
                />
                {errors.first_name && (
                  <StyledInputError>{errors.first_name}</StyledInputError>
                )}
                <MyTextInput
                  name="last_name"
                  label="Last Name"
                  placeholder="Last Name"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  value={values.last_name}
                  keyboardType="default"
                />
                {errors.last_name && (
                  <StyledInputError>{errors.last_name}</StyledInputError>
                )}
                <Line />
                <MyTextInput
                  name="date_of_birth"
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('date_of_birth')}
                  onBlur={handleBlur('date_of_birth')}
                  value={values.date_of_birth}
                  keyboardType="numeric"
                />
                {errors.date_of_birth && (
                  <StyledInputError>{errors.date_of_birth}</StyledInputError>
                )}
                <MyRadioGroup name="radioGroup" label="Gender" />
                <Line />
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
                {errors.email && (
                  <StyledInputError>{errors.email}</StyledInputError>
                )}
                <MyTextInput
                  name="contact_phone"
                  label="Contact Phone"
                  placeholder="Contact Phone"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('contact_phone')}
                  onBlur={handleBlur('contact_phone')}
                  value={values.contact_phone}
                  keyboardType="numeric"
                />
                {errors.contact_phone && (
                  <StyledInputError>{errors.contact_phone}</StyledInputError>
                )}
                <MyTextInput
                  name="residential_address"
                  label="Residential Address"
                  placeholder="Residential Address"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('residential_address')}
                  onBlur={handleBlur('residential_address')}
                  value={values.residential_address}
                  keyboardType="default"
                />
                {errors.residential_address && (
                  <StyledInputError>
                    {errors.residential_address}
                  </StyledInputError>
                )}
                <Line />
                <MyTextInput
                  name="emergency_contact"
                  label="Emergency Contact"
                  placeholder="Emergency Contact"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('emergency_contact')}
                  onBlur={handleBlur('emergency_contact')}
                  value={values.emergency_contact}
                  keyboardType="default"
                />
                {errors.emergency_contact && (
                  <StyledInputError>
                    {errors.emergency_contact}
                  </StyledInputError>
                )}
                <MyTextInput
                  name="emergency_phone"
                  label="Emergency Phone"
                  placeholder="Emergency Phone"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('emergency_phone')}
                  onBlur={handleBlur('emergency_phone')}
                  value={values.emergency_phone}
                  keyboardType="numeric"
                />
                {errors.emergency_phone && (
                  <StyledInputError>{errors.emergency_phone}</StyledInputError>
                )}
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
                {errors.relationship && (
                  <StyledInputError>{errors.relationship}</StyledInputError>
                )}
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  );
};

const MyTextInput = ({label, ...props}) => {
  return (
    <View>
      <StyledInputTheLabel2>{label}</StyledInputTheLabel2>
      <StyledTextInput2 {...props} />
    </View>
  );
};
const MyRadioGroup = ({label}) => {
  return (
    <View>
      <StyledInputTheLabel2> {label} </StyledInputTheLabel2>
      <RadioForm
        radio_props={gender}
        onPress={value => {}}
        buttonColor={logoColor}
        selectedButtonColor={logoColor}
        buttonSize={25}
        labelStyle={{paddingHorizontal: 15, fontSize: 15}}
        wrapStyle={{marginLeft: 20}}
        formHorizontal={true}
      />
    </View>
  );
};
function buildInitValues(buildMode, originalPatientData) {
  if (buildMode == 'add') {
    // add mode
    const returnVal = {
      first_name: '',
      last_name: '',
      date_of_birth: '',
      biological_sex: '',
      email: '',
      contact_phone: '',
      residential_address: '',
      emergency_contact: '',
      emergency_phone: '',
      relationship: '',
    };
    return returnVal;
  } else {
    // all inital values are coming from the params for edit mode
    const returnVal = {
      _id: originalPatientData._id,
      first_name: originalPatientData.first_name,
      last_name: originalPatientData.last_name,
      date_of_birth: originalPatientData.date_of_birth,
      biological_sex: originalPatientData.biological_sex,
      email: originalPatientData.email,
      contact_phone: originalPatientData.contact_phone,
      residential_address: originalPatientData.residential_address,
      emergency_contact: originalPatientData.emergency_contact,
      emergency_phone: originalPatientData.emergency_phone,
      relationship: originalPatientData.relationship,
    };
    return returnVal;
  }
}

function buildNewPatientFromAdd(oldJsonArray, inData) {
  // a new entry is build and added to the existing JSON array
  var newEntry = new Object();
  newEntry.first_name = inData.first_name;
  newEntry.last_name = inData.last_name;
  newEntry.date_of_birth = inData.date_of_birth;
  newEntry.biological_sex = 'male'; //inData.gender;
  newEntry.email = inData.email;
  newEntry.contact_phone = inData.contact_phone;
  newEntry.residential_address = inData.residential_address;
  newEntry.emergency_contact = inData.emergency_contact;
  newEntry.emergency_phone = inData.emergency_phone;
  newEntry.relationship = inData.relationship;
  return newEntry;
}

export default AddEditPatientBasicScreen;

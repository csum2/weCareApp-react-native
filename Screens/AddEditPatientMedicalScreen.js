/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React, {useState, useRef} from 'react';
import {Alert} from "react-native";
import {Formik, Field} from 'formik';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaterialHeaderButtons} from './../components/WecareHeaderButton';
import {Item, HiddenItem, OverflowMenu, Divider} from 'react-navigation-header-buttons';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
   StyledScrollView,
   RightIcon2,
   Colors,
   StyledButton,
   ButtonText,
   MsgBox,
   Line,
   ExtraText,
   ExtraView,
   TextLink,
   TextLinkContent,
   NameTitle1,
   NameTitle2,
} from './../components/styles';
import MedicalValidationSchema from './../validations/MedicalValidationSchema';
import {getLatestData, getISODate, getTime24hoursFormat} from './../components/utilities';

const {backgroundApp, logoColor, buttonColors, accentColors, accentBackground, blackColor, errorColor} = Colors;

//Android emulator use HOST = 'http://10.0.2.2:5000'
//IOS simulator use HOST = 'http://127.0.0.1:5000'
const HOST = 'http://127.0.0.1:5000'

const AddEditPatientMedicalScreen = ({ route, navigation}) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  // get the parameters
  var { mode } = route.params;
  const _idPatient = route.params._id;
  var medicaldata = [];
  if (route.params.medicaldata === undefined || !route.params.medicaldata.length) {
    mode = "add";   //override the edit mode to add mode if no elements exist in the medical data array
  } else {
    medicaldata = route.params.medicaldata;
  }

  console.log("AddEditPatientMedicalScreen, mode:" + mode);
  console.log("AddPatientMedicalScreen, _idPatient:" + _idPatient);
  //console.log("EditPatientMedicalScreen, route.params.medicaldata:" + JSON.stringify(medicaldata[0]));
  var initVal = buildInitValues(mode, medicaldata);
  console.log("AddEditPatientMedicalScreen, medicaldata:" + JSON.stringify(medicaldata));
  //console.log("AddEditPatientMedicalScreen, initVal:" + JSON.stringify(initVal));

  // for the external Formik submit button
  const formRef = useRef();
  const externalFormSubmit = () => {
    //console.log("AddEditPatientMedicalScreen, externalFormSubmit");
    if (formRef.current) {
      if (formRef.current.isValid) {
        formRef.current.handleSubmit();
      }
    }
  };

  const saveMedicalData = async (inputVales) => {
    //console.log("AddEditPatientMedicalScreen, saveMedicalData");
    var newMedicaldata = {};
    var uri = '';
    var restOptions = {};
    if (mode == "add") {
      // insert a new record to the database
      //console.log("AddEditPatientMedicalScreen, add mode input: " + JSON.stringify(inputVales));
      console.log("AddEditPatientMedicalScreen, add mode");
      newMedicaldata = buildNewDataFromAdd(medicaldata, inputVales);
      uri = HOST + '/patients/' + _idPatient + '/medical'
      //console.log("AddEditPatientMedicalScreen, add mode new medicaldata: " + JSON.stringify(newMedicaldata));
      const httpBody = JSON.stringify(newMedicaldata);
      console.log("AddEditPatientMedicalScreen, httpBody: " + httpBody);
      // the method value below must be in uppercase
      restOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: httpBody
      };
    } else {
      // update a record in the database
      //console.log("AddEditPatientMedicalScreen, edit mode input: " + JSON.stringify(inputVales));
      console.log("AddEditPatientMedicalScreen, edit mode data _id: " + JSON.stringify(initVal._id));
      newMedicaldata = buildNewDataFromEdit(medicaldata, inputVales, initVal._id);
      uri = HOST + '/patients/' + _idPatient + '/medical/' + initVal._id
      //console.log("AddEditPatientMedicalScreen, edit mode new medicaldata: " + JSON.stringify(newMedicaldata));
      const httpBody = JSON.stringify(newMedicaldata);
      console.log("AddEditPatientMedicalScreen, httpBody: " + httpBody);
      // the method value below must be in uppercase
      restOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: httpBody
      };
    }

    console.log("AddEditPatientMedicalScreen, uri: " + uri);

    await fetch(uri, restOptions)
      .then((response) => response.json())
      .then((data) => {
        Alert.alert(
          "Medical Data",
          "saved successfully!",
          [
            { text: "OK", onPress: () => navigation.goBack() }
          ]
        );
      })
      .catch((response) => {
        // error saveing the data
        console.log("AddEditPatientMedicalScreen, saveMedicalData failed!!!!!!");
        console.log("response: " + response);
        Alert.alert(
          "Error Saving Medical Data",
          response.toString(),
          [
            { text: "OK"}
          ]
        );
      });

  };

  // Make a option menu on the upper right for saving
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialHeaderButtons>
          <OverflowMenu
            style={{ marginHorizontal: 10 }}
            OverflowIcon={({ color }) => (
              <MaterialIcons name={Platform.OS === 'ios' ? "more-horiz" : "more-vert"}
                size={30} color={backgroundApp} />
            )}
          >
            <HiddenItem title="Save" onPress={() => externalFormSubmit()} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
    // Change the screen title dynamically according to the mode
    if (route.params.mode != "add") {
      navigation.setOptions({ title: 'Edit Medical Data' });
    }
  }, [navigation]);

  const DatePickerField = ({ DateFieldName, TimeFieldName, inDate, inTime, onSet }) => {
    // for the date picker
    const defaultPickerDate = new Date(inDate);
    defaultPickerDate.setHours(inTime.substr(0,2), inTime.substr(3,2), 0);
    const [pickerDate, setPickerDate] = useState(defaultPickerDate);

    return (
      <DatePicker
        modal
        open={pickerOpen}
        date={defaultPickerDate}
        onConfirm={(date) => {
          setPickerOpen(false);
          onSet(DateFieldName, getISODate(date));
          onSet(TimeFieldName, getTime24hoursFormat(date));
          //setPickerDate(date);
          //setFieldValue(field.measuringDate, getISODate(date));
          //setFieldValue(field.measuringTime, getTime24hoursFormat(date));
        }}
        onCancel={() => {
          setPickerOpen(false)
        }}
      />
    );
  };

  const MyTextInput = ({label, isDateField, ...props}) => {
    return(
        <View>
            <StyledInputTheLabel2>{label}</StyledInputTheLabel2>
            <StyledTextInput2 {...props} />
            {isDateField && (
                <RightIcon2 onPress={() => setPickerOpen(true)}>
                    <FontAwesome5 name="calendar-alt" size={28} color={logoColor} />
                </RightIcon2>
            )}
        </View>
    )
  }

  return (
    <StyledContainer>
      <InnerContainer>
        <NameTitle1>{route.params.first_name + " " + route.params.last_name}</NameTitle1>
        <NameTitle2>Day of Birth: {route.params.date_of_birth}</NameTitle2>
        <NameTitle2>Biological sex: {route.params.biological_sex}</NameTitle2>
        <Line />
        <StyledScrollView>
        <Formik
            validationSchema={MedicalValidationSchema}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={(values) => saveMedicalData(values)}
            innerRef={formRef}
            initialValues={{
              measuringDate: initVal.measuringDate,
              measuringTime: initVal.measuringTime,
              systolicPressure: initVal.systolicPressure,
              diastolicPressure: initVal.diastolicPressure,
              respiratoryRate: initVal.respiratoryRate,
              oxygenLevel: initVal.oxygenLevel,
              heartbeatRate: initVal.heartbeatRate,
            }}
        >
        {({handleChange, setFieldValue, handleBlur, handleSubmit, values, errors, isValid, validateForm})=>(
            <StyledFormArea>
              <DatePickerField
                DateFieldName="measuringDate"
                TimeFieldName="measuringTime"
                inDate={values.measuringDate}
                inTime={values.measuringTime}
                onSet={setFieldValue}
              />
              <MyTextInput
                  name="measuringDate"
                  label="Measuring Date"
                  isDateField={true}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('measuringDate')}
                  onBlur={handleBlur('measuringDate')}
                  value={values.measuringDate}
                  keyboardType="numeric"
              />
                  {errors.measuringDate &&
                    <StyledInputError>{errors.measuringDate}</StyledInputError>
                  }
              <MyTextInput
                  name="measuringTime"
                  label="Measuring Time"
                  placeholder="HH:MM in 24-hour format"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('measuringTime')}
                  onBlur={handleBlur('measuringTime')}
                  value={values.measuringTime}
              />
                  {errors.measuringTime &&
                    <StyledInputError>{errors.measuringTime}</StyledInputError>
                  }
              <MyTextInput
                  name="systolicPressure"
                  label="Systolic Blood Pressure"
                  placeholder="in mmHg"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('systolicPressure')}
                  onBlur={handleBlur('systolicPressure')}
                  value={values.systolicPressure}
                  keyboardType="numeric"
              />
                  {errors.systolicPressure &&
                    <StyledInputError>{errors.systolicPressure}</StyledInputError>
                  }
              <MyTextInput
                  name="diastolicPressure"
                  label="Diastolic Blood Pressure"
                  placeholder="in mmHg"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('diastolicPressure')}
                  onBlur={handleBlur('diastolicPressure')}
                  value={values.diastolicPressure}
                  keyboardType="numeric"
              />
                  {errors.diastolicPressure &&
                    <StyledInputError>{errors.diastolicPressure}</StyledInputError>
                  }
              <MyTextInput
                  name="respiratoryRate"
                  label="Respiratory Rate"
                  placeholder="in BPM"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('respiratoryRate')}
                  onBlur={handleBlur('respiratoryRate')}
                  value={values.respiratoryRate}
                  keyboardType="numeric"
              />
                  {errors.respiratoryRate &&
                    <StyledInputError>{errors.respiratoryRate}</StyledInputError>
                  }
              <MyTextInput
                  name="oxygenLevel"
                  label="Blood Oxygen Level"
                  placeholder="in %"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('oxygenLevel')}
                  onBlur={handleBlur('oxygenLevel')}
                  value={values.oxygenLevel}
                  keyboardType="numeric"
              />
                  {errors.oxygenLevel &&
                    <StyledInputError>{errors.oxygenLevel}</StyledInputError>
                  }
              <MyTextInput
                  name="heartbeatRate"
                  label="Heartbeat Ratex"
                  placeholder="in BPM"
                  placeholderTextColor={logoColor}
                  onChangeText={handleChange('heartbeatRate')}
                  onBlur={handleBlur('heartbeatRate')}
                  value={values.heartbeatRate}
                  keyboardType="numeric"
              />
                  {errors.heartbeatRate &&
                    <StyledInputError>{errors.heartbeatRate}</StyledInputError>
                  }
            </StyledFormArea>
        )}
        </Formik>
        </StyledScrollView>
      </InnerContainer>
    </StyledContainer>
    );
}

function buildInitValues(buildMode, originalMedicalData) {
  if (buildMode == "add") {    // add mode
    // get current date and time as the default values for the input form in the add mode
    var dt = new Date();
    var todayDate = getISODate(dt);
    var nowTime = getTime24hoursFormat(dt);
    const returnVal = {
      _id:'',
      measuringDate: todayDate,
      measuringTime: nowTime,
      systolicPressure: '',
      diastolicPressure: '',
      respiratoryRate: '',
      oxygenLevel: '',
      heartbeatRate: '',
    };
    return returnVal;
  } else {
    // all inital values are coming from the params for edit mode
    const recentData = getLatestData(originalMedicalData, "sortkey")
    const returnVal = {
      _id: recentData._id,
      measuringDate: recentData.measuring_date,
      measuringTime: recentData.measuring_time,
      systolicPressure: recentData.systolic_pressure,
      diastolicPressure: recentData.diastolic_pressure,
      respiratoryRate: recentData.respiratory_rate,
      oxygenLevel: recentData.oxygen_level,
      heartbeatRate: recentData.heartbeat_rate,
    };
    return returnVal;
  }
}

function buildNewDataFromAdd(oldJsonArray, inData) {
  // a new entry is built and added to the existing JSON array
  var newEntry = new Object();
  newEntry.sortkey = (inData.measuringDate + inData.measuringTime).replace(/-/g, "").replace(/:/g, "");
  newEntry.measuring_date = inData.measuringDate;
  newEntry.measuring_time = inData.measuringTime;
  newEntry.systolic_pressure = inData.systolicPressure;
  newEntry.diastolic_pressure = inData.diastolicPressure;
  newEntry.respiratory_rate = inData.respiratoryRate;
  newEntry.oxygen_level = inData.oxygenLevel;
  newEntry.heartbeat_rate = inData.heartbeatRate;
  return newEntry;
}

function buildNewDataFromEdit(oldJsonArray, inData, oldId) {
  var newEntry = new Object();
  newEntry.sortkey = (inData.measuringDate + inData.measuringTime).replace(/-/g, "").replace(/:/g, "");
  newEntry.measuring_date = inData.measuringDate;
  newEntry.measuring_time = inData.measuringTime;
  newEntry.systolic_pressure = inData.systolicPressure;
  newEntry.diastolic_pressure = inData.diastolicPressure;
  newEntry.respiratory_rate = inData.respiratoryRate;
  newEntry.oxygen_level = inData.oxygenLevel;
  newEntry.heartbeat_rate = inData.heartbeatRate;
  // keep the old Id for the edited record
  newEntry._id = oldId
  return newEntry;
}

export default AddEditPatientMedicalScreen;

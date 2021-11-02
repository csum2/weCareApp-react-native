/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React, {useState, useRef} from 'react';
import {Formik, Field} from 'formik';
import {DatePicker} from 'formik-material-ui-pickers'
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MaterialHeaderButtons } from './../components/WecareHeaderButton';
import { Item, HiddenItem, OverflowMenu, Divider } from 'react-navigation-header-buttons';
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
   NameTitle1,
   NameTitle2,
} from './../components/styles';
import MedicalValidationSchema from './../validations/MedicalValidationSchema';
import { getLatestData } from './../components/utilities';

const {backgroundApp, logoColor, buttonColors, accentColors, accentBackground, blackColor, errorColor} = Colors;

const AddPatientMedicalScreen = ({ route, navigation}) => {
  // get the parameters
  var { mode } = route.params;
  const { _id } = route.params;
  const { medicaldata } = route.params;

  if (medicaldata === undefined || !medicaldata.length ) {
    mode = "add"
  }

  console.log("AddPatientMedicalScreen, mode:" + mode);
  //console.log("AddPatientMedicalScreen, first_name:" + route.params.first_name);
  //console.log("EditPatientMedicalScreen, route.params.medicaldata:" + JSON.stringify(medicaldata[0]));
  var initVal = buildInitValues(mode, medicaldata);
  console.log("EditPatientMedicalScreen, initVal:" + JSON.stringify(initVal));

  // for the external Formik submit button
  const formRef = useRef();
  const [input, setInput] = useState({});

  const saveInput = () => {
    console.log("saveInput of add medical data")
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
              <MaterialIcons name={Platform.OS === 'ios' ? "more-horiz" : "more-vert"}
                size={30} color={backgroundApp} />
            )}
          >
            <HiddenItem title="Save" onPress={() => saveInput()} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
  }, [navigation]);

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
            onSubmit={(values) => setInput(values)}
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
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid, validateForm})=>(
            <StyledFormArea>
              <MyTextInput
                  name="measuringDate"
                  label="Measuring Date"
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

const MyTextInput = ({label, ...props}) => {
  return(
      <View>
          <StyledInputTheLabel2>{label}</StyledInputTheLabel2>
          <StyledTextInput2 {...props} />
      </View>
  )
}

function buildInitValues(buildMode, originalMedicalData) {
  if (buildMode != "edit") {    // add mode
    // get current date and time as the default values for the input form in the add mode
    var dt = new Date();
    var todayDate = dt.toISOString().slice(0, 10);
    // convert hour, minute to 2 digits with leading zero
    var hh = "0" + dt.getHours();
    var mm = "0" + dt.getMinutes();
    var nowTime = hh.substr(hh.length - 2) + ":" + mm.substr(mm.length - 2);
    var dateObj = new Date(dt);
    const returnVal = {
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

export default AddPatientMedicalScreen;

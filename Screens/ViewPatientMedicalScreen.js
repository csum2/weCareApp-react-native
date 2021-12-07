/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React, {useContext} from 'react';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledPatientName,
  StyledSubTitles,
  StyledTexts,
  View
} from './../components/styles';
import { FocusedTabContext } from './../navigators/TabViewPatient';
import {getLatestData} from './../components/utilities';

const ViewPatientMedicalScreen = ({route, navigation}) => {
  // set focusedTab of the parent tab navigators
  const focusedTab = useContext(FocusedTabContext);
  if (focusedTab !== null) {
    focusedTab.active = "PatientMedicalScreen";
  }

  //Getting the patient medical information
  const patientName = route.params.first_name+" "+route.params.last_name;
  var recentData = null;
  var measuringDate = '';
  var measuringTime = '';
  var systolicPressure = '';
  var diastolicPressure = '';
  var respiratoryRate = '';
  var oxygenLevel = '';
  var heartbeatRate = '';
  if (route.params.medicaldata !== undefined && route.params.medicaldata.length) {
    recentData = getLatestData(route.params.medicaldata, "sortkey");
    measuringDate = recentData.measuring_date;
    measuringTime = recentData.measuring_time;
    systolicPressure = recentData.systolic_pressure;
    diastolicPressure = recentData.diastolic_pressure;
    respiratoryRate = recentData.respiratory_rate;
    oxygenLevel = recentData.oxygen_level;
    heartbeatRate = recentData.heartbeat_rate;
  }

  return (
    <StyledContainer>
    {recentData == null && (
      <InnerContainer>
        <StyledPatientName>{patientName}</StyledPatientName>
        <StyledPatientName>No medical data exist</StyledPatientName>
      </InnerContainer>
    )}
    {recentData && (
      <InnerContainer>
        <StyledPatientName>{patientName}</StyledPatientName>
        <StyledSubTitles>Measuring Date</StyledSubTitles>
        <StyledTexts>{measuringDate}</StyledTexts>
        <StyledSubTitles>Measuring Time</StyledSubTitles>
        <StyledTexts>{measuringTime}</StyledTexts>
        <StyledSubTitles>Blood pressure</StyledSubTitles>
        <StyledTexts>{systolicPressure} / {diastolicPressure} mmHg</StyledTexts>
        <StyledSubTitles>Respiratory Rate</StyledSubTitles>
        <StyledTexts>{respiratoryRate}/min</StyledTexts>
        <StyledSubTitles>Blood oxygen level</StyledSubTitles>
        <StyledTexts>{oxygenLevel}%</StyledTexts>
        <StyledSubTitles>Heartbeat Rate</StyledSubTitles>
        <StyledTexts>{heartbeatRate}/min</StyledTexts>
      </InnerContainer>
    )}
    </StyledContainer>
  );
};

export default ViewPatientMedicalScreen;

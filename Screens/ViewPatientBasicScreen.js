/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React, {useContext} from 'react';
import {Image} from 'react-native';
import {linear} from 'react-native/Libraries/Animated/Easing';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledPatientName,
  StyledSubTitles,
  StyledTexts,
  StyledLines,
} from './../components/styles';
import { FocusedTabContext } from './../navigators/TabViewPatient';

const ViewPatientBasicScreen = ({route, navigation}) => {
  // set focusedTab of the parent tab navigators
   const focusedTab = useContext(FocusedTabContext);

   if (focusedTab !== null) {
     focusedTab.active = "PatientBasicScreen";
   }

   //Getting the patient information
   const patientName = route.params.first_name+" "+route.params.last_name;
   const patientDOB = route.params.date_of_birth;
   const patientSex = route.params.biological_sex;
   const patientEmail = route.params.email;
   const patientContact = route.params.contact_phone;
   const patientAddress = route.params.residential_address;
   const patientEmergencyContact = route.params.emergency_contact;
   const patientEmergencyPhone = route.params.emergency_phone;
   const patientRelationship = route.params.relationship;


   return (
    <StyledContainer>
      <InnerContainer>
        <StyledPatientName>{patientName}</StyledPatientName>
        <StyledSubTitles>Date of birth</StyledSubTitles>
        <StyledTexts>{patientDOB}</StyledTexts>
        <StyledSubTitles>Biological Sex</StyledSubTitles>
        <StyledTexts>{patientSex}</StyledTexts>
        <StyledLines source={require('../Images/line.png')} />
        <StyledSubTitles>Email</StyledSubTitles>
        <StyledTexts>{patientEmail}</StyledTexts>
        <StyledSubTitles>Contact phone</StyledSubTitles>
        <StyledTexts>{patientContact}</StyledTexts>
        <StyledSubTitles>Residential address</StyledSubTitles>
        <StyledTexts>{patientAddress}</StyledTexts>
        <StyledLines source={require('../Images/line.png')} />
        <StyledSubTitles>Emercency contact</StyledSubTitles>
        <StyledTexts>{patientEmergencyContact}</StyledTexts>
        <StyledSubTitles>Emergency contact</StyledSubTitles>
        <StyledTexts>{patientEmergencyPhone}</StyledTexts>
        <StyledSubTitles>Relationship</StyledSubTitles>
        <StyledTexts>{patientRelationship}</StyledTexts>
      </InnerContainer>
    </StyledContainer>
  );
};

export default ViewPatientBasicScreen;

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

const ViewPatientBasicScreen = ({navigation}) => {
  // set focusedTab of the parent tab navigators
   const focusedTab = useContext(FocusedTabContext);
   if (focusedTab !== null) {
     focusedTab.active = "PatientBasicScreen";
   }

   return (
    <StyledContainer>
      <InnerContainer>
        <StyledPatientName>Danniel Summer</StyledPatientName>
        <StyledSubTitles>Date of birth</StyledSubTitles>
        <StyledTexts>1971 - 12 - 25</StyledTexts>
        <StyledSubTitles>Biological Sex</StyledSubTitles>
        <StyledTexts>Male</StyledTexts>
        <StyledLines source={require('../Images/line.png')} />
        <StyledSubTitles>Email</StyledSubTitles>
        <StyledTexts>dsummer@gmail.com</StyledTexts>
        <StyledSubTitles>Contact phone</StyledSubTitles>
        <StyledTexts>514 123 4567</StyledTexts>
        <StyledSubTitles>Residential address</StyledSubTitles>
        <StyledTexts>123 Prime Ave, Montreal, Canada</StyledTexts>
        <StyledLines source={require('../Images/line.png')} />
        <StyledSubTitles>Emercency contact</StyledSubTitles>
        <StyledTexts>GI Joe</StyledTexts>
        <StyledSubTitles>Emergency contact</StyledSubTitles>
        <StyledTexts>514 111 2222</StyledTexts>
        <StyledSubTitles>Relationship</StyledSubTitles>
        <StyledTexts>Cousin</StyledTexts>
      </InnerContainer>
    </StyledContainer>
  );
};

export default ViewPatientBasicScreen;

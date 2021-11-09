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
} from './../components/styles';
import { FocusedTabContext } from './../navigators/TabViewPatient';

const ViewPatientMedicalScreen = ({navigation}) => {
  // set focusedTab of the parent tab navigators
  const focusedTab = useContext(FocusedTabContext);
  if (focusedTab !== null) {
    focusedTab.active = "PatientMedicalScreen";
  }

  return (
    <StyledContainer>
      <InnerContainer>
        <StyledPatientName>Danniel Summer</StyledPatientName>
        <StyledSubTitles>Measuring Date</StyledSubTitles>
        <StyledTexts>2021 - 11 - 04</StyledTexts>
        <StyledSubTitles>Measuring Time</StyledSubTitles>
        <StyledTexts>14:35</StyledTexts>
        <StyledSubTitles>Blood pressure</StyledSubTitles>
        <StyledTexts>X/Y mmHg</StyledTexts>
        <StyledSubTitles>Respiratory Rate</StyledSubTitles>
        <StyledTexts>X/min</StyledTexts>
        <StyledSubTitles>Blood oxygen level</StyledSubTitles>
        <StyledTexts>90%</StyledTexts>
        <StyledSubTitles>Heartbeat Rate</StyledSubTitles>
        <StyledTexts>X/min</StyledTexts>
      </InnerContainer>
    </StyledContainer>
  );
};

export default ViewPatientMedicalScreen;

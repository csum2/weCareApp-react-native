/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React from 'react';
import {
   StyledContainer,
   InnerContainer,
   PageTitle,
   SubTitle,
} from './../components/styles';

const EditPatientMedicalScreen = ({ route, navigation }) => {
  /* TODO: hardcode json data for testing */
  const { mode } = route.params;
  const { patientName } = route.params;
  const { dob } = route.params;
  const { gender } = route.params;
  const { medicaldata } = route.params;
  console.log("EditPatientMedicalScreen, route.params.mode:" + mode);
  console.log("EditPatientMedicalScreen, route.params.patientName:" + patientName);
  console.log("EditPatientMedicalScreen, route.params.medicaldata:" + JSON.stringify(medicaldata[0]));

  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle>WeCare app MAPD712 Group13</SubTitle>
        <PageTitle>Edit Medical Data</PageTitle>
      </InnerContainer>
    </StyledContainer>
    );
}

export default EditPatientMedicalScreen;

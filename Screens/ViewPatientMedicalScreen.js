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

const ViewPatientMedicalScreen = ({navigation}) => {
  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle>WeCare app MAPD712 Group13</SubTitle>
        <PageTitle>View Medical Data</PageTitle>
      </InnerContainer>
    </StyledContainer>
    );
}

export default ViewPatientMedicalScreen;

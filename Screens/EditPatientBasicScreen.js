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

const EditPatientBasicScreen = ({ route, navigation }) => {
  /* TODO: hardcode json data for testing */
  console.log("EditPatientBasicScreen, route.params.first_name:" + route.params.first_name)

  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle>WeCare app MAPD712 Group13</SubTitle>
        <PageTitle>Edit Patient Basic Info</PageTitle>
      </InnerContainer>
    </StyledContainer>
    );
}

export default EditPatientBasicScreen;

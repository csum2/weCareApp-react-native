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
   StyledProfileButtonOne,
   ButtonTextOne,
} from './../components/styles';

const SearchPatientAddMedicalScreen = ({navigation}) => {
  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle>WeCare app MAPD712 Group13</SubTitle>
        <PageTitle>Search a Patient to add medical data</PageTitle>
        <StyledProfileButtonOne onPress={() => navigation.navigate('AddPatientMedicalScreen')}>
          <ButtonTextOne>Simulate a list item click</ButtonTextOne>
        </StyledProfileButtonOne>
      </InnerContainer>
    </StyledContainer>
    );
}

export default SearchPatientAddMedicalScreen;

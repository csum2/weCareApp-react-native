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

const ListPatientScreen = ({navigation}) => {
  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle>WeCare app MAPD712 Group13</SubTitle>
        <PageTitle>List Patients</PageTitle>
        <StyledProfileButtonOne onPress={() => navigation.navigate('TabViewPatient')}>
          <ButtonTextOne>Simulate a list item click</ButtonTextOne>
        </StyledProfileButtonOne>
      </InnerContainer>
    </StyledContainer>
    );
}

export default ListPatientScreen;

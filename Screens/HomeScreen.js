/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MaterialHeaderButtons } from './../components/WecareHeaderButton';
import { Item, HiddenItem, OverflowMenu, Divider } from 'react-navigation-header-buttons';

import {
   Colors,
   StyledContainer,
   InnerContainer,
   PageTitle2,
   SubTitle,
   StyledFormArea,
   StyledProfileButtonOne,
   StyledProfileButtonTwo,
   ButtonText,
   ButtonTextOne,
   ButtonTextTwo,
   MsgBox,
   Line,
   LeftIcon2,
} from './../components/styles';

import {LayoutEffectLogout} from './../components/LayoutEffectLogout';

const {logoColor, buttonColors, blackColor, backgroundApp} = Colors;

// Button press event handler
const HomeScreen = ({navigation}) => {

  const handleLogoutPress = () => {
    AsyncStorage.clear();
    navigation.replace('LoginScreen');
  };
  const handleAllPatientPress = () => {
    navigation.navigate('ListPatientScreen', {critical: false});
  };
  const handleCriticalPatientPress = () => {
    navigation.navigate('ListPatientScreen', {critical: true});
  };
  const handleAddPatientPress = () => {
    navigation.navigate('AddPatientBasicScreen');
  };
  const handleAddMedicalPress = () => {
    navigation.navigate('SearchPatientAddMedicalScreen');
  };

  // Make a option menu on the upper right for Logout
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
            <HiddenItem title="Logout" onPress={handleLogoutPress} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle>Welcome To</SubTitle>
        <PageTitle2>WeCare</PageTitle2>
        <StyledFormArea>
          <MsgBox>What do you want to do?</MsgBox>
          <StyledProfileButtonOne onPress={handleAllPatientPress}>
            <ButtonTextOne> Check all patients</ButtonTextOne>
          </StyledProfileButtonOne>

          <StyledProfileButtonOne onPress={handleCriticalPatientPress}>
            <ButtonTextOne> Check critical patients</ButtonTextOne>
          </StyledProfileButtonOne>

          <Line />

          <StyledProfileButtonTwo onPress={handleAddPatientPress}>
            <LeftIcon2>
              <FontAwesome5 name="plus-circle" size={28} color={logoColor} />
            </LeftIcon2>
            <ButtonTextTwo> Add a new patient</ButtonTextTwo>
          </StyledProfileButtonTwo>

          <StyledProfileButtonTwo onPress={handleAddMedicalPress}>
            <LeftIcon2>
              <FontAwesome5 name="plus-circle" size={28} color={logoColor} />
            </LeftIcon2>
            <ButtonTextTwo> Add medical data</ButtonTextTwo>
          </StyledProfileButtonTwo>

        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>

  );
}

export default HomeScreen;

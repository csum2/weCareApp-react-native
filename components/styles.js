/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import styled from 'styled-components';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
//import Constants from 'expo-constants'

//const StatusBarHeight = Constants.statusBarHeight

export const Colors = {
  backgroundApp: '#ffffff',
  logoColor: '#3BB2BF',
  buttonColors: '#218DA6',
  accentColors: '#0C3640',
  accentBackground: '#F0F3F3',
  blackColor: '#000000',
  errorColor: '#ff0000',
};

const {
  backgroundApp,
  logoColor,
  buttonColors,
  accentColors,
  accentBackground,
  blackColor,
  errorColor,
} = Colors;
export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  padding: 25px;
  background-color: ${backgroundApp};
`;
export const InnerContainer = styled.View`
  flex: 1;
  width: 95%;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${logoColor};
`;

export const PageTitle2 = styled.Text`
  margin-top: -30px;
  font-size: 50px;
  text-align: center;
  font-weight: bold;
  color: ${logoColor};
`;

export const SubTitle = styled.Text`
  font-size: 15px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${blackColor};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${accentBackground};
  padding: 15px;
  padding-left: 70px;
  padding-right: 55px;
  border-radius: 55px;
  border: 1px;
  font-size: 20px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${blackColor};
`;

export const StyledTextInput2 = styled.TextInput`
  background-color: ${accentBackground};
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 55px;
  border: 1px;
  font-size: 20px;
  height: 44px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${blackColor};
`;

export const StyledInputTheLabel = styled.Text`
  color: ${logoColor};
  font-size: 13px;
  text-align: left;
`;

export const StyledInputTheLabel2 = styled.Text`
  color: ${blackColor};
  font-size: 15px;
  text-align: left;
`;

export const StyledInputError = styled.Text`
  color: ${errorColor};
  font-size: 13px;
  text-align: center;
`;

export const LeftIcon = styled.TouchableOpacity`
  left: 15px;
  top: 28px;
  position: absolute;
  z-index: 1;
`;

export const LeftIcon2 = styled.TouchableOpacity`
  left: 18px;
  top: 10px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 28px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon2 = styled.TouchableOpacity`
  right: 18px;
  top: 28px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon3 = styled.TouchableOpacity`
  right: 18px;
  top: 84px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon4 = styled.TouchableOpacity`
  right: 18px;
  top: 14px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${logoColor};
  justify-content: center;
  align-items: center;
  border-radius: 55px;
  border: 1px;
  margin-vertical: 5px;
  height: 60px;

  ${props =>
    props.google == true &&
    `
       background-color: ${logoColor};
       flex-direction: row;
       justify-content: center;
   `}
`;

export const ButtonText = styled.Text`
  color: ${blackColor};
  font-size: 16px;

  ${props =>
    props.google == true &&
    `
       padding: 5px;
   `}
`;

export const MsgBox = styled.Text`
  padding-top: 40px;
  padding-bottom: 20px;
  text-align: center;
  font-size: 15px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${blackColor};
  margin-vertical: 20px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${blackColor};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${blackColor};
  font-size: 15px;
`;

export const StyledProfileButtonOne = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${backgroundApp};
  justify-content: center;
  align-items: center;
  border-radius: 55px;
  border: 1px;
  margin-vertical: 5px;
  height: 52px;
`;

export const StyledProfileButtonTwo = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${backgroundApp};
  justify-content: center;
  align-items: center;
  border-radius: 55px;
  border: 1px;
  border-color: ${logoColor};
  margin-vertical: 5px;
  height: 52px;
`;

export const ButtonTextOne = styled.Text`
  color: ${accentColors};
  font-size: 16px;

  ${props =>
    props.google == true &&
    `
       padding: 5px;
   `}
`;

export const ButtonTextTwo = styled.Text`
  color: ${logoColor};
  font-weight: bold;
  font-size: 16px;

  ${props =>
    props.google == true &&
    `
       padding: 5px;
   `}
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  width: 95%;
  margin-left: 30px;
`;

export const NameTitle1 = styled.Text`
  color: ${logoColor};
  text-align: center;
  margin-bottom: 8px;
  font-size: 18px;
`;

export const NameTitle2 = styled.Text`
  color: ${blackColor};
  text-align: center;
  margin-vertical: 1px;
  font-size: 16px;
`;

export const StyledFlatList = styled.FlatList`
  flex: 1;
  width: 100%;
`;
export const StyledFlatListView = styled.TouchableOpacity`
  background-color: ${accentBackground};
  padding-top: 15px;

  height: 46px;
  margin-vertical: 4px;
`;

export const StyledFlatListText = styled.Text`
  font-size: 16px;
  margin-left: 23px;
  color: ${accentColors};
`;

export const StyledSquaredButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${backgroundApp};
  justify-content: center;
  align-self: flex-end;
  border: 1px;
  margin-vertical: 15px;
  height: 40px;
`;

export const StyledSearchInput = styled.TextInput`
  padding: 10px;
  background-color: ${backgroundApp};
  justify-content: center;
  align-self: center;
  border: 1px;
  margin-vertical: 10px;
  height: 42px;
  border-radius: 55px;
  width: 95%;
  color: ${accentColors};
`;

export const StyledPatientName = styled.Text`
  font-size: 18px;
  color: ${logoColor};
  font-weight: 700;
  margin-top: 10px;
  padding-bottom: 30px;
`;

export const StyledSubTitles = styled.Text`
  font-size: 14px;
  margin-left: 15px;
  color: ${accentColors};
  font-weight: 700;
  align-self: flex-start;
`;

export const StyledTexts = styled.Text`
  font-size: 18px;
  margin-left: 15px;
  color: ${accentColors};
  font-weight: 400;
  align-self: flex-start;
  padding-bottom: 20px;
`;
export const StyledLines = styled.Image`
  margin-bottom: 20px;
`;

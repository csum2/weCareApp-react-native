/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
import { Colors } from './styles';

const {logoColor, buttonColors, blackColor, backgroundApp} = Colors;

// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = (props) => (
  <HeaderButton IconComponent={MaterialIcons} iconSize={23} color={backgroundApp} {...props} />
);

export const MaterialHeaderButtons = (props) => {
  return <HeaderButtons HeaderButtonComponent={MaterialHeaderButton} {...props} />;
};

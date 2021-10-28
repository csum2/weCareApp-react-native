/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Screens
import EditPatientBasicScreen from './../Screens/EditPatientBasicScreen';
import EditPatientMedicalScreen from './../Screens/EditPatientMedicalScreen';

// Import styles
import {Colors} from './../components/styles';
const {logoColor, backgroundApp} = Colors;

const Tab = createBottomTabNavigator();

const TabEditPatient = () => {
  return (
    <Tab.Navigator initialRouteName="EditPatientBasicScreen"
    screenOptions={{
      tabBarActiveTintColor: `${logoColor}`,
    }}
    >
      <Tab.Screen
        name="EditPatientBasicScreen"
        component={EditPatientBasicScreen}
         options={{
          headerShown: false,
          tabBarLabel: 'Basic Information',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="folder-information" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="EditPatientMedicalScreen"
        component={EditPatientMedicalScreen}
         options={{
          headerShown: false,
          tabBarLabel: 'Medical Information',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="medical-bag" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabEditPatient;

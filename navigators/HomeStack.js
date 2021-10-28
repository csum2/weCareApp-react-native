/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {OverflowMenuProvider} from 'react-navigation-header-buttons';
import {createStackNavigator} from '@react-navigation/stack';

// Import navigators
import TabViewPatient from './TabViewPatient';
import TabEditPatient from './TabEditPatient';

// Import Screens
import AuthLoadingScreen from './../Screens/AuthLoadingScreen';
import LoginScreen from './../Screens/LoginScreen';
import HomeScreen from './../Screens/HomeScreen';
import ListPatientScreen from './../Screens/ListPatientScreen';
import AddPatientBasicScreen from './../Screens/AddPatientBasicScreen';
import AddPatientMedicalScreen from './../Screens/AddPatientMedicalScreen';
import SearchPatientAddMedicalScreen from './../Screens/SearchPatientAddMedicalScreen';

// Import styles
import {Colors} from './../components/styles';
const {logoColor, backgroundApp} = Colors;

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <OverflowMenuProvider>
        <Stack.Navigator initialRouteName="AuthLoadingScreen">
        <Stack.Group
          screenOptions={{
            headerStyle: { backgroundColor: logoColor },
            headerTintColor: backgroundApp, //Set Header text color
            headerTitleStyle: { fontWeight: 'bold' }, //Set Header text style
          }}
        >
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="ListPatientScreen"
            component={ListPatientScreen}
            options={{ title: 'List of Patients' }}
          />
          <Stack.Screen
            name="AddPatientBasicScreen"
            component={AddPatientBasicScreen}
            options={{ title: 'Add a Patient' }}
          />
          <Stack.Screen
            name="SearchPatientAddMedicalScreen"
            component={SearchPatientAddMedicalScreen}
            options={{ title: 'Add Medical Data...' }}
          />
          <Stack.Screen
            name="AddPatientMedicalScreen"
            component={AddPatientMedicalScreen}
            options={{ title: 'Add Medical Data' }}
          />
          <Stack.Screen
            name="TabViewPatient"
            component={TabViewPatient}
            options={{ title: 'Patient Profile'}}
          />
          <Stack.Screen
            name="TabEditPatient"
            component={TabEditPatient}
            options={{ title: 'Edit Patient Profile'}}
          />
        </Stack.Group>
        </Stack.Navigator>
      </OverflowMenuProvider>
    </NavigationContainer>
  );
};

export default HomeStack;

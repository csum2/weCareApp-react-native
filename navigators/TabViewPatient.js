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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MaterialHeaderButtons } from './../components/WecareHeaderButton';
import { Item, HiddenItem, OverflowMenu, Divider } from 'react-navigation-header-buttons';

// Import Screens
import ViewPatientBasicScreen from './../Screens/ViewPatientBasicScreen';
import ViewPatientMedicalScreen from './../Screens/ViewPatientMedicalScreen';

// Import styles
import {Colors} from './../components/styles';
const {logoColor, backgroundApp} = Colors;

const Tab = createBottomTabNavigator();

const TabViewPatient = ({ route, navigation }) => {
  const handleEditModePress = () => {
    navigation.navigate('TabEditPatient', route.params);
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
            <HiddenItem title="Edit Mode" onPress={handleEditModePress} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName="ViewPatientBasicScreen"
    screenOptions={{
      tabBarActiveTintColor: `${logoColor}`,
    }}
    >
      <Tab.Screen
        name="ViewPatientBasicScreen"
        component={ViewPatientBasicScreen}
         options={{
          headerShown: false,
          tabBarLabel: 'Basic Information',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="folder-information" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ViewPatientMedicalScreen"
        component={ViewPatientMedicalScreen}
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

export default TabViewPatient;

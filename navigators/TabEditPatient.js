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
import EditPatientBasicScreen from './../Screens/EditPatientBasicScreen';
import AddEditPatientMedicalScreen from './../Screens/AddEditPatientMedicalScreen';

// Import styles
import {Colors} from './../components/styles';
const {logoColor, backgroundApp} = Colors;

const Tab = createBottomTabNavigator();

const TabEditPatient = ({ route, navigation }) => {
  route.params.mode = "edit";

  const handleSavePress = () => {
    // TODO: trigger the save function
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
            <HiddenItem title="Save" onPress={handleSavePress} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName="EditPatientBasicScreen"
    screenOptions={{
      tabBarActiveTintColor: `${logoColor}`,
    }}
    >
      <Tab.Screen
        name="EditPatientBasicScreen"
        component={EditPatientBasicScreen}
        initialParams={route.params}
         options={{
          headerShown: false,
          tabBarLabel: 'Basic Information',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="folder-information" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddEditPatientMedicalScreen"
        component={AddEditPatientMedicalScreen}
        initialParams={route.params}
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

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

// focusedTab is an indicator set by the tab screens to idectify the current active tab
const focusedTab = {active: ''};
export const FocusedTabContext = React.createContext(null);

const TabViewPatient = ({ route, navigation }) => {

  const handleEditModePress = () => {
    //navigation.navigate('TabEditPatient', route.params);
    // TODO: trigger the cooresponding function of basic profile or medical data
    console.log("TabViewPatient, handleEditModePress, focusedTab:" + focusedTab.active );
    if (focusedTab.active == "PatientMedicalScreen") {
      // trigger the save function in the Patient Medical Screen
      console.log("TabViewPatient, edit mode submit medical data" );
      route.params.mode = "edit";
      navigation.navigate('AddEditPatientMedicalScreen', route.params);
    } else {
      // trigger the save function in the Patient Basic Screen
      console.log("TabViewPatient, edit mode submit basic info" );
      route.params.mode = "edit";
      navigation.navigate('AddEditPatientBasicScreen', route.params);
    }
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
    <FocusedTabContext.Provider value={focusedTab}>
    <Tab.Navigator initialRouteName="ViewPatientBasicScreen"
    screenOptions={{
      tabBarActiveTintColor: `${logoColor}`,
    }}
    >
      <Tab.Screen
        name="ViewPatientBasicScreen"
        component={ViewPatientBasicScreen}
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
        name="ViewPatientMedicalScreen"
        component={ViewPatientMedicalScreen}
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
    </FocusedTabContext.Provider>
  );
};

export default TabViewPatient;

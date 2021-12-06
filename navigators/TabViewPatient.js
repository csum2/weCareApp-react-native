/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MaterialHeaderButtons} from './../components/WecareHeaderButton';
import {
  Item,
  HiddenItem,
  OverflowMenu,
  Divider,
} from 'react-navigation-header-buttons';

// Import Screens
import ViewPatientBasicScreen from './../Screens/ViewPatientBasicScreen';
import ViewPatientMedicalScreen from './../Screens/ViewPatientMedicalScreen';

// Import styles
import {Colors} from './../components/styles';
import {getLatestData} from './../components/utilities';

const {logoColor, backgroundApp} = Colors;

//Android emulator use HOST = 'http://10.0.2.2:5000'
//IOS simulator use HOST = 'http://127.0.0.1:5000'
const HOST = 'https://rest-wecare.herokuapp.com';

const Tab = createBottomTabNavigator();

// focusedTab is an indicator set by the tab screens to idectify the current active tab
const focusedTab = {active: ''};
export const FocusedTabContext = React.createContext(null);

const TabViewPatient = ({route, navigation}) => {
  const handleEditModePress = () => {
    //navigation.navigate('TabEditPatient', route.params);
    console.log(
      'TabViewPatient, handleEditModePress, focusedTab:' + focusedTab.active,
    );
    if (focusedTab.active == 'PatientMedicalScreen') {
      // trigger the save function in the Patient Medical Screen
      console.log('TabViewPatient, edit mode submit medical data');
      route.params.mode = 'edit';
      navigation.navigate('AddEditPatientMedicalScreen', route.params);
    } else {
      // trigger the save function in the Patient Basic Screen
      console.log('TabViewPatient, edit mode submit basic info');
      route.params.mode = 'edit';
      navigation.navigate('AddEditPatientBasicScreen', route.params);
    }
  };

  const handleDeletePress = () => {
    console.log(
      'TabViewPatient, handleDeletePress, focusedTab:' + focusedTab.active,
    );
    if (focusedTab.active == 'PatientMedicalScreen') {
      console.log('TabViewPatient, delete medical data');
      if (
        route.params.medicaldata !== undefined &&
        route.params.medicaldata.length
      ) {
        deleteMedical(route.params, navigation);
      } else {
        Alert.alert('No Medical Data', 'nothing to delete!', [{text: 'OK'}]);
      }
    }
    // else {
    //   console.log('TabViewPatient, delete basic info');
    // }
    if (focusedTab.active == 'PatientBasicScreen') {
      console.log('TabViewPatient, delete Patient');
      deletePatient(route.params, navigation);
    }
  };

  // Make a option menu on the upper right for Logout
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialHeaderButtons>
          <OverflowMenu
            style={{marginHorizontal: 10}}
            OverflowIcon={({color}) => (
              <MaterialIcons
                name={Platform.OS === 'ios' ? 'more-horiz' : 'more-vert'}
                size={30}
                color={backgroundApp}
              />
            )}>
            <HiddenItem title="Edit Mode" onPress={handleEditModePress} />
            <HiddenItem title="Delete Record" onPress={handleDeletePress} />
          </OverflowMenu>
        </MaterialHeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <FocusedTabContext.Provider value={focusedTab}>
      <Tab.Navigator
        initialRouteName="ViewPatientBasicScreen"
        screenOptions={{
          tabBarActiveTintColor: `${logoColor}`,
        }}>
        <Tab.Screen
          name="ViewPatientBasicScreen"
          component={ViewPatientBasicScreen}
          initialParams={route.params}
          options={{
            headerShown: false,
            tabBarLabel: 'Basic Information',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="folder-information"
                color={color}
                size={size}
              />
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
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="medical-bag"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </FocusedTabContext.Provider>
  );
};

async function deleteMedical(paramPatient, navigation) {
  const recentData = getLatestData(paramPatient.medicaldata, 'sortkey');
  console.log(
    'TabViewPatient, deleteMedical, recentData:' + JSON.stringify(recentData),
  );
  uri = HOST + '/patients/' + paramPatient._id + '/medical/' + recentData._id;
  // the method value below must be in uppercase
  restOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: '',
  };
  console.log('TabViewPatient, uri: ' + uri);
  await fetch(uri, restOptions)
    .then(response => response.json())
    .then(data => {
      Alert.alert('Medical Data', 'is deleted successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    })
    .catch(response => {
      // error saveing the data
      console.log('TabViewPatient, deleteMedical failed!!!!!!');
      console.log('response: ' + response);
      Alert.alert('Error Deleting Medical Data', response.toString(), [
        {text: 'OK'},
      ]);
    });
}

async function deletePatient(paramPatient, navigation) {
  uri = HOST + '/patients/' + paramPatient._id;
  // the method value below must be in uppercase
  restOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: '',
  };
  console.log('TabViewPatient, uri: ' + uri);
  await fetch(uri, restOptions)
    .then(response => response.json())
    .then(data => {
      Alert.alert('Patient', 'Deleted successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    })
    .catch(response => {
      // error saveing the data
      console.log('TabViewPatient, deletePatient failed!!!!!!');
      console.log('response: ' + response);
      Alert.alert('Error Deleting Patient', response.toString(), [
        {text: 'OK'},
      ]);
    });
}

export default TabViewPatient;

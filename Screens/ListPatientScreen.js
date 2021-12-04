/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledProfileButtonOne,
  ButtonTextOne,
  RightIcon4,
  Colors,
  StyledFlatList,
  StyledFlatListView,
  StyledFlatListText,
  StyledSquaredButton,
  StyledSearchInput,
} from './../components/styles';
import {getLatestData} from './../components/utilities';
const {logoColor, buttonColors, blackColor, backgroundApp} = Colors;

const Item = ({name, onPress}) => (
  <StyledFlatListView onPress={onPress}>
    <StyledFlatListText>{name}</StyledFlatListText>
  </StyledFlatListView>
);

const ListPatientScreen = ({route, navigation}) => {
  const [patientData, setPatientData] = useState(null);
  const [searchName, setSearchName] = useState('');
  const { critical } = route.params;
  console.log("ListPatientScreen, critical: " + critical);

  const fetchData = async () => {
    const restOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    //Android emulator use URI = 'http://10.0.2.2:5000/patientnames/' + searchName
    //IOS simulator use URI = 'http://127.0.0.1:5000/patientnames/' + searchName
    const URI = 'https://rest-wecare.herokuapp.com/patientnames/' + searchName
    console.log("ListPatientScreen, URI: " + URI);

    await fetch(URI, restOptions)
      .then((response) => response.json())
      .then((data) => {
        if (critical) {
          console.log("ListPatientScreen, fetchData, trigger filterCriticalPatients");
          filterCriticalPatients(data);
        } else {
          setPatientData(data);
        }
      })
      .catch((response) => {
        // error saveing the data
        console.log("ListPatientScreen, fetchData failed!!!!!!");
        console.log("response: " + response);
        Alert.alert(
          "Error Reading Patient Data",
          response.toString(),
          [
            { text: "OK"}
          ]
        );
      });
  };

  const filterCriticalPatients = (inPatient) => {
    console.log("ListPatientScreen, filterCriticalPatients running");
    if (inPatient !== null) {
      criticalPatients = inPatient.filter(function(item){
        const recentData = getLatestData(item.medicaldata, "sortkey");
        console.log("ListPatientScreen, filterCriticalPatients, recentData:" + JSON.stringify(recentData));
        if (recentData === undefined)
          return false;
        else if (recentData.systolic_pressure > 200 || recentData.systolic_pressure < 100)
          return true;
        else if (recentData.diastolic_pressure > 150 || recentData.diastolic_pressure < 60)
          return true;
        else if (recentData.respiratory_rate > 16 || recentData.respiratory_rate < 12)
          return true;
        else if (recentData.oxygen_level < 95)
          return true;
        else if (recentData.heartbeat_rate > 100 || recentData.heartbeat_rate < 60)
          return true;
        else {
          return false;
        }
      });
      setPatientData(criticalPatients);
    }
  };

  const renderItem = ({item}) => (
    <Item
      name={item.first_name + " " + item.last_name}
      onPress={() => navigation.navigate('TabViewPatient', item)}
    />
  );

  // Change the screen title according to the critical flag set by the parent screen
  React.useLayoutEffect(() => {
    if (critical) {
      navigation.setOptions({ title: 'Critical Patients' });
    }
  }, [navigation]);

  React.useEffect(() => {
      console.log("ListPatientScreen, useEffect running");
      fetchData();
      // force re-fetch the data after navigation goback to this screen
      const willFocusSubscription = navigation.addListener('focus', () => {
        fetchData();
    });

    return willFocusSubscription;
  }, []);

  return (
    <StyledContainer>
      <InnerContainer>
        <StyledSearchInput placeholder="Search your patient name"
          onChangeText={text => setSearchName(text)}
          defaultValue={searchName}
        />
          <RightIcon4 onPress={()=>fetchData()}>
              <Ionicons name="md-search" size={32} color={buttonColors} />
          </RightIcon4>
        { !critical && (
          <StyledSquaredButton>
            <ButtonTextOne onPress={()=>filterCriticalPatients(patientData)}>Only Critical patients</ButtonTextOne>
          </StyledSquaredButton>
        )}
        { patientData && (
          <StyledFlatList
            data={patientData.sort((a, b) => a.first_name.localeCompare(b.first_name))}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        )}
      </InnerContainer>
    </StyledContainer>
  );
};

export default ListPatientScreen;

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
  RightIcon3,
  Colors,
  StyledFlatList,
  StyledFlatListView,
  StyledFlatListText,
  StyledSquaredButton,
  StyledSearchInput,
} from './../components/styles';

const {logoColor, buttonColors, blackColor, backgroundApp} = Colors;

const Item = ({name, onPress}) => (
  <StyledFlatListView onPress={onPress}>
    <StyledFlatListText>{name}</StyledFlatListText>
  </StyledFlatListView>
);

const SearchPatientAddMedicalScreen = ({route, navigation}) => {

  const [patientData, setPatientData] = useState(null);
  const [searchName, setSearchName] = useState('');

  const fetchData = async () => {
    const restOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    //Android emulator use URI = 'http://10.0.2.2:5000/patientnames/' + searchName
    //IOS simulator use URI = 'http://127.0.0.1:5000/patientnames/' + searchName
    const URI = 'https://rest-wecare.herokuapp.com/patientnames/' + searchName
    //console.log("SearchPatientAddMedicalScreen, URI: " + URI);

    await fetch(URI, restOptions)
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data);
      })
      .catch((response) => {
        // error saveing the data
        console.log("SearchPatientAddMedicalScreen, fetchData failed!!!!!!");
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

  const renderItem = ({item}) => {
    //console.log("SearchPatientAddMedicalScreen, renderItem item=" + item);
    item.mode = "add"
    return (
      <Item
        name={item.first_name + " " + item.last_name}
        onPress={() => navigation.navigate('AddEditPatientMedicalScreen', item)}
      />
    );
  };

  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle></SubTitle>
        <PageTitle>Search a patient</PageTitle>
          <StyledSearchInput placeholder="Search your patient name"
            onChangeText={text => setSearchName(text)}
            defaultValue={searchName}
          />
          <RightIcon3 onPress={()=>fetchData()}>
              <Ionicons name="md-search" size={32} color={buttonColors} />
          </RightIcon3>
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

export default SearchPatientAddMedicalScreen;

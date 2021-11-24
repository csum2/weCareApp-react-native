/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React, {useState} from 'react';
import {
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

const {logoColor, buttonColors, blackColor, backgroundApp} = Colors;

const Item = ({name, onPress}) => (
  <StyledFlatListView onPress={onPress}>
    <StyledFlatListText>{name}</StyledFlatListText>
  </StyledFlatListView>
);

const ListPatientScreen = ({navigation}) => {
  const [patentData, setPatientData] = useState(null);
  const [searchName, setSearchName] = useState('');

  const fetchData = async () => {
    const restOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    //Android emulator use URI = 'http://10.0.2.2:5000/patientnames/' + searchName
    //IOS simulator use URI = 'http://127.0.0.1:5000/patientnames/' + searchName
    const URI = 'http://127.0.0.1:5000/patientnames/' + searchName
    console.log("SearchPatientAddMedicalScreen, URI: " + URI);

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

  const renderItem = ({item}) => (
    <Item
      name={item.first_name + " " + item.last_name}
      onPress={() => navigation.navigate('TabViewPatient', item)}
    />
  );

  React.useEffect(() => {
    fetchData();
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
        <StyledSquaredButton>
          <ButtonTextOne>Only Critical patients</ButtonTextOne>
        </StyledSquaredButton>
        { patentData && (
          <StyledFlatList
            data={patentData.sort((a, b) => a.first_name.localeCompare(b.first_name))}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        )}
      </InnerContainer>
    </StyledContainer>
  );
};

export default ListPatientScreen;

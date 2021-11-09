/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledProfileButtonOne,
  ButtonTextOne,
  StyledFlatList,
  StyledFlatListView,
  StyledFlatListText,
  StyledSquaredButton,
  StyledSearchInput,
} from './../components/styles';

const DATA = [
  {
    id: '61855d5f8758d01752d42a27',
    name: 'Danniel Summer',
  },
];
const Item = ({name, onPress}) => (
  <StyledFlatListView onPress={onPress}>
    <StyledFlatListText>{name}</StyledFlatListText>
  </StyledFlatListView>
);

const SearchPatientAddMedicalScreen = ({route, navigation}) => {
  {
    /* This screen should read from the DB on the patient  */
  }
  const renderItem = ({item}) => (
    <Item
      name={item.name}
      onPress={() => navigation.navigate('AddEditPatientMedicalScreen', patientObj)}
    />
  );
  {
    /* and medical json objects and pass to the next screen */
  }
  {
    /* TODO: hardcode json data for testing */
  }

  const patientJson = '{"_id":"61855d5f8758d01752d42a27", "first_name":"Danniel", "last_name":"Summer", "date_of_birth":"1971-12-25", "biological_sex":"Male",' +
    '"email": "summer@abcmail.com", "contact_phone": "905-889-1430", "residential_address": "123 main street, markham", "emergency_contact": "Mary Summer", "emergency_phone": "416-123-4567", "relationship": "daugther",' +
    '"medicaldata":[' +
    '{"_id": "6185600e16a051184807031b", "sortkey":"202109201355", "measuring_date":"2021-09-20", "measuring_time":"13:55", "systolic_pressure":"110", "diastolic_pressure":"68", "respiratory_rate":"50", "oxygen_level":"98", "heartbeat_rate":"75"},' +
    '{"_id": "6185600e16a051184807031c", "sortkey":"202109211400", "measuring_date":"2021-09-21", "measuring_time":"14:00", "systolic_pressure":"100", "diastolic_pressure":"69", "respiratory_rate":"55", "oxygen_level":"99", "heartbeat_rate":"78"} ' +
    ']}';

  var patientObj = JSON.parse(patientJson);
  patientObj.mode = "add";
  console.log('ListPatientScreen, patientObj._id:' + patientObj._id);
  console.log('ListPatientScreen, patientObj.first_name:' + patientObj.first_name);

  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle></SubTitle>
        <PageTitle>Search a patient</PageTitle>
          <StyledSearchInput placeholder="Search your patient name" />
          <StyledFlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
      </InnerContainer>
    </StyledContainer>
  );
};

export default SearchPatientAddMedicalScreen;

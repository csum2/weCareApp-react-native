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
    id: '618b29c767a1a70b7dd59ec8',
    name: 'Danniel Summer',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Samuel Sum',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Tanav Sharma',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Alvin Mercado',
  },
  {
    id: '58694a0f-3da1-471f-gh96-987671e29d72',
    name: 'Carlos Cifuentes',
  },
];
const Item = ({name, onPress}) => (
  <StyledFlatListView onPress={onPress}>
    <StyledFlatListText>{name}</StyledFlatListText>
  </StyledFlatListView>
);

const ListPatientScreen = ({navigation}) => {
  {
    /* This screen should read from the DB on the patient  */
  }
  const renderItem = ({item}) => (
    <Item
      name={item.name}
      onPress={() => navigation.navigate('TabViewPatient', patientObj)}
    />
  );
  {
    /* and medical json objects and pass to the next screen */
  }
  {
    /* TODO: hardcode json data for testing */
  }

  const patientJson = '{"_id":"618b29c767a1a70b7dd59ec8", "first_name":"Danniel", "last_name":"Summer", "date_of_birth":"1971-12-25", "biological_sex":"Male",' +
    '"email": "summer@abcmail.com", "contact_phone": "905-889-1430", "residential_address": "123 main street, markham", "emergency_contact": "Mary Summer", "emergency_phone": "416-123-4567", "relationship": "daugther",' +
    '"medicaldata":[' +
//    '{"_id": "6185600e16a051184807031b", "sortkey":"202109201355", "measuring_date":"2021-09-20", "measuring_time":"13:55", "systolic_pressure":"110", "diastolic_pressure":"68", "respiratory_rate":"50", "oxygen_level":"98", "heartbeat_rate":"75"},' +
//    '{"_id": "6185600e16a051184807031c", "sortkey":"202109211400", "measuring_date":"2021-09-21", "measuring_time":"14:00", "systolic_pressure":"100", "diastolic_pressure":"69", "respiratory_rate":"55", "oxygen_level":"99", "heartbeat_rate":"78"} ' +
    ']}';

  var patientObj = JSON.parse(patientJson);
  console.log('ListPatientScreen, patientObj._id:' + patientObj._id);
  console.log(
    'ListPatientScreen, patientObj.first_name:' + patientObj.first_name,
  );

  return (
    <StyledContainer>
      <InnerContainer>
        <StyledSearchInput placeholder="Search your patient name" />
        <StyledSquaredButton>
          <ButtonTextOne>Only Critical patients</ButtonTextOne>
        </StyledSquaredButton>
        <StyledFlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </InnerContainer>
    </StyledContainer>
  );
};

export default ListPatientScreen;

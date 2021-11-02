/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import React from 'react';
import {
   StyledContainer,
   InnerContainer,
   PageTitle,
   SubTitle,
   StyledProfileButtonOne,
   ButtonTextOne,
} from './../components/styles';

const ListPatientScreen = ({navigation}) => {
  { /* This screen should read from the DB on the patient  */ }
  { /* and medical json objects and pass to the next screen */ }
  { /* TODO: hardcode json data for testing */ }
  /*
  const patientJson = '{"_id":"12345678901", "first_name":"Danniel", "last_name":"Summer", "date_of_birth":"1980-10-21", "biological_sex":"Male",' +
    '"email": "summer@abcmail.com", "contact_phone": "905-889-1430", "residential_address": "123 main street, markham", "emergency_contact": "Mary Summer", "emergency_phone": "416-123-4567", "relationship": "daugther",' +
    '"medicaldata":[' +
    '{"sortkey":"202109201355", "measuring_date":"2021-09-20", "measuring_time":"13:55", "systolic_pressure":"110", "diastolic_pressure":"68", "respiratory_rate":"50", "oxygen_level":"98", "heartbeat_rate":"75"},' +
    '{"sortkey":"202109211400", "measuring_date":"2021-09-21", "measuring_time":"14:00", "systolic_pressure":"100", "diastolic_pressure":"69", "respiratory_rate":"55", "oxygen_level":"99", "heartbeat_rate":"78"} ' +
    ']}';
  */
  const patientJson = '{"_id":"12345678901", "first_name":"Danniel", "last_name":"Summer", "date_of_birth":"1980-10-21", "biological_sex":"Male",' +
    '"email": "summer@abcmail.com", "contact_phone": "905-889-1430", "residential_address": "123 main street, markham", "emergency_contact": "Mary Summer", "emergency_phone": "416-123-4567", "relationship": "daugther",' +
    '"medicaldata":[]' +
    '}';

  var patientObj = JSON.parse(patientJson);
  console.log("ListPatientScreen, patientObj._id:" + patientObj._id);
  console.log("ListPatientScreen, patientObj.first_name:" + patientObj.first_name);

  return (
    <StyledContainer>
      <InnerContainer>
        <SubTitle>WeCare app MAPD712 Group13</SubTitle>
        <PageTitle>List Patients</PageTitle>
        <StyledProfileButtonOne onPress={() => navigation.navigate('TabViewPatient', patientObj)}>
          <ButtonTextOne>Simulate a list item click</ButtonTextOne>
        </StyledProfileButtonOne>
      </InnerContainer>
    </StyledContainer>
    );
}

export default ListPatientScreen;

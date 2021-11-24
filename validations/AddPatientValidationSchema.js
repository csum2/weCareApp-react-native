/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import * as yup from 'yup';
const AddPatientValidationSchema = yup.object().shape({
  first_name: yup.string().required('First Name is Required'),
  last_name: yup.string().required('Last Name is required'),
  date_of_birth: yup.string().required('Date of birth is required'),
  email: yup.string().required('Email is required'),
  contact_phone: yup.string().required('Contact Phone is required'),
  residential_address: yup.string().required('Address is required'),
  emergency_contact: yup.string().required('Emergency Contact is required'),
  emergency_phone: yup.string().required('Emergency Phone is required'),
  relationship: yup.string().required('Relationship is required'),
});

export default AddPatientValidationSchema;

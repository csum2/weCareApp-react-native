/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import * as yup from 'yup'
const MedicalValidationSchema = yup.object().shape({
 measuringDate: yup
   .date()
   .required('Measuring Date is Required'),
 measuringTime: yup
   .string()
   .required('Measuring Time is required')
   .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]+$/, "Enter the time in 24-hour format"),
 systolicPressure: yup
   .number()
   .positive()
   .required('Systolic Pressure is Required'),
 diastolicPressure: yup
   .number()
   .positive()
   .required('Diastolic Pressure is Required'),
 respiratoryRate: yup
   .number()
   .positive()
   .required('Respiratory Rate is Required'),
 oxygenLevel: yup
   .number()
   .positive()
   .required('Blood Oxygen Level is Required'),
 heartbeatRate: yup
   .number()
   .positive()
   .required('Heartbeat Rate is Required'),
});

export default MedicalValidationSchema;

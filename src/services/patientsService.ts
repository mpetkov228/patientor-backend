import patients from '../../data/patients';
import { Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSsnPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getNonSsnPatients
};
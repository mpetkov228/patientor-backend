import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, NewPatient } from '../types';

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

const createPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSsnPatients,
  createPatient
};
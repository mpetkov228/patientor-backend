import { v1 as uuid } from 'uuid';

import patients from '../../data/patientsFull';
import { Patient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getNonSsnPatients = (): Omit<Patient, 'ssn' | 'entries'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const createPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  getNonSsnPatients,
  createPatient,
};
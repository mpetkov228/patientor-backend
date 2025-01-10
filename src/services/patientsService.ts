import { v1 as uuid } from 'uuid';

import patients from '../../data/patientsFull';
import { Patient, NewPatient, NewEntry, Entry, Diagnosis } from '../types';

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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const createEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  parseDiagnosisCodes(newEntry);
  patients.forEach(patient => {
    if (patient.id === id) {
      patient.entries.push(newEntry);
    }
  });

  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  getNonSsnPatients,
  createPatient,
  createEntry
};
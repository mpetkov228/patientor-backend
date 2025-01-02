import { z } from 'zod';

import { newPatientSchema } from './utils';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Entry = {
  
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NewPatient = z.infer<typeof newPatientSchema>;
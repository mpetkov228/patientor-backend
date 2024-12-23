import { z } from 'zod';

import { Gender, NewPatient } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) { 
    const newPatient: NewPatient = {
      name: z.string().parse(object.name),
      dateOfBirth: z.string().date().parse(object.dateOfBirth),
      ssn: z.string().parse(object.ssn),
      gender: z.nativeEnum(Gender).parse(object.gender),
      occupation: z.string().parse(object.occupation)
    };      
    return newPatient;
  }

  throw new Error('Incorrect data: some fields missing');
};

export default toNewPatient;
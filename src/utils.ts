import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseName = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Incorrect or missing name');
  }
  return param;
};

const parseDateOfBirth = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return param;
};

const parseSsn = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Incorrect or missing ssn');
  }
  return param;
};

const parseGender = (param: unknown): Gender => {
  if (!isString(param) || !isGender(param)) {
    throw new Error('Incorrect or missing gender');
  }
  return param;
};

const parseOccupation = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error('Incorrect or missing occupation');
  }
  return param;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) { 
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };      
    return newPatient;
  }

  throw new Error('Incorrect data: some fields missing');
};

export default toNewPatient;
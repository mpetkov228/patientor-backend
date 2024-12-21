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
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing name');
  }
  return param;
};

const parseDateOfBirth = (param: unknown): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return param;
};

const parseSsn = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing ssn');
  }
  return param;
};

const parseGender = (param: unknown): Gender => {
  if (!param || !isString(param) || !isGender(param)) {
    throw new Error('Incorrect or missing gender');
  }
  return param;
};

const parseOccupation = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing occupation');
  }
  return param;
};

const toNewPatient = (object: unknown): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };

  return newPatient;
};

export default toNewPatient;
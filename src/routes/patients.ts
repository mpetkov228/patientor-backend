/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSsnPatients());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  res.send(patientsService.createPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  }));
});

export default router;
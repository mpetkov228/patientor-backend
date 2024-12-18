import express from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSsnPatients());
});

router.post('/', (_req, res) => {
  res.send('create patient');
});

export default router;
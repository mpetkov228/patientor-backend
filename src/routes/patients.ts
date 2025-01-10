import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import patientsService from '../services/patientsService';
import { newPatientSchema } from '../utils';
import { NewEntry, NewPatient } from '../types';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatientById(req.params.id));
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
  const createdPatient = patientsService.createPatient(req.body);
  res.json(createdPatient);
});

router.post('/:id/entries', (req: Request<{ id: string }, unknown, NewEntry>, res: Response<NewEntry>) => {
  const createdEntry = patientsService.createEntry(req.params.id, req.body);
  res.json(createdEntry);
});

router.use(errorMiddleware);

export default router;
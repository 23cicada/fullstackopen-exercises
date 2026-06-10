import data from "../data/patients.ts";
import { z } from "zod";
import type { NonSsnPatient, NewPatient } from '../types.ts';
import type { Request, Response, NextFunction } from "express";
import { v1 as uuid } from "uuid";

const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

const NewPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(Gender),
  ssn: z.string().optional(),
  dateOfBirth: z.iso.date(),
});

const getPatients = (): NonSsnPatient[] => {
  return data.map(({ ssn: _, ...patient }) => patient);
};

const createPatient = (patient: NewPatient) => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  data.push(newPatient);
  return newPatient;
};

const newPatientParser = (req: Request, _: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  getPatients,
  createPatient
};

export { NewPatientSchema, newPatientParser };

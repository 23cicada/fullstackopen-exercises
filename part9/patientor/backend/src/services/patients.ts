import data from "../data/patients.ts";
import type { NonSsnPatient, NewPatient, Patient, NewEntry } from '../types.ts';
import { v1 as uuid } from "uuid";

const getPatients = (): NonSsnPatient[] => {
  return data.map(({ ssn: _, ...patient }) => patient);
};

const getPatient = (id: string): Patient => {
  const patient = data.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};

const createPatient = (patient: NewPatient) => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  data.push(newPatient);
  return newPatient;
};

const createEntry = (patientId: string, entry: NewEntry) => {
  const patient = data.find((patient) => patient.id === patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  createPatient,
  getPatient,
  createEntry
};

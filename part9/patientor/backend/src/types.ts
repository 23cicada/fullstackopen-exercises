import type { z } from "zod";
import type { NewPatientSchema } from "./services/patients.ts";


type NewPatient = z.infer<typeof NewPatientSchema>;

interface Diagose {
  code: string;
  name: string;
  latin?: string;
}

interface Patient extends NewPatient {
  id: string;
}

type NonSsnPatient = Omit<Patient, "ssn">;

export type { Diagose, Patient, NonSsnPatient, NewPatient };

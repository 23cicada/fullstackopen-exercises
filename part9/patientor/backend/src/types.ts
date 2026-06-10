import type { z } from "zod";
import type {
  NewPatientSchema,
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema
} from "./services/schema.ts";

type NewPatient = z.infer<typeof NewPatientSchema>;

interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NewEntry = z.infer<typeof NewHealthCheckEntrySchema>
 | z.infer<typeof NewOccupationalHealthcareEntrySchema>
 | z.infer<typeof NewHospitalEntrySchema>;

type Entry = NewEntry & { id: string };

interface Patient extends NewPatient {
  id: string;
  entries: Entry[]
}

type NonSsnPatient = Omit<Patient, "ssn" | "entries">;

export type { Diagnosis, Patient, NonSsnPatient, NewPatient, Entry };

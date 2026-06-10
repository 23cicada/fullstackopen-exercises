
import { z } from "zod";
import { Gender, HealthCheckRating } from "./constant.ts";

const NewPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  gender: z.enum(Gender),
  ssn: z.string().optional(),
  dateOfBirth: z.iso.date(),
});

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const NewHealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

const NewOccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  })
});

const NewHospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export {
  NewPatientSchema,
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema
};

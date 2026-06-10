
import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";
import { NewPatientSchema, NewHealthCheckEntrySchema, NewOccupationalHealthcareEntrySchema, NewHospitalEntrySchema } from "./schema.ts";

const validatePatient = (req: Request, _: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const entrySchemaMap: Record<string, z.ZodTypeAny> = {
  HealthCheck: NewHealthCheckEntrySchema,
  OccupationalHealthcare: NewOccupationalHealthcareEntrySchema,
  Hospital: NewHospitalEntrySchema,
};

const validateEntry = (req: Request<unknown, unknown, unknown>, _: Response, next: NextFunction) => {
  try {
    const type = (req.body as Record<string, unknown>)?.type;
    const schema = typeof type === "string" && entrySchemaMap[type];

    if (!schema) {
      return next(new Error("Invalid entry type"));
    }
    schema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};



export { validatePatient, validateEntry };

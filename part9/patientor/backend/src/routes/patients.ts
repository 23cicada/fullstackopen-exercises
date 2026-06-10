import { Router, type Response, type Request } from "express";
import patientsService, { newPatientParser } from "../services/patients.ts";
import type { NewPatient, NonSsnPatient, Patient } from "../types.ts";

const patientsRouter = Router();

patientsRouter.get("/", (_, res: Response<NonSsnPatient[]>) => {
  return res.json(patientsService.getPatients());
});

patientsRouter.post("/", newPatientParser, (res: Request<unknown, unknown, NewPatient>, req: Response<Patient>) => {
  return req.json(patientsService.createPatient(res.body));
});

export default patientsRouter;

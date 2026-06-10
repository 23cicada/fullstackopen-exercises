import { Router, type Response, type Request } from "express";
import patientsService from "../services/patients.ts";
import type { NewPatient, NonSsnPatient, Patient, NewEntry, Entry } from "../types.ts";
import { validatePatient, validateEntry } from "../services/middleware.ts";

const patientsRouter = Router();

patientsRouter.get("/", (_, res: Response<NonSsnPatient[]>) => {
  return res.json(patientsService.getPatients());
});

patientsRouter.post("/", validatePatient, (res: Request<unknown, unknown, NewPatient>, req: Response<Patient>) => {
  return req.json(patientsService.createPatient(res.body));
});

patientsRouter.get("/:id", (req: Request<{ id: string }>, res: Response<Patient>) => {
  return res.json(patientsService.getPatient(req.params.id));
});

patientsRouter.post("/:id/entries", validateEntry, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
  return res.json(patientsService.createEntry(req.params.id, req.body));
});

export default patientsRouter;

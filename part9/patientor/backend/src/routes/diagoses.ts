import { Router, type Response } from "express";
import diagnosesService from "../services/diagoses.ts";
import type { Diagnosis } from "../types.ts";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_, res: Response<Diagnosis[]>) => {
  return res.json(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;

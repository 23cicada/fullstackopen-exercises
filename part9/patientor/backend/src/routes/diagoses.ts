import { Router, type Response } from "express";
import diagnosesService from "../services/diagoses.ts";
import type { Diagose } from "../types.ts";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_, res: Response<Diagose[]>) => {
  return res.json(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;

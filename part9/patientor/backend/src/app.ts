import express from "express";
import type { Request, Response, NextFunction } from 'express';
import { z } from "zod";
import cors from "cors";
import diagnosesRouter from "./routes/diagoses.ts";
import patientsRouter from "./routes/patients.ts";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/ping", (_, req) => {
  return req.send("pong");
});
app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
});

export default app;

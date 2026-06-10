import axios from "axios";
import { Patient, PatientFormValues, Diagnosis, Entry, NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

interface ValidationError {
  error: { message: string } []
}

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const createEntry = async (id: string, entry: NewEntry) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError>(error)) {
      throw new Error(error.response?.data?.error?.[0].message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default {
  getAll, create, getPatient, getDiagnoses, createEntry
};


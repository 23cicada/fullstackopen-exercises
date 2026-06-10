import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "/api/diaries";

interface ValidationError {
  error: { message: string } []
}


const getAll = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

const create = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
    .catch(error => {
      if (axios.isAxiosError<ValidationError>(error)) {
        throw new Error(error.response?.data?.error?.[0].message ?? error.message)
      }
      throw new Error("Unknown error")
    })
}


export default { getAll, create }

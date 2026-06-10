import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { useState, useEffect } from 'react';
import type { Patient, Diagnosis, Entry } from '../../types';
import { Female, Male } from "@mui/icons-material";
import { Typography } from '@mui/material';
import HealthCheck from '../Entry/HealthCheck';
import Hospital from '../Entry/Hospital';
import OccupationalHealthcare from '../Entry/OccupationalHealthcare';
import EntryForm from '../EntryForm';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then(patient => setPatient(patient));
      patientService.getDiagnoses().then(diagnoses => setDiagnoses(diagnoses));
    }
  }, [id]);

  const genderIcon = () => {
    switch (patient?.gender) {
      case 'male': return <Male />;
      case 'female': return <Female />;
    }
  };

  const handleAddEntry = async (entry: Entry) => {
    setPatient({
      ...patient!,
      entries: [...patient!.entries, entry]
    });
  };

  return patient && (
    <>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Typography variant="h6">{patient.name}</Typography>
          {genderIcon()}
        </div>
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">occupation: {patient.occupation}</Typography>
        <Typography variant="body1">date of birth: {patient.dateOfBirth}</Typography>
      </div>

      {patient.entries.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <Typography variant='h6'>entries:</Typography>
          {patient.entries.map(entry => (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
              <ul>
                {entry.diagnosisCodes?.map(code => (
                  <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <EntryForm diagnoses={diagnoses} onAddEntry={handleAddEntry} />
    </>
  );
};

export default PatientDetailsPage;

import { Typography, TextField, Box, Chip, OutlinedInput, Button, Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent, SubmitEvent, useState } from 'react';
import type { Diagnosis, Entry } from '../../types';
import { Theme, useTheme } from '@mui/material/styles';
import { HealthCheckRating } from '../../types';
import patientsService from '../../services/patients';
import { useParams } from 'react-router-dom';
import type { NewEntry } from '../../types';

const entryTypeOptions = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'Hospital', label: 'Hospital' },
];

const healthCheckRatingOptions = Object.entries(HealthCheckRating).map(([key, value]) => ({
  value: value,
  label: `${value} -- ${key}`,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

function getStyles(name: string, codes: readonly string[], theme: Theme) {
  return {
    fontWeight: codes.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


interface EntryFormProps {
  diagnoses: Diagnosis[];
  onAddEntry: (entry: Entry) => void;
}

const EntryForm = ({ diagnoses, onAddEntry }: EntryFormProps) => {
  const { id } = useParams();
  const [error, setError] = useState<string | undefined>(undefined);
  const theme = useTheme();
  const [entryType, setEntryType] = useState<string>("HealthCheck");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const handleEntryTypeChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSpecialistChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialist(event.target.value);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleHealthCheckRatingChange = (event: SelectChangeEvent<typeof healthCheckRating>) => {
    setHealthCheckRating(event.target.value as HealthCheckRating);
  };

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    try {
      const data = await patientsService.createEntry(id!, {
        type: entryType,
        date,
        description,
        specialist,
        diagnosisCodes,
        healthCheckRating
      } as NewEntry);

      onAddEntry(data);
      handleCancel();
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Unknown error");
    }

  };

  const handleCancel = () => {
    setError(undefined);
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setEntryType("HealthCheck");
    setHealthCheckRating(HealthCheckRating.Healthy);
  };

  return (
    <div style={{ border: "1px dashed black", padding: 10 }}>
      <Typography variant="h6" style={{ marginBottom: 10 }}>New Entry</Typography>
      {error && <Alert severity="error" style={{ marginBottom: 20 }}>{error}</Alert>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="entry-type-select">Entry type</InputLabel>
          <Select
            labelId="entry-type-select"
            value={entryType}
            label="entryType"
            onChange={handleEntryTypeChange}
          >
            {entryTypeOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          label="Date *"
          value={date}
          type="date"
          onChange={handleDateChange}
        />
        <TextField
          fullWidth
          label="Description *"
          value={description}
          onChange={handleDescriptionChange}
        />
        <TextField
          fullWidth
          label="Specialist *"
          value={specialist}
          onChange={handleSpecialistChange}
        />

        <FormControl fullWidth>
          <InputLabel id="diagnosis-codes-select">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes-select"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {diagnoses.map(({ code, name }) => (
              <MenuItem
                key={code}
                value={code}
                style={getStyles(code, diagnosisCodes, theme)}
              >
                {code} -- {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="health-check-rating-select">Health Check Rating</InputLabel>
          <Select
            labelId="health-check-rating-select"
            value={healthCheckRating}
            onChange={handleHealthCheckRatingChange}
            label="Health Check Rating"
          >
            {healthCheckRatingOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button type="submit" variant="contained" color="primary">Add</Button>
          <Button type="button" variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
        </Box>
      </form>
    </div>
  );
};

export default EntryForm;

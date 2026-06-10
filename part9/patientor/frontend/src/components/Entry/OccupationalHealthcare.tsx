import { Box, Typography } from '@mui/material';
import { Work } from '@mui/icons-material';
import type { OccupationalHealthcareEntry } from '../../types';

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <Box sx={{ border: 1, borderRadius: 1, p: 1.5, mb: 1 }}>
      <Typography variant="body1">
        {entry.date} <Work fontSize="small" /> <i>{entry.employerName}</i>
      </Typography>
      <Typography variant="body1">
        <i>{entry.description}</i>
      </Typography>
      {entry.sickLeave && (
        <Typography variant="body2">
          sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalHealthcare;

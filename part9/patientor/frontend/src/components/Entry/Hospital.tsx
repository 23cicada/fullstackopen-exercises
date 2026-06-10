import { Box, Typography } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';
import type { HospitalEntry } from '../../types';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box sx={{ border: 1, borderRadius: 1, p: 1.5, mb: 1 }}>
      <Typography variant="body1">
        {entry.date} <LocalHospital fontSize="small" />
      </Typography>
      <Typography variant="body1">
        <i>{entry.description}</i>
      </Typography>
      <Typography variant="body2">
        discharge: {entry.discharge.date} - {entry.discharge.criteria}
      </Typography>
      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default Hospital;

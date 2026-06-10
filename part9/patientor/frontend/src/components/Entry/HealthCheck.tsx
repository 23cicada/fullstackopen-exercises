import { Box, Typography } from '@mui/material';
import { Favorite, MedicalServices } from '@mui/icons-material';
import { HealthCheckRating } from '../../types';
import type { HealthCheckEntry } from '../../types';

const ratingColor: Record<HealthCheckRating, string> = {
  [HealthCheckRating.Healthy]: 'green',
  [HealthCheckRating.LowRisk]: 'gold',
  [HealthCheckRating.HighRisk]: 'orange',
  [HealthCheckRating.CriticalRisk]: 'red',
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Box sx={{ border: 1, borderRadius: 1, p: 1.5, mb: 1 }}>
      <Typography variant="body1">
        {entry.date} <MedicalServices fontSize="small" />
      </Typography>
      <Typography variant="body1">
        <i>{entry.description}</i>
      </Typography>
      <Favorite sx={{ color: ratingColor[entry.healthCheckRating] }} />
      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheck;

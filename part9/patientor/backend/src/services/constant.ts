const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export { Gender, HealthCheckRating };

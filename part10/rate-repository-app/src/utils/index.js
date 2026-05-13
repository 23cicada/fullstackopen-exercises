export const formatCount = (value) => {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return value;
  }

  if (numberValue >= 1000) {
    return `${(numberValue / 1000).toFixed(1)}k`;
  }

  return String(numberValue);
};

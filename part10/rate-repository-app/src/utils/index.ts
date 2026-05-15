export const formatCount = (value: string | number) => {
  const numberValue = Number(value);

  if (numberValue >= 1000) {
    return `${(numberValue / 1000).toFixed(1)}k`;
  }

  return String(numberValue);
};

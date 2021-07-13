export const isNumber = (value: string | number): boolean => {
  return !isNaN(parseInt(value as string, 10)) && isFinite(value as number);
};

export const isEmpty = (value: any): boolean => {
  return value == null
    || value === ''
    || value !== value // Check for NaN.
  ;
};

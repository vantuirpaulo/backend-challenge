export const isValidCodeFormat = (code: string): boolean =>
  /^[0-9]+$/.test(code);

export const isValidCodeLength = (code: string): boolean =>
  code.length >= 46 && code.length <= 48;

export const validateDvMod10 = (field: string): boolean => {
  const dv = parseInt(field.slice(-1));
  const code = field.slice(0, -1);

  const multipliedByWeight = [...code]
    .reverse()
    .map((item, i) => (i % 2 === 0 ? parseInt(item) * 2 : parseInt(item)))
    .join()
    .replace(/,/g, '');

  const sum = [...multipliedByWeight]
    .map(Number)
    .reduce((acc, item) => acc + item);

  const calcDv = 10 - (sum % 10);

  return dv === calcDv;
};

export const validateDvMod11 = (field: string): Boolean => {
  const dv = parseInt(field.slice(-1));

  const code = field.slice(0, -1);

  const multipliedByWeight = [...code]
    .reverse()
    .map((item, i) => parseInt(item) * ((i % 8) + 2));

  const digitSum = multipliedByWeight.reduce((acc, item) => acc + item, 0);

  let calcDv = digitSum % 11;

  if (calcDv === 0 || calcDv === 1) {
    calcDv = 0;
  } else {
    calcDv = 11 - calcDv;
  }

  return calcDv === dv;
};

export const validateDvMod11BarCode = (field: string): Boolean => {
  const dv = parseInt(field.slice(4, 5));

  const firstSlice = field.slice(0, 4);
  const secondSlice = field.slice(5, 44);
  const code = firstSlice + secondSlice + dv;

  return validateDvMod11(code);
};

export const isValidCodeFormat = (code: string): boolean =>
  /^[0-9]+$/.test(code);

export const isValidCodeLength = (code: string): boolean =>
  code.length >= 46 && code.length <= 48;

export const validateDvFieldMod10 = (field: string): boolean => {
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

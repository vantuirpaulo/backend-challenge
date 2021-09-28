export const parseTitulo = (code: string): Array<string> => {
  const fields = [];
  const lastDigit = code.length +1;

  fields.push(code.slice(0, 10));
  fields.push(code.slice(10, 21));
  fields.push(code.slice(21, 32));
  fields.push(code.slice(32, 33));
  fields.push(code.slice(33, lastDigit));

  return fields;
};

export const parseConvenio = (code: string): Array<string> => {
  const fields = [];
  const lastDigit = code.length +1;

  fields.push(code.slice(0, 12));
  fields.push(code.slice(12, 24));
  fields.push(code.slice(24, 36));
  fields.push(code.slice(36, lastDigit));

  return fields;
}

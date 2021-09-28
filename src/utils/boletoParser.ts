export const parseTitulo = (code: string): Array<string> => {
  const fields = [];
  const lastDigit = code.length + 1;

  fields.push(code.slice(0, 10));
  fields.push(code.slice(10, 21));
  fields.push(code.slice(21, 32));
  fields.push(code.slice(32, 33));
  fields.push(code.slice(33, lastDigit));

  return fields;
};

export const parseConvenio = (code: string): Array<string> => {
  const fields = [];
  const lastDigit = code.length + 1;

  fields.push(code.slice(0, 12));
  fields.push(code.slice(12, 24));
  fields.push(code.slice(24, 36));
  fields.push(code.slice(36, lastDigit));

  return fields;
};

export const tituloToBarCode = (fields: Array<string>): string => {

  const fieldA = fields[0].slice(0, 3);
  const fieldB = fields[0].slice(3, 4);
  const fieldC = fields[0].slice(4, 9);
  const fieldX = fields[0].slice(9, 10);
  const fieldD = fields[1].slice(0, 10);
  const fieldE = fields[2].slice(0, 10);
  const fieldU = fields[4].slice(0, 4);
  const fieldV = fields[4].slice(4, 14);

  return fieldA + fieldB + fieldX + fieldU + fieldV + fieldC + fieldD + fieldE;
};

export const convenioToBarCode = (fields: Array<string>): string => {
  const fieldA = fields[0].slice(0, -1);
  const fieldB = fields[1].slice(0, -1);
  const fieldC = fields[2].slice(0, -1);
  const fieldD = fields[3].slice(0, -1);

  return fieldA + fieldB + fieldC + fieldD;
}

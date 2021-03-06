import { add, format } from 'date-fns';

import * as boletoValidator from './boletoValidator';
import { BadRequest } from './errors';

const FACTOR_NUMBER = 1000;
const BASE_DATE = '2000-07-03';

export type BoletoProps = {
  barCode: string;
  amount?: string;
  expirationDate?: string;
};

export const getFieldsBoletoTitulo = (code: string): Array<string> => {
  const fields = [];
  const lastDigit = code.length + 1;

  fields.push(code.slice(0, 10));
  fields.push(code.slice(10, 21));
  fields.push(code.slice(21, 32));
  fields.push(code.slice(32, 33));
  fields.push(code.slice(33, lastDigit));

  return fields;
};

export const getFieldsBoletoConvenio = (code: string): Array<string> => {
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
};

export const getExpirationDate = (factor: string): string => {
  const baseDate = new Date(BASE_DATE);
  const days = parseInt(factor) - FACTOR_NUMBER;
  const expirationDate = add(
    new Date(baseDate.valueOf() + baseDate.getTimezoneOffset() * 60 * 1000),
    { days }
  );

  return format(expirationDate, 'yyyy-MM-dd');
};

export const getAmount = (amount: string): string => {
  const value = parseInt(amount) / 100;
  return value.toFixed(2);
};

export const parseBoletoTitulo = (code: string): BoletoProps => {
  const fields = getFieldsBoletoTitulo(code);

  const isValidField1 = boletoValidator.validateDvMod10(fields[0]);
  const isValidField2 = boletoValidator.validateDvMod10(fields[1]);
  const isValidField3 = boletoValidator.validateDvMod10(fields[2]);

  if (!isValidField1 || !isValidField2 || !isValidField3) {
    throw new BadRequest('Digito de verifica????o inv??lido');
  }

  const factor = fields[4].slice(0, 4);
  const unformattedAmount = fields[4].slice(4, 14);

  const barCode = tituloToBarCode(fields);
  const amount = getAmount(unformattedAmount);
  const expirationDate = getExpirationDate(factor);

  return { barCode, amount, expirationDate };
};

export const parseBoletoConvenio = (code: string): BoletoProps => {
  const fields = getFieldsBoletoConvenio(code);
  const reference = fields[0].slice(2, 3);

  let isValidField1;
  let isValidField2;
  let isValidField3;
  let isValidField4;

  if (reference === '6' || reference === '7') {
    isValidField1 = boletoValidator.validateDvMod10(fields[0]);
    isValidField2 = boletoValidator.validateDvMod10(fields[1]);
    isValidField3 = boletoValidator.validateDvMod10(fields[2]);
    isValidField4 = boletoValidator.validateDvMod10(fields[3]);
  } else if (reference === '8' || reference === '9') {
    isValidField1 = boletoValidator.validateDvMod11(fields[1]);
    isValidField2 = boletoValidator.validateDvMod11(fields[1]);
    isValidField3 = boletoValidator.validateDvMod11(fields[2]);
    isValidField4 = boletoValidator.validateDvMod11(fields[3]);
  }

  if (!isValidField1 || !isValidField2 || !isValidField3 || !isValidField4) {
    throw new BadRequest('Digito de verifica????o inv??lido');
  }

  const barCode = convenioToBarCode(fields);
  const amount = getAmount(barCode.slice(4, 15));

  return { barCode, amount };
};

export const parse = (code: string): BoletoProps => {
  if(code.charAt(0) === '8'){
    return parseBoletoConvenio(code);
  }

  return parseBoletoTitulo(code);
}

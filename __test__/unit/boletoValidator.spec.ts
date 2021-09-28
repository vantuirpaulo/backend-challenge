import * as boletoValidator from '../../src/utils/boletoValidator';

const data = {
  validBoletoTitulo: '21290001192110001210904475617405975870000002000',
  invalidBoletoTitulo: '212900011211000A10904475617409758700002000',
  validBoletoConvenio: '836300000012718701380013223258756111080992882466',
  invalidBoletoConvenio: '836300000O127187013840013223235658756111080992882466',

  validBoletoField: '836300000012',
  invalidBoletoField: '223258756112',

  validCodeMod11BarCode: '00193373700000001000500940144816060680935031',
};

describe('Validate a boleto code', () => {
  it('should be a valid boleto code format', () => {
    const result = boletoValidator.isValidCodeFormat(data.validBoletoTitulo);

    expect(result).toBe(true);
  });

  it('should be a valid boleto code length', () => {
    const result = boletoValidator.isValidCodeLength(data.validBoletoConvenio);

    expect(result).toBe(true);
  });

  it('should be an invalid boleto code format', () => {
    const result = boletoValidator.isValidCodeFormat(data.invalidBoletoTitulo);

    expect(result).toBe(false);
  });

  it('should be an invalid boleto code length', () => {
    const result = boletoValidator.isValidCodeLength(
      data.invalidBoletoConvenio
    );

    expect(result).toBe(false);
  });
});

describe('Validate code using module 10', () => {
  it('should be a valid boleto code', () => {
    const result = boletoValidator.validateDvMod10(data.validBoletoField);

    expect(result).toBe(true);
  });

  it('should be an invalid boleto code field', () => {
    const result = boletoValidator.validateDvMod10(data.invalidBoletoField);

    expect(result).toBe(false);
  });
});

describe('Validate fields using module 11', () => {
  it('should be a valid boleto fields', () => {
    const result = [
      '838600000050',
      '096000190009',
      '000801782309',
      '000343062712',
    ].map(boletoValidator.validateDvMod11);

    expect(result).toEqual([true, true, true, true]);
  });
});

describe('Validate barcode using module 11', () => {
  it('should be a valid boleto barcode', () => {
    const result = boletoValidator.validateDvMod11BarCode(
      data.validCodeMod11BarCode
    );

    expect(result).toBe(true);
  });
});

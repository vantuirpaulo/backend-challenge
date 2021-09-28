import * as boletoValidator from '../../src/validators/boletoValidator';

const data = {
  validBoletoTitulo: '21290001192110001210904475617405975870000002000',
  invalidBoletoTitulo: '212900011211000A10904475617409758700002000',
  validBoletoConvenio: '836300000012718701380013223258756111080992882466',
  invalidBoletoConvenio: '836300000O127187013840013223235658756111080992882466'
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
  })

  it('should be an invalid boleto code length', () => {
    const result = boletoValidator.isValidCodeLength(data.invalidBoletoConvenio);

    expect(result).toBe(false);
  })
});



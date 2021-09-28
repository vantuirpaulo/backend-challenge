import * as boletoParser from '../../src/utils/boletoParser';

const data = {
  validBoletoTitulo: '21290001192110001210904475617405975870000002000',
  validBoletoConvenio: '836300000012718701380013223258756111080992882466',
};

describe('Boleto de Titulo parser', () => {
  it('should parse a valid boleto de titulo', () => {
    const result = boletoParser.parseTitulo(data.validBoletoTitulo);

    expect(result).toEqual([
      '2129000119',
      '21100012109',
      '04475617405',
      '9',
      '75870000002000',
    ]);
  });
});

describe('Boleto de Convênio parser', () => {
  it('should parse a valid boleto de convênio', () => {
    const result = boletoParser.parseConvenio(data.validBoletoConvenio);

    expect(result).toEqual([
      '836300000012',
      '718701380013',
      '223258756111',
      '080992882466',
    ]);
  });
});

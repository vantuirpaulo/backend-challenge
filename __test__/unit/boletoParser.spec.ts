import * as boletoParser from '../../src/utils/boletoParser';

const data = {
  validBoletoTitulo: '21290001192110001210904475617405975870000002000',
  validTituloBarCode: '21299758700000020000001121100012100447561740',
  validBoletoConvenio: '836300000012718701380013223258756111080992882466',
  validConvenioBarCode: '83630000001718701380012232587561108099288246',
};

describe('Boleto de Titulo parser', () => {
  it('should return fields of a valid boleto de titulo', () => {
    const result = boletoParser.getFieldsBoletoTitulo(data.validBoletoTitulo);

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
  it('should return fields of a valid boleto de convênio', () => {
    const result = boletoParser.getFieldsBoletoConvenio(
      data.validBoletoConvenio
    );

    expect(result).toEqual([
      '836300000012',
      '718701380013',
      '223258756111',
      '080992882466',
    ]);
  });
});

describe('Convert a typed line into a bar code', () => {
  it('should be convert a typed line of boleto de convênio into a bar code', () => {
    const result = boletoParser.tituloToBarCode([
      '2129000119',
      '21100012109',
      '04475617405',
      '9',
      '75870000002000',
    ]);

    expect(result).toEqual(data.validTituloBarCode);
  });

  it('shoud be convert a typed line of boleto de convênio into a bar code', () => {
    const result = boletoParser.convenioToBarCode([
      '836300000012',
      '718701380013',
      '223258756111',
      '080992882466',
    ]);

    expect(result).toEqual(data.validConvenioBarCode);
  });
});

describe('Get expiration date by factor', () => {
  it('should return a valid expiration date', () => {
    const result = boletoParser.getExpirationDate('7587');

    expect(result).toBe('2018-07-16');
  });
});

describe('Get the amount of boleto', () => {
  it('should return the amount as string', () => {
    const result = boletoParser.getAmount('0000002000');

    expect(result).toBe('20.00');
  });
});

describe('Boleto parser', () => {
  it('should return informations from the typed line of a boleto de titulo', () => {
    const result = boletoParser.parseBoletoTitulo(data.validBoletoTitulo);

    expect(result).toEqual({
      barCode: '21299758700000020000001121100012100447561740',
      amount: '20.00',
      expirationDate: '2018-07-16',
    });
  });

  it('should return informations from the typed line of a boleto de convênio', () => {
    const result = boletoParser.parseBoletoConvenio(data.validBoletoConvenio);

    expect(result).toEqual({
      barCode: '83630000001718701380012232587561108099288246',
      amount: '171.87',
    });
  });
});

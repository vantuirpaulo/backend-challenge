import request from 'supertest';
import app from '../../src/app';

const data = {
  validBoletoTitulo: '21290001192110001210904475617405975870000002000',
  invalidBoletoTitulo: '21290001152110001210904475617405975870000002000',
  validBoletoConvenio: '836300000012718701380013223258756111080992882466',
  invalidBoletoConvenio: '836300000012718701380013223258756111080992882461',
};

describe('GET /boleto/:code', () => {
  it('should return informations from the typed line of a boleto de titulo', () => {
    return request(app).get(`/boleto/${data.validBoletoTitulo}`).expect(200, {
      barCode: '21299758700000020000001121100012100447561740',
      amount: '20.00',
      expirationDate: '2018-07-16',
    });
  });

  it('should return 400 Bad Request', () => {
    return request(app).get(`/boleto/${data.invalidBoletoTitulo}`).expect(400);
  });

  it('should return informations from the typed line of a boleto de convênio', () => {
    return request(app).get(`/boleto/${data.validBoletoConvenio}`).expect(200, {
      barCode: '83630000001718701380012232587561108099288246',
      amount: '171.87',
    });
  });

  it('should return 400 Bad Request', () => {
    return request(app).get(`/boleto/${data.invalidBoletoConvenio}`).expect(400);
  });
});

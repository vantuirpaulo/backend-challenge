import { Request, Response } from 'express';
import { BadRequest } from '../utils/errors';
import { isValidCodeFormat, isValidCodeLength } from '../utils/boletoValidator';
import * as boletoParser from '../utils/boletoParser';

class BoletoController {
  /**
   * Gets informations from a barcode.
   * @route GET /boleto/:code
   */
  getBarCodeDetails = (req: Request, res: Response) => {
    const code = req.params.code;

    if (!isValidCodeFormat(code))
      throw new BadRequest('O código contém caracteres inválidos');

    if (!isValidCodeLength(code)) throw new BadRequest('Código inválido');

    const data = boletoParser.parse(code);

    return res.status(200).json(data);
  };
}

export default BoletoController;

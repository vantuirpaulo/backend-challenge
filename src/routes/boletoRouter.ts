import { Router } from 'express';

import BoletoController from '../controllers/BoletoController';

const router = Router();
const boletoController = new BoletoController;

router.get('/:code', boletoController.getBarCodeDetails);

export default router;

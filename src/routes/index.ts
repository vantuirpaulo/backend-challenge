import { Router } from 'express';
import boletoRouter from './boletoRouter';

const routes = Router();

routes.use('/boleto', boletoRouter);

export default routes;

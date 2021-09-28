import { ErrorRequestHandler } from 'express';
import { GeneralError } from '../utils/errors';

const handleErrors: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getStatusCode()).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: err.message,
  });
};

export default handleErrors;

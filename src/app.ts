import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';

import handleErrors from './middlewares/handleErrors';
import routes from './routes';

const app = express();

// Allow Cross-Origin requests
app.use(cors())

// Set security http headers
app.use(helmet());

// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Routes
app.use(routes);

// Custom error handling middleware
app.use(handleErrors);

export default app;

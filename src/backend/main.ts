import express from 'express';
import path from 'path';
import api2005 from '@/router/api2005';
import { httpLogger } from '@/module/logger';

const app = express();

app.use(httpLogger);

app.use('/', express.static(path.resolve(__dirname, 'frontend')));

app.use('/api2005', api2005);

export = app;

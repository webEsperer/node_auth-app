'use strict';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares.js/error-middleware.js';
import { authRouter } from './routers/auth-router.js';

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.URL_CLIENT,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(errorMiddleware);

app.all(/.*/, (req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

app.listen(PORT);

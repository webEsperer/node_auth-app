import { Router } from 'express';
import { catchError } from '../utils/catch-error.js';
import { authController } from '../controllers/auth-controller.js';

export const authRouter = new Router();

authRouter.post('/registration', catchError(authController.register));

authRouter.get(
  '/activation/:activationToken',
  catchError(authController.activate),
);

authRouter.post('/login', catchError(authController.login));
authRouter.post('/logout', catchError(authController.logout));
authRouter.post('/refresh', catchError(authController.refresh));

authRouter.post(
  '/password-reset',
  catchError(authController.requestPasswordReset),
);

authRouter.post(
  '/password-reset/:token',
  catchError(authController.resetPassword),
);

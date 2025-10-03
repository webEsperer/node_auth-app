/* eslint-disable handle-callback-err */
export const errorMiddleware = (error, req, res, next) => {
  res.status(500).send({
    message: 'Something went wrong',
  });
};

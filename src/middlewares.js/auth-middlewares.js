export const isAuthenticated = (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  next();
};

export const isNotAuthenticated = (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    return res.status(403).send({ message: 'Already logged in' });
  }
  next();
};

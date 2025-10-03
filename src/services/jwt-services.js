import jwt from 'jsonwebtoken';

export const createAccessToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '5s' });
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

export const creatRefreshToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_REFRESH, { expiresIn: '10s' });
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH);
  } catch (e) {
    return null;
  }
};

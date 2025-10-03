import { Token } from '../models/token.js';

const save = async (userId, refreshToken) => {
  const token = await Token.findOne({
    where: { userId },
  });

  if (token) {
    token.refreshToken = refreshToken;
    await token.save();

    return;
  }

  await Token.create({ userId, refreshToken });
};

const remove = async (userId) => {
  return Token.destroy({ where: { userId } });
};

const getByToken = (refreshToken) => {
  return Token.findOne({ where: { refreshToken } });
};

export const tokenService = {
  save,
  getByToken,
  remove,
};

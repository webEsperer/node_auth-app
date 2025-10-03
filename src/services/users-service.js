import { v4 as uuid4 } from 'uuid';
import { User } from '../models/user.js';
import { ApiError } from '../exceptions.js/api-errors.js';
import modeCrypto from 'crypto';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

export const generateActiveToken = () => {
  return uuid4();
};

export const createUser = async ({ email, password, activationToken }) => {
  const existingUser = User.findOne({ where: { email } });

  if (existingUser !== null) {
    throw ApiError.BadRequest('User already exist', {
      email: 'Email is used by another user',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    email,
    hashedPassword,
    activationToken,
  });
};

export const findUserByActiveToken = (activationToken) => {
  return User.findOne({
    where: { activationToken },
    attributes: ['id', 'email'],
  });
};

export const consumeActivationToken = async (user) => {
  user.activationToken = null;
  await user.save();

  return user;
};

export const findActivatedUser = async (email) => {
  return User.findOne({ where: { email, activationToken: null } });
};

export const compareUserPassword = (incomingPassowrd, user) => {
  return bcrypt.compare(incomingPassowrd, user.password);
};

export const generatePasswordResetToken = async (user) => {
  const token = modeCrypto.randomBytes(32).toString('hex');

  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15);
  await user.save();

  return token;
};

export const findByPasswordResetToken = async (token) => {
  return User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: new Date() },
    },
  });
};

export const resetUserPassword = async (user, newPassword) => {
  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return user;
};

/* eslint-disable no-unused-vars */
import { sequelize } from './utils/db.js';
import { User } from './models/user.js';
import { Token } from './models/token.js';

sequelize.sync({ force: true });

import { sequelize } from './utils/db.js';
// eslint-disable-next-line no-unused-vars
import { User } from './models/user.js';
// import { Token } from "./models/token.js";

sequelize.sync({ force: true });

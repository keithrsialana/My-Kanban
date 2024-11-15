const forceDatabaseRefresh = true;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import { seedUsers } from './seeds/user-seeds.js';
import { seedTickets } from './seeds/ticket-seeds.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(async () => {
  await seedUsers();
  await seedTickets();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

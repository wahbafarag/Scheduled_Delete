/* eslint-disable */

import * as mongoose from 'mongoose';

export const dbConnection = async () => {
  const mongoUri = 'connection-string';

  await mongoose.connect(mongoUri);
  const db = mongoose.connection;
  db.once('open', () => {
    console.log('Database Connected');
  });
  db.on('error', (err) => {
    console.log('Connection Eroor', err);
  });

  return db;
};

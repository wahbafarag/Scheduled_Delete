/* eslint-disable */

import * as mongoose from 'mongoose';

export const dbConnection = async () => {
  const mongoUri =
    'mongodb+srv://wahbafarag01:*********@cluster0.ax9krsb.mongodb.net/';

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

/* eslint-disable */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Connection } from 'mongoose';
import { dbConnection } from '../config/db-connection';
import { productSchema } from './schema/product.schema';

let mongodbConnection: Connection | null = null;
admin.initializeApp();

const getMongodbConnection = async () => {
  if (!mongodbConnection) {
    mongodbConnection = await dbConnection();
  }
  return mongodbConnection;
};

export const changeProductStatus = functions.pubsub
  .schedule('0 0 * * *') // every day at 00:00 or '12 am'
  .timeZone('Etc/UTC')
  .onRun(async (context) => {
    try {
      const connection = await getMongodbConnection();
      const Product = connection.model('Product', productSchema);

      let today = new Date();
      today.setHours(0, 0, 0, 0);

      await Product.updateMany(
        {
          expirationDate: {
            $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            $gte: today,
          },
        },
        { status: 'unavailable' },
      );
    } catch (error) {
      console.log(error);
    }
  });

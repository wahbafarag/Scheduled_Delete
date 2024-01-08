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
      const products = await Product.find({});

      const allProducts = products.map(async (product) => {
        //
        const isExpired =
          new Date(product.expirationDate).getTime() < new Date().getTime();
        //
        if (product.quantity === 0 || isExpired) {
          await Product.updateOne(
            { _id: product._id },
            { status: 'unavailable' },
          );
        }
      });

      //
      await Promise.all(allProducts);
    } catch (error) {
      console.log(error);
    }
  });

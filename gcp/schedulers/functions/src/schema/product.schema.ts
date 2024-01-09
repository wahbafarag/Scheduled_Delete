/* eslint-disable */

import * as mongoose from 'mongoose';

export const PRODUCT_COLLECTION_NAME = 'Products';
export const productSchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    price: { required: true, type: Number },
    description: { required: true, type: String },
    status: { required: true, type: String },
    quantity: { required: true, type: Number },
    expirationDate: { required: true, type: Date },
    owner: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    collection: PRODUCT_COLLECTION_NAME,
  },
);
export const Product = mongoose.model('Product', productSchema);

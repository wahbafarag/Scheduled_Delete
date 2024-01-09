import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { statusEnum } from '../enum/enums';
import { Types } from 'mongoose';
import { USER_COLLECTION_NAME } from '../../user/schema/user.schema';

export const PRODUCT_COLLECTION_NAME = 'Products';

@Schema({
  timestamps: true,
  collection: PRODUCT_COLLECTION_NAME,
})
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, enum: statusEnum })
  status: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Date })
  expirationDate: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: USER_COLLECTION_NAME })
  owner: Types.ObjectId;
}

export const productSchema = SchemaFactory.createForClass(Product);

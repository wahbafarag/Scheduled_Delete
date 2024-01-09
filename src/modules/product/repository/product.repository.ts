import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, PRODUCT_COLLECTION_NAME } from '../schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(PRODUCT_COLLECTION_NAME)
    private readonly model: Model<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    return this.model.create(product);
  }

  async findOne(filters: any): Promise<Product> {
    return this.model.findOne(filters);
  }

  async findOneAndUpdate(filters: any, update: any): Promise<Product> {
    return this.model.findOneAndUpdate(filters, update, { new: true });
  }
}

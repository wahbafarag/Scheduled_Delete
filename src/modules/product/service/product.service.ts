import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../schema/product.schema';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(product: CreateProductDto): Promise<any> {
    return await this.productRepository.create(product);
  }

  async findOne(filter: any): Promise<Product> {
    return await this.productRepository.findOne(filter);
  }

  // to test firebase function when quantity comes to zero
  async reduceQuantity(filter: any): Promise<Product> {
    return await this.productRepository.findOneAndUpdate(filter, {
      $inc: { quantity: -1 },
    });
  }
}

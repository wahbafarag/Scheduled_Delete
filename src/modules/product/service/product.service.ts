import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../schema/product.schema';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { errorCodes } from '../../../utils/error-codes';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(product: CreateProductDto, user: any): Promise<any> {
    return await this.productRepository.create({
      ...product,
      owner: user.userId,
      expirationDate: new Date(
        Date.now() + 1000 * 60 * 60, // 1 hour
      ).toISOString(), // utc
    });
  }

  async findOne(filter: any): Promise<Product> {
    return await this.productRepository.findOne(filter);
  }

  // to test firebase function when quantity comes to zero
  async reduceQuantity(filter: any): Promise<Product> {
    const product = await this.productRepository.findOne(filter);
    if (product.quantity === 0) {
      throw new BadRequestException(errorCodes.productQuantityZero);
    }
    return await this.productRepository.findOneAndUpdate(filter, {
      $inc: { quantity: -1 },
      status: product.quantity === 1 ? 'unavailable' : 'available',
    });
  }
}

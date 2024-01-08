import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { ProductRepository } from './repository/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PRODUCT_COLLECTION_NAME,
  productSchema,
} from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PRODUCT_COLLECTION_NAME,
        schema: productSchema,
      },
    ]),
  ],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}

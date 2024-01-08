import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CurrentUser } from '../../auth/decorator/current-user.dto';
import { AccessGuard } from '../../auth/guards/access.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AccessGuard)
  @Post()
  async create(@Body(ValidationPipe) body: any, @CurrentUser() user: any) {
    return await this.productService.create({
      ...body,
      owner: user.userId,
      expirationDate: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 2,
      ).toISOString(), // utc
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne({ _id: id });
  }

  // test purposes
  @Post('reduce/:id')
  async reduceQuantity(@Param('id') id: string) {
    return await this.productService.reduceQuantity({ _id: id });
  }
}

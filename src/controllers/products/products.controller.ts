import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: number,
  ): string {
    return `products: limit ${limit} & offset ${offset} & brand ${brand}`;
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string): string {
    return `product: ${productId}`;
  }
}

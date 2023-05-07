import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: number,
  ) {
    return {
      message: `products: limit ${limit} & offset ${offset} & brand ${brand}`,
    };
  }

  @Get(':productId')
  getOne(@Param('productId') productId: string): string {
    return `product: ${productId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create product',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: 'update product',
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      message: 'delete product',
      id,
    };
  }
}

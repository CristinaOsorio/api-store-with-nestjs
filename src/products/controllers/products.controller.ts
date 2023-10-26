import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from '@pipes/mongo-id/mongo-id.pipe';

@ApiTags('¨Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: number,
  ): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto): Promise<Product> {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService
      .update(id, payload)
      .then((error) => {
        console.log(error);
        return error;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string): Promise<Product> {
    return this.productsService.delete(id);
  }
}

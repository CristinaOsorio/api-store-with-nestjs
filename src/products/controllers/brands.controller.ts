import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities/brand.entity';
import { BrandsService } from '../services/brands.service';
import { MongoIdPipe } from '@pipes/mongo-id/mongo-id.pipe';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', MongoIdPipe) id: string): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string): Promise<Brand> {
    return this.brandsService.delete(id);
  }
}

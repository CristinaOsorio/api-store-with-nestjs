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
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { Brand } from '../entities/brand.entity';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll(): Brand[] {
    return this.brandsService.findAll();
  }

  @Get(':brandId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('brandId', ParseIntPipe) brandId: number): Brand {
    return this.brandsService.findOne(brandId);
  }

  @Post()
  create(@Body() payload: CreateBrandDto): Brand {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ): Brand {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): boolean {
    return this.brandsService.delete(id);
  }
}

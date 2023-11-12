import { BrandsService } from './brands.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandsService: BrandsService,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const product = this.productRepository.create(payload);

    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      product.brand = brand;
    }

    return this.productRepository.save(product);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      product.brand = brand;
    }

    this.productRepository.merge(product, payload);
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<DeleteResult> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.productRepository.delete(id);
  }
}

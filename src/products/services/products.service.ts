import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
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

  create(payload: CreateProductDto) {
    const product = this.productRepository.create(payload);
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

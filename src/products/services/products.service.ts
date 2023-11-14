import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });

    if (!product) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    if (data.brandId) {
      const brand = await this.brandRepository.findOneBy({ id: data.brandId });
      product.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(data.categoriesIds),
      });
      product.categories = categories;
    }

    return this.productRepository.save(product);
  }

  async update(id: number, payload: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (payload.brandId) {
      const brand = await this.brandRepository.findOneBy({
        id: payload.brandId,
      });
      product.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(payload.categoriesIds),
      });
      product.categories = categories;
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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'lorem lorem',
      price: 12,
      stock: 10,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id == id);

    if (!product) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const product = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(product);

    return product;
  }

  update(id: number, payload: UpdateProductDto) {
    const productIndex = this.searchIndex(id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...payload,
      };
      return this.products[productIndex];
    }

    throw new HttpException(`Product #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: number): boolean {
    const productIndex = this.searchIndex(id);
    if (productIndex === -1) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.products.splice(productIndex, 1);
    return true;
  }

  private searchIndex(id: number): number {
    return this.products.findIndex((product) => product.id === id);
  }
}

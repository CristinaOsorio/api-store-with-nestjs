import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    console.log(product);

    if (!product) {
      throw new HttpException(
        `Product #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const product = new this.productModel(payload);
    return product.save();
  }

  update(id: string, payload: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (product) {
      return product;
    }
    throw new HttpException(`Product #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}

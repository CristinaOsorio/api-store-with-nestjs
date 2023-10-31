import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: any = {};
      const { limit, offset, minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }

      const skipValue = offset >= 0 ? offset * limit : 0;

      return this.productModel
        .find(filters)
        .populate('category')
        .populate('brand')
        .skip(skipValue)
        .limit(limit)
        .exec();
    }
    return this.productModel
      .find()
      .populate('category')
      .populate('brand')
      .exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();

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

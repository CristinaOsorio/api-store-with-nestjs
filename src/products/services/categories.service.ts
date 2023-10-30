import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      throw new HttpException(
        `Category #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const category = new this.categoryModel(payload);
    return category.save();
  }

  update(id: string, payload: UpdateCategoryDto) {
    const category = this.categoryModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (category) {
      return category;
    }
    throw new HttpException(`Category #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  findOne(id: string) {
    const brand = this.brandModel.findById(id).exec();

    if (!brand) {
      throw new HttpException(`Brand #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const brand = new this.brandModel(payload);
    return brand.save();
  }

  update(id: string, payload: UpdateBrandDto) {
    const brand = this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (brand) {
      return brand;
    }
    throw new HttpException(`Brand #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }
}

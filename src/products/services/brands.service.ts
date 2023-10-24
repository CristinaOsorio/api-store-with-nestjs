import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 2;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'brand 1',
      image: '',
    },
    {
      id: 2,
      name: 'brand 2',
      image: '',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((brand) => brand.id == id);

    if (!brand) {
      throw new HttpException(`Brand #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    return brand;
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const brand = {
      id: this.counterId,
      ...payload,
    };

    this.brands.push(brand);

    return brand;
  }

  update(id: number, payload: any) {
    const brandIndex = this.searchIndex(id);
    if (brandIndex !== -1) {
      this.brands[brandIndex] = {
        ...this.brands[brandIndex],
        ...payload,
      };
      return this.brands[brandIndex];
    }

    throw new HttpException(`Brand #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: number): boolean {
    const brandIndex = this.searchIndex(id);
    if (brandIndex === -1) {
      throw new HttpException(`Brand #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    this.brands.splice(brandIndex, 1);

    return true;
  }

  private searchIndex(id: number): number {
    return this.brands.findIndex((brand) => brand.id === id);
  }
}

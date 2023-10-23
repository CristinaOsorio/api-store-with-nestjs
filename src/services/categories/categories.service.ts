import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from '../../entity/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Special Category',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((category) => category.id == id);

    if (!category) {
      throw new HttpException(
        `Category #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const category = {
      id: this.counterId,
      ...payload,
    };

    this.categories.push(category);

    return category;
  }

  update(id: number, payload: any) {
    const categoryIndex = this.searchIndex(id);
    if (categoryIndex !== -1) {
      this.categories[categoryIndex] = {
        ...this.categories[categoryIndex],
        ...payload,
      };
      return this.categories[categoryIndex];
    }

    throw new HttpException(`Category #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: number): boolean {
    const categoryIndex = this.searchIndex(id);
    if (categoryIndex === -1) {
      throw new HttpException(
        `Category #${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.categories.splice(categoryIndex, 1);

    return true;
  }

  private searchIndex(id: number): number {
    return this.categories.findIndex((category) => category.id === id);
  }
}

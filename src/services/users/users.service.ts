import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'example@test.com',
      password: '123456',
      role: 'ADMIN',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);

    if (!user) {
      throw new HttpException(`User #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const user = {
      id: this.counterId,
      ...payload,
    };

    this.users.push(user);

    return user;
  }

  update(id: number, payload: any) {
    const userIndex = this.searchIndex(id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...payload,
      };
      return this.users[userIndex];
    }

    throw new HttpException(`User #${id} not found.`, HttpStatus.NOT_FOUND);
  }

  delete(id: number): boolean {
    const userIndex = this.searchIndex(id);
    if (userIndex === -1) {
      throw new HttpException(`User #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    this.users.splice(userIndex, 1);

    return true;
  }

  private searchIndex(id: number): number {
    return this.users.findIndex((user) => user.id === id);
  }
}

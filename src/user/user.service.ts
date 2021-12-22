import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {getConnection} from "typeorm";

@Injectable()
export class UserService {

  create(createUserDto: CreateUserDto) {
    // TODO verifs
    return getConnection()
        .createQueryBuilder()
        .insert()
        .into('user')
        .values([
          createUserDto
        ])
        .execute();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return getConnection()
        .createQueryBuilder()
        .select('user')
        .where('user.id = :id', { id: id })
        .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

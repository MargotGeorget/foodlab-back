import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {getConnection} from "typeorm";
import {User} from "./entities/user.entity";

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

  findOneById(id: number) {
    return getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.id = :id', { id: id })
        .getOne();
  }

  findOneByEmail(email: string) {
    return getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.email = :email', { email: email })
        .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

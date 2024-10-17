import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, user, userType } from '@prisma/client';


@Injectable()
export class UserService {
  constructor( private readonly prisma: PrismaService){}


  create(createUserDto: CreateUserDto) {
    const userdata : Prisma.userCreateInput = {
      mobile: createUserDto.mobile,
      username: createUserDto?.username,
      email: createUserDto?.email,
      firstName: createUserDto?.firstName,
      lastName: createUserDto?.lastName,
      date_of_birth: createUserDto?.dateOfBirth,
    };

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

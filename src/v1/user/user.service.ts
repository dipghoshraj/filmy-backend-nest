import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, user, userType } from '@prisma/client';
import { RedisService } from 'src/redis/redis.service';
import {UserResponse} from './dto/response/user-resp.dto'
import { randomUUID} from 'crypto'

@Injectable()
export class UserService {
  constructor( 
    private readonly prisma: PrismaService,
    private readonly redis: RedisService

  ){}


  async create(createUserDto: CreateUserDto) {
    const userdata : Prisma.userCreateInput = {
      mobile: createUserDto.mobile,
      username: createUserDto?.username,
      email: createUserDto?.email,
      firstName: createUserDto?.firstName,
      lastName: createUserDto?.lastName,
      date_of_birth: createUserDto?.dateOfBirth,
    };

    const selectObj : Prisma.userSelect = UserResponse.userprofile()
    const userObj : UserResponse=  await this.prisma.user.create({
      data: userdata,
      select: selectObj
    })

    const token : string =  randomUUID()
    this.redis.set(token, `${userObj.id}`,24*3600)
    return {...userObj, token}
  }

  async sendOtp(mobile: string){
    
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

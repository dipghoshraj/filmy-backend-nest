import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {Prisma, user, userType} from '@prisma/client'
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheManagerStore } from 'cache-manager';
import {UserResponse} from './dto/response/user-resp.dto'
import { randomUUID} from 'crypto'

@Injectable()
export class UserService {

  constructor(
    private readonly prismaservice : PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager : CacheManagerStore
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
    const userObj : UserResponse=  await this.prismaservice.user.create({
      data: userdata,
      select: selectObj
    })

    const token : string =  randomUUID()
    this.cacheManager.set(`token-${userObj.id}`, token, 24*3600)
    return {...userObj, token}
  }

  async sendOtp(mobile: string){
    // TODO: msg91 otp send with bullq
    const key : string = `otp-${mobile}`;
    const otp: number = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    this.cacheManager.set(key, otp, 300);
  }

  async verifyOtp(mobile: string, verify_otp: number){

    const key : string = `otp-${mobile}`;
    const otp: number = await this.cacheManager.get(key);
    console.log(otp);

    return otp == verify_otp;
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

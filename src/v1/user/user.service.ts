import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, SendUserDto, ValidateOtpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, user, userType } from '@prisma/client';
import { RedisService } from 'src/redis/redis.service';
import {UserResponse} from './dto/response/user-resp.dto'
import { randomUUID} from 'crypto'
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';


@Injectable()
export class UserService {
  constructor( 
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    @InjectQueue('sendotp') private queue: Queue
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

  async sendOtp(sendUserDto: SendUserDto){
    const mobile = sendUserDto.mobile
    const otp= Math.floor(Math.random() * 1000000)
    const message = encodeURIComponent(`Your otp is ${otp}`)
    this.redis.set(`${mobile}`, otp.toString(), 900)

    return await this.queue.add(
      'process_data',
      { message:  message, mobile: mobile},
      { priority: 1 },
    );
  }

  async verifyOtp(validateDto: ValidateOtpDto){

    const storeotp = await this.redis.get(`${validateDto.mobile}`);
    if (storeotp == validateDto.otp){
      const user = await this.findMobile(validateDto.mobile)
      const ispresent = user ? true : false;
      return {otpvalidate: true, ispresent: user}
    }
    throw new UnauthorizedException();
  }

  async checkExists(mobile: string){
    const user = await this.prisma.user.findFirst({where: {mobile: mobile}})
    return user
  }

  async findMobile(mobile: string){
    const select : Prisma.userSelect = {
      ...UserResponse.userprofile()
    }
    const where : Prisma.userWhereInput = {mobile: mobile}
    const userObj : UserResponse = await this.prisma.user.findFirst({select, where})
    console.log(userObj)
    if(!userObj) return {}  
    // TODO: end all session of the user

    const token : string =  randomUUID()
    this.redis.set(token, `${userObj.id}`,24*3600)
    return {...userObj, token}
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

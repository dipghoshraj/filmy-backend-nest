import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
      date_of_birth: `${createUserDto?.dateOfBirth}T00:00:00Z`,

    };

    const validateotp = this.redis.get(`verify:${createUserDto.mobile}`)
    if (!validateotp) throw new BadRequestException();

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
    this.redis.set(`otp:${mobile}`, otp.toString(), 900)

    const user = await this.findMobile(sendUserDto.mobile)
    const ispresent = Object.keys(user).length == 0 ?  false : true;

    console.log(message);

    if(ispresent){
      const {id, name} = await this.queue.add(
        'process_data',
        { message:  message, mobile: mobile},
        { priority: 1 },
      );
    }

    console.log("ueer is ", user)
    return {ispresent, queued: ispresent}
  }

  async verifyOtp(validateDto: ValidateOtpDto){

    const storeotp = await this.redis.get(`otp:${validateDto.mobile}`);
    if (storeotp == validateDto.otp){
      const user = await this.findMobile(validateDto.mobile)
      const ispresent = user ? true : false;
      this.redis.set(`verify:${validateDto.mobile}`, 'true', 300)
      return {otpvalidate: true, user: user, ispresent: ispresent}
    }
    throw new BadRequestException();
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

  async finduser(identifier : {id?: number, username?: string, email?: string, mobile?: string}) {
    const select : Prisma.userSelect = {
      ...UserResponse.userprofile()
    }
    const where : Prisma.userWhereInput = identifier
    const userObj : UserResponse = await this.prisma.user.findFirst({select, where})
    return userObj
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

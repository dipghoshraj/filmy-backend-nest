import { Injectable } from '@nestjs/common';
import { Prisma, user, Image } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService){}

  getHello(): string {
    return 'Hello World!';
  }
}

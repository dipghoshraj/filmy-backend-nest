import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import {PrismaModule} from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { BullModule } from '@nestjs/bullmq';


@Module({
  imports: [PrismaModule, RedisModule,
    BullModule.registerQueue({
      name: 'sendotp',
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import {PrismaModule} from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { BullModule } from '@nestjs/bull';
import { env } from 'process';


@Module({
  imports: [PrismaModule, RedisModule,
    BullModule.forRoot({
      redis: {
        host: env.REDIS_HOST, // use the service name from docker-compose if its different
        port: 6379,
      }
    }),

    BullModule.registerQueue({
      name: "sendotp",
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

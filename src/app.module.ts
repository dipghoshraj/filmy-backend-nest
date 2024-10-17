import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaModule} from './prisma/prisma.module';
import { UserModule } from './v1/user/user.module';
import { RedisModule } from './redis/redis.module';



@Module({
  imports: [UserModule, PrismaModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

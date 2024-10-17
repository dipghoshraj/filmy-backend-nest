import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaModule} from './prisma/prisma.module';

@Module({
  imports: [],
  controllers: [AppController, PrismaModule],
  providers: [AppService],
})
export class AppModule {}

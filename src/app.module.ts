import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaModule} from './prisma/prisma.module';
import { UserModule } from './v1/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController, PrismaModule],
  providers: [AppService],
})
export class AppModule {}

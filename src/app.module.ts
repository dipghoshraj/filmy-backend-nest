import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './v1/user/user.module';
import { PostModule } from './v1/post/post.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PostModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

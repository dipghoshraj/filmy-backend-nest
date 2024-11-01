import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './v1/user/user.module';
import {OtpProcessor} from './v1/user/user.process'


@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, OtpProcessor],
})
export class AppModule {}

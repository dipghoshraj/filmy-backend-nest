import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('filmy profile')
    .setDescription('The filmy profile API description')
    .setVersion('0.1')
    .addTag('Authentication')
    .addTag('*')
    .addBearerAuth({
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer', 
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

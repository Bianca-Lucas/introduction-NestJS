import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder() 
    .setTitle('API de Usuários')
    .setDescription('Documentação da API de usuários com NestJS + Prisma + Swagger')
    .setVersion('1.0')
    .addTag('users')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // -> Ignora propriedades que não tem no DTO.
      forbidNonWhitelisted: true, // -> Retorna erro se enviar propriedade não permitidas.
      transform: true, // -> Tranforma automaticamente o elemento recebido pelo que esteja fornecido no DTO.
      
    })
  )

  await app.listen(3000);
}

bootstrap();
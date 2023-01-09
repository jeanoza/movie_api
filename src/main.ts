import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //it will delete object which has no validate decorator
      forbidNonWhitelisted: true, // it will add msg in response(ex: Property XX should not exist)
      transform: true, // convert type which i wanna use(by default all request param is string)
    }),
  );
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe — automatically validates all incoming requests
  // against their DTOs before they reach the controller
  // whitelist: true strips any properties not defined in the DTO
  // forbidNonWhitelisted: true rejects requests with unknown properties entirely
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS — allows frontend apps to talk to this API
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Idyables API is running on http://localhost:${port}`);
}

bootstrap();
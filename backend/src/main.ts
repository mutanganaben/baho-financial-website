import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global API route prefix: /api/v1
  app.setGlobalPrefix('api/v1');

  // Enable CORS for frontend cross-origin requests
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Enable global request validation & sanitization pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(
    `🚀 BAHO Backend API is running on http://localhost:${port}/api/v1`,
  );
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start NestJS server:', err);
  process.exit(1);
});

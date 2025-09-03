import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3002',
    credentials: true,
  });

  app.use(cookieParser(process.env.JWT_SECRET)); // imzalı cookie opsiyonel ama sorun değil

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true 
  }));

  await app.listen(3001);
  console.log('🚀 API server running on port 3001');
}
bootstrap();

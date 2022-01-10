import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
          origin: true,
          preflightContinue: false
      }});

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      skipMissingProperties: false,
    }),
  );

  await app.listen(process.env.port || 3000);
}
bootstrap();

import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.select(ConfigModule).get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      // transform: true,
      // dismissDefaultMessages: true,
      // exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  //TODO 封装获取方法
  const ENABLE_DOCUMENTATION = configService.get<string>(
    'ENABLE_DOCUMENTATION',
  );
  if (ENABLE_DOCUMENTATION) {
    setupSwagger(app);
  }

  await app.listen(3000);
}
bootstrap();

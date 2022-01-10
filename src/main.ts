import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import helmet from 'helmet';
import csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './setup-swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enable('trust proxy');

  app.enableCors();

  app.use(helmet());

  // app.use(csurf());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.use(compression());

  app.use(morgan('combined'));

  // app.useGlobalGuards();

  app
    .useGlobalInterceptors
    // new TransformInterceptor(),
    // new LoggingInterceptor(),
    ();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      // transform: true,
      // dismissDefaultMessages: true,
      // exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  // app.useGlobalFilters();

  const configService = app.select(ConfigModule).get(ConfigService);

  const ENABLE_DOCUMENTATION = configService.get<string>(
    'ENABLE_DOCUMENTATION',
  );
  if (ENABLE_DOCUMENTATION) {
    setupSwagger(app);
  }

  await app.listen(3000);
}
bootstrap();

import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
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

  //序列化支持
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    // new TransformInterceptor(),
    // new LoggingInterceptor(),
    // 序列化(Serialization)是一个在网络响应中返回对象前的过程。 这是一个适合转换和净化要返回给客户的数据的地方。
    new ClassSerializerInterceptor(reflector),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      // exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      // dismissDefaultMessages: true,
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

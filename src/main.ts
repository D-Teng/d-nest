import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { UnprocessableEntityFilter } from './filters/unprocessableEntity-entity.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  // A Transactional Method Decorator for typeorm that uses cls-hooked to handle and propagate transactions between different repositories and service methods.
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.setGlobalPrefix('api');

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
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      dismissDefaultMessages: true,
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new UnprocessableEntityFilter(reflector),
    new QueryFailedFilter(reflector),
  );

  const configService = app.select(ConfigModule).get(ConfigService);

  const ENABLE_DOCUMENTATION = configService.get<string>(
    'ENABLE_DOCUMENTATION',
  );
  if (ENABLE_DOCUMENTATION) {
    setupSwagger(app);
  }
  const port = configService.get<number>('APP_PORT');
  await app.listen(port);
  console.info(`app listening at: http://localhost:${port}`);
}
bootstrap();

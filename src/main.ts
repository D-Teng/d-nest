import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
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

  const configService = app.get(ConfigService);

  const port = configService.get<number>('APP_PORT');

  const ENABLE_DOCUMENTATION = configService.get<string>(
    'ENABLE_DOCUMENTATION',
  );
  if (ENABLE_DOCUMENTATION) {
    setupSwagger(app, port);
  }
  await app.listen(port);
  console.info(`app listening at: http://localhost:${port}`);
}
bootstrap();

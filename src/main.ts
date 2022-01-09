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
// import { RolesGuard } from './guards/roles.guard';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.select(ConfigModule).get(ConfigService);

  // 全局守卫 这种方式注册不能插入依赖项
  // app.useGlobalGuards(new RolesGuard());

  app.useGlobalInterceptors(
    // new TransformInterceptor(),
    new LoggingInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
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

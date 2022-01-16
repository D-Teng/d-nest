import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, port: number) {
  const options = new DocumentBuilder()
    .setTitle('API')
    .addBearerAuth()
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  console.info(`swagger listen at: http://localhost:${port}/api`);
}

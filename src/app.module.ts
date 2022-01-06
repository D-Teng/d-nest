import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    //TODO 使用ConfigService代替.env
    ConfigModule.forRoot({
      // isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.development.env' : '.env',
    }),
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}

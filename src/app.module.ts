import { Module } from '@nestjs/common';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    SharedModule,
    ArticleModule,
    AuthModule,
    CategoryModule,
    UserModule,
  ],
})
export class AppModule {}

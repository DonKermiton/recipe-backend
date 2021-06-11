import { RecipesEntity } from './recipes/entities/recipes.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RefreshTokenEntity } from './auth/entities/refresh-token.entity';
import { UserEntity } from './user/entities/user.entity';
import { ErrorHandlingInterceptor } from './core/interceptor/error-handler.interceptor';
import { RecipesModule } from './recipes/recipes.module';


const ormConfigJson: TypeOrmModuleOptions = require("../ormconfig.json")

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      ...ormConfigJson,
      keepConnectionAlive: true,
      entities: [
        RefreshTokenEntity,
        UserEntity,
        RecipesEntity
      ]
    }),
    AuthModule,
    UserModule,
    RecipesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

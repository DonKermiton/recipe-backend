import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { UserModule } from '../user/user.module';
import { TokenService } from './services/token.service';
import { JWTGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt-strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_USER')
        }
      })
    }),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JWTGuard, JwtStrategy]
})
export class AuthModule {
}

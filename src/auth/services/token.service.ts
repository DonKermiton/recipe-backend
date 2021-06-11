import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '../../user/models/User.model';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { RefreshTokenPayload } from '../models/Refresh-token.payload';
import { UserService } from '../../user/services/user.service';

const BASE_OPTIONS: SignOptions = {
  issuer: 'http://localhost:4200',
  audience: 'http://localhost:4200'
};

@Injectable()
export class TokenService {

  constructor(private readonly _jwtService: JwtService,
              @InjectRepository(RefreshTokenEntity)
              private readonly _refreshTokenRepository: Repository<RefreshTokenEntity>,
              private readonly _userService: UserService
  ) {
  }

  public async generateAccessToken(user: UserModel): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: `${user.id}`
    };

    return this._jwtService.signAsync({ user }, opts);
  }

  public async generateRefreshToken(user: UserModel, expiresIn: number = 60 * 60)
    : Promise<string> {
    const token = await this.createRefreshToken(user);

    const opts: SignOptions = {
      ...BASE_OPTIONS,
      expiresIn,
      subject: `${user.id}`,
      jwtid: `${token.id}`
    };

    return this._jwtService.signAsync({}, opts);
  }

  public async createAccessTokenFromRefreshToken(refresh: string)
    : Promise<{ token: string, user: UserModel, refreshToken: string }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);
    const newRefreshToken = await this.generateRefreshToken(user)

    return { user, token, refreshToken: newRefreshToken };
  }

  public async resolveRefreshToken(encoded: string)
    : Promise<{ user: UserModel, token: RefreshTokenEntity }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new HttpException('Refresh token not found', HttpStatus.FORBIDDEN);
    }

    if (token.is_revoked) {
      throw new HttpException('Refresh token revoked', HttpStatus.FORBIDDEN);
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new HttpException('Refresh token malformed', HttpStatus.FORBIDDEN);
    }

    return { user, token };
  }

  public async findRefreshTokenById(id: number)
    : Promise<RefreshTokenEntity | null> {
    return this._refreshTokenRepository.findOne({
      where: {
        id: id
      }
    });
  }

  private async getUserFromRefreshTokenPayload(payload: RefreshTokenPayload)
    : Promise<UserModel> {
    const subId = payload.sub;

    if (!subId) {
      throw new HttpException('Refresh Token Malformed', HttpStatus.FORBIDDEN);
    }

    return this._userService.findUserById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(payload)
    : Promise<RefreshTokenEntity | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new HttpException('Refresh token malformed', HttpStatus.FORBIDDEN);
    }

    return this.findRefreshTokenById(tokenId);
  }

  private async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      return this._jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new HttpException('Refresh token Expired', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException('Refresh token Malformed', HttpStatus.UNAUTHORIZED);
      }
    }
  }

  private async createRefreshToken(user: UserModel)
    : Promise<RefreshTokenEntity> {
    const token = new RefreshTokenEntity();

    token.userId = user.id;
    token.is_revoked = false;

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1 );

    token.expires = expiration;

    console.log(expiration);

    return this._refreshTokenRepository.save(token);
  }

}

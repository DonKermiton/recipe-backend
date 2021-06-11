import { UserService } from './../../user/services/user.service';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;

    const user = await this._userService.findUserById(id);

    if (!user) {
      return null;
    }

    return user;
  }
}

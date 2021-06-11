import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { TokenService } from '../services/token.service';
import { RefreshRequest } from '../request';
import { JWTGuard } from '../guards/jwt.guard';

@Controller('/api/auth')
export class AuthController {

  constructor(private readonly _authService: AuthService,
              private readonly _userService: UserService,
              private readonly _tokenService: TokenService) {

  }

  @Post('/register')
  public async register(@Body() body: any) {
    return this._authService.createAccount(body);
  }

  @Post('/login')
  public async login(@Body() body: any) {
    const { email, password } = body;

    const user = await this._userService.findUserByEmailWithPassword(email);
    const validate = user ? await this._authService.validateCredentials(user, password) : false;

    if (!validate) {
      throw new HttpException('The login is invalid', HttpStatus.FORBIDDEN);
    }

    const token = await this._tokenService.generateAccessToken(user);
    // refresh token can be activated in 1 hour
    const refresh = await this._tokenService.generateRefreshToken(user, 60 * 60);

    return this._authService.buildResponsePayload(token, refresh);
  }

  @Post('/refresh')
  public async refresh(@Body() body: RefreshRequest) {
    const {
      token,
      refreshToken
    } = await this._tokenService.createAccessTokenFromRefreshToken(body.refresh_token);

    return this._authService.buildResponsePayload(token, refreshToken);
  }

}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { UserService } from '../../user/services/user.service';
import { UserModel } from '../../user/models/User.model';
import { AuthenticationPayload } from '../models/token.model';
import { compare } from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private readonly _jwtService: JwtService,
              private readonly _tokenService: TokenService,
              private readonly _userService: UserService) {
  }

  createAccount(request: {email: string, password: string}): any {
    this._userService.createUserFromRequest({email: request.email, password: request.password}).then(console.log)
  }

  login(request: {email: string, password: string}): any {

  }

  public async validateCredentials(user: UserModel, password: string): Promise<boolean> {
    return compare(password, user.password);
  }

  public buildResponsePayload(accessToken: string, refreshToken?: string)
    : AuthenticationPayload {
      return {
        payload: {
          type: 'bearer',
          token: accessToken,
          ...(refreshToken ? { refresh_token: refreshToken } : {})
        }
      }
  }

}

import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { UserService } from '../../user/services/user.service';
import { UserModel } from '../../user/models/User.model';
import { AuthenticationPayload } from '../models/token.model';
export declare class AuthService {
    private readonly _jwtService;
    private readonly _tokenService;
    private readonly _userService;
    constructor(_jwtService: JwtService, _tokenService: TokenService, _userService: UserService);
    createAccount(request: {
        email: string;
        password: string;
    }): any;
    login(request: {
        email: string;
        password: string;
    }): any;
    validateCredentials(user: UserModel, password: string): Promise<boolean>;
    buildResponsePayload(accessToken: string, refreshToken?: string): AuthenticationPayload;
}

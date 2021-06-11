import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { TokenService } from '../services/token.service';
import { RefreshRequest } from '../request';
export declare class AuthController {
    private readonly _authService;
    private readonly _userService;
    private readonly _tokenService;
    constructor(_authService: AuthService, _userService: UserService, _tokenService: TokenService);
    register(body: any): Promise<any>;
    login(body: any): Promise<import("../models/token.model").AuthenticationPayload>;
    refresh(body: RefreshRequest): Promise<import("../models/token.model").AuthenticationPayload>;
}

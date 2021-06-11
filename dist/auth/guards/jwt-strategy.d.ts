import { UserService } from './../../user/services/user.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _configService;
    private readonly _userService;
    constructor(_configService: ConfigService, _userService: UserService);
    validate(payload: any): Promise<import("../../user/models/User.model").UserModel>;
}
export {};

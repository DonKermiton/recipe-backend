import { UserService } from './../services/user.service';
export declare class UserController {
    private readonly _userService;
    constructor(_userService: UserService);
    getMe(request: any): Promise<import("../models/User.model").UserModel>;
}

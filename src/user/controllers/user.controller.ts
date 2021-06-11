import { UserService } from './../services/user.service';
import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JWTGuard } from 'src/auth/guards/jwt.guard';

@Controller('/api/user')
export class UserController {
    constructor(private readonly _userService: UserService) {

    }

    @Get('/me')
    @UseGuards(JWTGuard)
    public async getMe(@Req() request) {
        const userId = request.user.id;
        
        const user = await this._userService.findUserById(userId);

        return user;
    }
}
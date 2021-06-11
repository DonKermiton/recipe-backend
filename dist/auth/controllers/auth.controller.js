"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../../user/services/user.service");
const token_service_1 = require("../services/token.service");
let AuthController = class AuthController {
    constructor(_authService, _userService, _tokenService) {
        this._authService = _authService;
        this._userService = _userService;
        this._tokenService = _tokenService;
    }
    async register(body) {
        return this._authService.createAccount(body);
    }
    async login(body) {
        const { email, password } = body;
        const user = await this._userService.findUserByEmailWithPassword(email);
        const validate = user ? await this._authService.validateCredentials(user, password) : false;
        if (!validate) {
            throw new common_1.HttpException('The login is invalid', common_1.HttpStatus.FORBIDDEN);
        }
        const token = await this._tokenService.generateAccessToken(user);
        const refresh = await this._tokenService.generateRefreshToken(user, 60 * 60);
        return this._authService.buildResponsePayload(token, refresh);
    }
    async refresh(body) {
        const { token, refreshToken } = await this._tokenService.createAccessTokenFromRefreshToken(body.refresh_token);
        return this._authService.buildResponsePayload(token, refreshToken);
    }
};
__decorate([
    common_1.Post('/register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('/refresh'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    common_1.Controller('/api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        token_service_1.TokenService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const token_service_1 = require("./token.service");
const user_service_1 = require("../../user/services/user.service");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(_jwtService, _tokenService, _userService) {
        this._jwtService = _jwtService;
        this._tokenService = _tokenService;
        this._userService = _userService;
    }
    createAccount(request) {
        this._userService.createUserFromRequest({ email: request.email, password: request.password }).then(console.log);
    }
    login(request) {
    }
    async validateCredentials(user, password) {
        return bcrypt_1.compare(password, user.password);
    }
    buildResponsePayload(accessToken, refreshToken) {
        return {
            payload: Object.assign({ type: 'bearer', token: accessToken }, (refreshToken ? { refresh_token: refreshToken } : {}))
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        token_service_1.TokenService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTGuard = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JWTGuard = class JWTGuard extends passport_1.AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if (err || info || !user) {
            if (info instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new common_1.HttpException(info.message, common_1.HttpStatus.UNAUTHORIZED);
            }
            if (!user) {
                throw new common_1.HttpException("User not exists", common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.HttpException(info.message || err, common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
};
JWTGuard = __decorate([
    common_1.Injectable()
], JWTGuard);
exports.JWTGuard = JWTGuard;
//# sourceMappingURL=jwt.guard.js.map
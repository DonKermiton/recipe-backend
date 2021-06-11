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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const refresh_token_entity_1 = require("../entities/refresh-token.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../../user/services/user.service");
const BASE_OPTIONS = {
    issuer: 'http://localhost:4200',
    audience: 'http://localhost:4200'
};
let TokenService = class TokenService {
    constructor(_jwtService, _refreshTokenRepository, _userService) {
        this._jwtService = _jwtService;
        this._refreshTokenRepository = _refreshTokenRepository;
        this._userService = _userService;
    }
    async generateAccessToken(user) {
        const opts = Object.assign(Object.assign({}, BASE_OPTIONS), { subject: `${user.id}` });
        return this._jwtService.signAsync({ user }, opts);
    }
    async generateRefreshToken(user, expiresIn = 60 * 60) {
        const token = await this.createRefreshToken(user);
        const opts = Object.assign(Object.assign({}, BASE_OPTIONS), { expiresIn, subject: `${user.id}`, jwtid: `${token.id}` });
        return this._jwtService.signAsync({}, opts);
    }
    async createAccessTokenFromRefreshToken(refresh) {
        const { user } = await this.resolveRefreshToken(refresh);
        const token = await this.generateAccessToken(user);
        const newRefreshToken = await this.generateRefreshToken(user);
        return { user, token, refreshToken: newRefreshToken };
    }
    async resolveRefreshToken(encoded) {
        const payload = await this.decodeRefreshToken(encoded);
        const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
        if (!token) {
            throw new common_1.HttpException('Refresh token not found', common_1.HttpStatus.FORBIDDEN);
        }
        if (token.is_revoked) {
            throw new common_1.HttpException('Refresh token revoked', common_1.HttpStatus.FORBIDDEN);
        }
        const user = await this.getUserFromRefreshTokenPayload(payload);
        if (!user) {
            throw new common_1.HttpException('Refresh token malformed', common_1.HttpStatus.FORBIDDEN);
        }
        return { user, token };
    }
    async findRefreshTokenById(id) {
        return this._refreshTokenRepository.findOne({
            where: {
                id: id
            }
        });
    }
    async getUserFromRefreshTokenPayload(payload) {
        const subId = payload.sub;
        if (!subId) {
            throw new common_1.HttpException('Refresh Token Malformed', common_1.HttpStatus.FORBIDDEN);
        }
        return this._userService.findUserById(subId);
    }
    async getStoredTokenFromRefreshTokenPayload(payload) {
        const tokenId = payload.jti;
        if (!tokenId) {
            throw new common_1.HttpException('Refresh token malformed', common_1.HttpStatus.FORBIDDEN);
        }
        return this.findRefreshTokenById(tokenId);
    }
    async decodeRefreshToken(token) {
        try {
            return this._jwtService.verifyAsync(token);
        }
        catch (e) {
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new common_1.HttpException('Refresh token Expired', common_1.HttpStatus.UNAUTHORIZED);
            }
            else {
                throw new common_1.HttpException('Refresh token Malformed', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
    }
    async createRefreshToken(user) {
        const token = new refresh_token_entity_1.RefreshTokenEntity();
        token.userId = user.id;
        token.is_revoked = false;
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        token.expires = expiration;
        console.log(expiration);
        return this._refreshTokenRepository.save(token);
    }
};
TokenService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(refresh_token_entity_1.RefreshTokenEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        user_service_1.UserService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_service_1 = require("./services/auth.service");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const user_module_1 = require("../user/user.module");
const token_service_1 = require("./services/token.service");
const jwt_guard_1 = require("./guards/jwt.guard");
const jwt_strategy_1 = require("./guards/jwt-strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_USER')
                    }
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([refresh_token_entity_1.RefreshTokenEntity]),
            user_module_1.UserModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, token_service_1.TokenService, jwt_guard_1.JWTGuard, jwt_strategy_1.JwtStrategy]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
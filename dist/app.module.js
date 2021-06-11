"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const recipes_entity_1 = require("./recipes/entities/recipes.entity");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const refresh_token_entity_1 = require("./auth/entities/refresh-token.entity");
const user_entity_1 = require("./user/entities/user.entity");
const recipes_module_1 = require("./recipes/recipes.module");
const ormConfigJson = require("../ormconfig.json");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({}, ormConfigJson), { keepConnectionAlive: true, entities: [
                    refresh_token_entity_1.RefreshTokenEntity,
                    user_entity_1.UserEntity,
                    recipes_entity_1.RecipesEntity
                ] })),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            recipes_module_1.RecipesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
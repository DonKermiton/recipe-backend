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
exports.RecipesEntity = void 0;
const typeorm_1 = require("typeorm");
const User_model_1 = require("../../user/models/User.model");
let RecipesEntity = class RecipesEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RecipesEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RecipesEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RecipesEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' }),
    __metadata("design:type", Object)
], RecipesEntity.prototype, "ingredients", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' }),
    __metadata("design:type", Object)
], RecipesEntity.prototype, "steps", void 0);
RecipesEntity = __decorate([
    typeorm_1.Entity('recipes')
], RecipesEntity);
exports.RecipesEntity = RecipesEntity;
//# sourceMappingURL=recipes.entity.js.map
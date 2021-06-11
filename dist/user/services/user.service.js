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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const User_model_1 = require("../models/User.model");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async findUserByLastname(lastName) {
        return this._userRepository.findOne({
            where: {
                lastName: lastName
            }
        });
    }
    async findUserByEmail(email) {
        return this._userRepository.findOne({
            where: {
                email: email
            }
        });
    }
    async findUserByEmailWithPassword(email) {
        return this._userRepository.findOne({
            select: [
                'dateBirth',
                'email',
                'firstName',
                'id',
                'lastName',
                'password',
                'profileImage',
                'Role'
            ],
            where: {
                email
            }
        });
    }
    async createUserFromRequest(registerForm) {
        const emailExists = await this.findUserByEmail(registerForm.email);
        if (emailExists) {
            throw new common_1.HttpException('User with provided email already exists', common_1.HttpStatus.CONFLICT);
        }
        return this.register(registerForm);
    }
    async register(registerForm) {
        const user = {
            Role: User_model_1.UserRolesEnum.USER,
            email: registerForm.email,
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            dateBirth: new Date(),
            password: await bcrypt_1.hash(registerForm.password, 10)
        };
        return this._userRepository.save(user);
    }
    async findUserById(id) {
        return this._userRepository.findOne({
            where: {
                id: id
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
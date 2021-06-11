import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserModel } from '../models/User.model';
export declare class UserService {
    private readonly _userRepository;
    constructor(_userRepository: Repository<UserEntity>);
    findUserByLastname(lastName: string): Promise<UserModel | null>;
    findUserByEmail(email: string): Promise<UserModel | null>;
    findUserByEmailWithPassword(email: string): Promise<UserModel | null>;
    createUserFromRequest(registerForm: any): Promise<UserModel>;
    register(registerForm: any): Promise<UserModel>;
    findUserById(id: number): Promise<UserModel>;
}

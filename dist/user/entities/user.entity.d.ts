import { UserRolesEnum } from '../models/User.model';
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateBirth: Date;
    profileImage: string;
    Role: UserRolesEnum;
}

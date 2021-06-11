export interface UserModel {
    id?: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    profileImage?: string;
    dateBirth?: Date;
    Role?: UserRolesEnum;
}
export declare enum UserRolesEnum {
    ADMIN = "admin",
    MODERATOR = "moderator",
    USER = "user"
}

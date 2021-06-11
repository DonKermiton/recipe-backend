import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserModel, UserRolesEnum } from '../models/User.model';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>
  ) {
  }

  async findUserByLastname(lastName: string): Promise<UserModel | null> {
    return this._userRepository.findOne({
      where: {
        lastName: lastName
      }
    });
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    return this._userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async findUserByEmailWithPassword(email: string): Promise<UserModel | null> {
    return this._userRepository.findOne({
      select: [
        'dateBirth',
        'email',
        'firstName',
        'id',
        'lastName',
        'password',
        'profileImage',
        'Role'],
      where: {
        email
      }
    });
  }

  public async createUserFromRequest(registerForm): Promise<UserModel> {
    const emailExists = await this.findUserByEmail(registerForm.email);

    if (emailExists) {
      throw new HttpException('User with provided email already exists', HttpStatus.CONFLICT)
    }

    return this.register(registerForm);
  }

  public async register(registerForm): Promise<UserModel> {
    // TODO: basic implementation
    const user: UserModel = {
      Role: UserRolesEnum.USER,
      email: registerForm.email,
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      dateBirth: new Date(),
      password: await hash(registerForm.password, 10)
    };

    return this._userRepository.save(user);
  }

  async findUserById(id: number): Promise<UserModel> {
    return this._userRepository.findOne({
      where: {
        id: id
      }
    });
  }

}

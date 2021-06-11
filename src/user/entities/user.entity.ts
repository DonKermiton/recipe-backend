import { RecipesEntity } from 'src/recipes/entities/recipes.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRolesEnum } from '../models/User.model';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({select: false})
  password: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({nullable: true})
  dateBirth: Date;

  @Column({nullable: true})
  profileImage: string;

  @Column({type: 'enum', enum: UserRolesEnum, default: UserRolesEnum.USER})
  Role: UserRolesEnum;

  

}

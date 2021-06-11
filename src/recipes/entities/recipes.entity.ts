import {
    UserEntity
} from './../../user/entities/user.entity';

import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { type } from 'os';
import { UserModel } from 'src/user/models/User.model';

@Entity('recipes')
export class RecipesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: 'json'})
    ingredients: {count: number, name: string};

    @Column({type: 'json'})
    steps: {step: number, name: string, description: string};



}
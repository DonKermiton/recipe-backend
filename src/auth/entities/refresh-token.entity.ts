import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh-tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({default: false})
  is_revoked: boolean;

  @Column()
  expires: Date;


}

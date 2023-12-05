import { StatusEnum } from '@root/common/enums/status.enum';
import { RoleEnum } from '@root/config/enum/role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('IDX_UNIQUE_USERNAME')
  @Column({
    type: 'nvarchar',
    unique: true,
    length: 127,
    nullable: true,
    name: 'username',
  })
  username: string;

  @Index('IDX_UNIQUE_EMAIL')
  @Column({ type: 'nvarchar', nullable: false })
  email: string;

  @Column({ type: 'nvarchar', nullable: false })
  password: string;

  @Column({
    type: 'nvarchar',
    default: RoleEnum.USER,
    nullable: true,
    name: 'role',
  })
  role: RoleEnum;

  @Column({ default: null })
  refreshToken: string | null;

  @Column({ default: null })
  token: string | null;

  @Column({ default: true })
  status: StatusEnum;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

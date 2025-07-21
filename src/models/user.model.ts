import { Table, Column, Model, DataType, IsEmail, Unique, Default } from 'sequelize-typescript';
import { UserRole, UserStatus } from '../types/user.types';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  fullName!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  birthDate!: Date;

  @IsEmail
  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Default(UserRole.USER)
  @Column({ type: DataType.ENUM(...Object.values(UserRole)), allowNull: false })
  role!: UserRole;

  @Default(UserStatus.ACTIVE)
  @Column({ type: DataType.ENUM(...Object.values(UserStatus)), allowNull: false })
  status!: UserStatus;
}

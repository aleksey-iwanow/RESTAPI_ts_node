import { UserRole, UserStatus } from "../types/user.types";

export interface UserResponseDto {
  id: number;
  fullName: string;
  birthDate: Date;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserStatusDto {
  status: UserStatus;
}
import { UserRole, UserStatus } from "../types/user.types";

export interface LoginDto{
    email: string;
    password: string;
}

export interface RegisterDto {
    fullName: string;
    birthDate: Date;
    email: string;
    password: string;
    role?: UserRole;
    status?: UserStatus
}

export interface TokenPayloadDto {
  id: number;
  email: string;
  role: UserRole;
}
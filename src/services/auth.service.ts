import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';
import { UserRole, UserStatus } from "../types/user.types";
import { LoginDto, RegisterDto, TokenPayloadDto } from "../dto/auth.dto";
import jwt from 'jsonwebtoken';

export default class AuthService {
    async register(regData: RegisterDto): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(regData.password, 10);
            if (regData.role != UserRole.ADMIN)
                regData.role = UserRole.USER;
            if (regData.status != UserStatus.BLOCKED)
                regData.status = UserStatus.ACTIVE;
            
            return await User.create({
                ...regData,
                password: hashedPassword
            });
        } catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Email already exists');
            }
            throw error;
        }
    }

    async login(loginData: LoginDto): Promise<{ token: string; user: User }> {
        const user = await User.findOne({ where: { email: loginData.email }});
        if (!user) throw new Error('Invalid credentials');

        const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);
        if (!isPasswordMatching) throw new Error('Invalid credentials');

        if (user.status !== UserStatus.ACTIVE) throw new Error('User is blocked');

        const token = this.createToken(user);
        return { token, user };
    }

    private createToken(user: User): string {
        const payload: TokenPayloadDto = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        return jwt.sign(payload, process.env.JWT_SECRET || '01010101');
    }
}
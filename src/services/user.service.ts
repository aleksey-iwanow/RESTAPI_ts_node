import { UpdateUserStatusDto } from "../dto/user.dto";
import { User } from "../models/user.model";
import { UserRole } from "../types/user.types";

export default class UserService {
    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async findById(id: number, currentUserId: number | undefined, currentUserRole: string | undefined): Promise<User> {
        const user = await User.findByPk(id);

        return this.getUserWithCheck(user, currentUserId, currentUserRole);
    }

    async updateStatus(id: number, statusData: UpdateUserStatusDto, currentUserId: number | undefined, currentUserRole: string | undefined): Promise<User> {
        const user = await User.findByPk(id);

        return this.getUserWithCheck(user, currentUserId, currentUserRole, async user => {
            user.status = statusData.status;
            await user.save();
        });

    }

    private getUserWithCheck(
        user: User | null,
        currentUserId: number | undefined,
        currentUserRole: string | undefined,
        method?: ((user: User) => void
        )) {
        
        if (!user) throw new Error('User not found');

        if (currentUserRole !== UserRole.ADMIN && currentUserId !== user.id) {
            throw new Error('Access denied');
        }
        method?.(user);
        return user;
    }
}
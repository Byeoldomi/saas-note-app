import { User } from './user.entity';

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    updateTier(userId: string, isPro: boolean): Promise<void>;
}

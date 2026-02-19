import { IAuthRepository } from '../../../domain/repositories/auth-repository.interface';
import { User } from '../../../domain/entities/user';

export class SignInUseCase {
    constructor(private authRepository: IAuthRepository) { }

    async execute(email: string, password: string): Promise<User> {
        return this.authRepository.signIn(email, password);
    }
}

import { IAuthRepository } from '../../../domain/repositories/auth-repository.interface';

export class SignOutUseCase {
    constructor(private authRepository: IAuthRepository) { }

    async execute(): Promise<void> {
        return this.authRepository.signOut();
    }
}

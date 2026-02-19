import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInUseCase } from '../../application/use-cases/auth/signin-use-case';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase-auth-repository';

export const useSignInViewModel = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // DI
    const authRepository = new SupabaseAuthRepository();
    const signInUseCase = new SignInUseCase(authRepository);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await signInUseCase.execute(email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || '로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        handleSignIn,
    };
};

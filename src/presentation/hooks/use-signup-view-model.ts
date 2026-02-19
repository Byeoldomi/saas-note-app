import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignUpUseCase } from '../../application/use-cases/auth/signup-use-case';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/supabase-auth-repository';

export const useSignUpViewModel = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    // DI
    const authRepository = new SupabaseAuthRepository();
    const signUpUseCase = new SignUpUseCase(authRepository);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await signUpUseCase.execute(email, password);
            setSuccess(true);
            // Optional: auto-login or redirect to login
            // router.push('/login');
        } catch (err: any) {
            setError(err.message || '회원가입 중 오류가 발생했습니다.');
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
        success,
        handleSignUp,
    };
};

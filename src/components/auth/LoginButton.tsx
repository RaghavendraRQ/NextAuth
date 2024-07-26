'use client';

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect',
    asChild?: boolean;
};

const LoginButtonComponent = ({children, mode='redirect', asChild}: LoginButtonProps) => {
    const router = useRouter();
    const handleClick = () => {
        // console.log('Login Button');
        router.push('/login')
    }
    if (mode === 'modal' ) {
        console.log('TODO: Implement Modal');
        
    }
    return (
        <span className="cursor-pointer" onClick={handleClick}>
            {children}
        </span>
    )
}

export default LoginButtonComponent
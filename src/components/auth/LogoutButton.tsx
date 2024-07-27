'use client';

import { logout } from "@/actions/logout";
interface LoginButtonProps {
    children: React.ReactNode;

};
const LogoutButtonComponent = ({children}: LoginButtonProps) => {
    const handleClick = () => {
        logout()
    }
    return (
        <span className="cursor-pointer" onClick={handleClick}>
            {children}
        </span>
    )
}

export default LogoutButtonComponent
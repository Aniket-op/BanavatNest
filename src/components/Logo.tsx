'use client';

import Image from 'next/image';

interface LogoProps {
    className?: string;
    white?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-16" }) => {
    return (
        <img
            src="/images/logo2.jpg"
            alt="BanavatNest Logo"
            className={`object-contain ${className}`}
        />
    );
};

export default Logo;

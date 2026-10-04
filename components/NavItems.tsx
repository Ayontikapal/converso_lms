"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    {
        label: 'Home', href: '/home'
    },
    {
        label: 'Companions', href: '/companions'
    },
    {
        label: 'My Journey', href: '/my-journey'
    },
]

const NavItems = () => {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/home') return pathname === '/home';
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <nav className="flex items-center gap-4 max-sm:hidden">
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        'transition-colors hover:text-primary',
                        isActive(href) ? 'text-primary font-bold underline decoration-2 underline-offset-4' : 'text-neutral-700 font-medium'
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default NavItems;

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { cn } from '@/lib/utils'

interface INavLinkProps {
    label: string
    href: string
    className?: string
    activeClassName?: string
    inactiveClassName?: string
}

const NavLinks: FC<INavLinkProps> = ({
    label,
    href,
    className,
    activeClassName,
    inactiveClassName,
}) => {
    const route: string = usePathname()
    const isActive = href === '/' ? route === '/' : route.includes(href)

    return (
        <Link
            href={href}
            className={cn(
                className,
                'font-semibold',
                isActive
                    ? activeClassName || 'text-green-700 underline'
                    : inactiveClassName ||
                          'text-green-500 hover:text-green-600',
            )}
        >
            {label}
        </Link>
    )
}

export default NavLinks

'use client'
import React from 'react'
import AuthModal from '@/components/shared/AuthModal'
import { Button } from '@/components/ui/button'
import NavLinks from '@/components/shared/links/Navlinks'
import { useAuthModalStore } from '@/store/useAuthModalStore'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const { logout, loggedIn } = useAuth()
    const { openModal } = useAuthModalStore()
    const router = useRouter()

    const handleOpenModal = () => {
        openModal('login')
    }

    const handleLogout = () => {
        logout()
        router.refresh()
    }

    return (
        <nav className="z-50 flex h-16 w-full items-center bg-green-100 px-16">
            <h2 className="text-xl font-extrabold">
                <span className="text-green-500">UMKM</span> GEBANG PUTIH
            </h2>
            <div className="ml-auto flex items-center space-x-9">
                {navlinks.map((link, index) => (
                    <NavLinks key={index} href={link.href} label={link.label} />
                ))}
                {loggedIn ? (
                    <Button
                        size="sm"
                        onClick={handleLogout}
                        className="rounded-full bg-green-500 px-5 font-semibold text-white hover:bg-green-400"
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        size="sm"
                        onClick={handleOpenModal}
                        className="rounded-full bg-green-500 px-5 font-semibold text-white hover:bg-green-400"
                    >
                        Login
                    </Button>
                )}
            </div>
            <AuthModal />
        </nav>
    )
}

const navlinks = [
    { label: 'Home', href: '/' },
    { label: 'UMKM', href: '/umkm' },
]

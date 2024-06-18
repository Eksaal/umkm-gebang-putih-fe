'use client'
import React from 'react'
import AuthModal from '@/components/shared/AuthModal'
import { Button } from '@/components/ui/button'
import NavLinks from '@/components/shared/links/Navlinks'
import { useAuthModalStore } from '@/store/useAuthModalStore'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
        <nav className="fixed z-50 flex h-16 w-full items-center bg-green-100 px-16">
            <h2 className="text-xl font-extrabold">
                <Image
                    src={'/homepage/logo.png'}
                    width={11}
                    height={7}
                    alt="logo"
                    className="inline-block align-text-top mr-2" style={{marginLeft:'20px', marginTop:'6px'}}
                />
                <span className="text-green-500">UMKM</span> GEBANG PUTIH
            </h2>
            <div className="ml-auto flex items-center space-x-9">
                {navlinks.map((link, index) => (
                    <NavLinks key={index} href={link.href} label={link.label} />
                ))}
                {loggedIn ? (
                    <Button
                        onClick={handleLogout}
                        className="rounded-full bg-green-500 px-5 font-semibold text-white hover:bg-green-400 text-sm py-2"
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        onClick={handleOpenModal}
                        className="rounded-full bg-green-500 px-5 font-semibold text-white hover:bg-green-400 text-sm py-2"
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
    { label: 'Panduan', href: 'https://drive.google.com/file/d/1YIPS9iC47LRJGaj0fBfrNF9oZjjYst5c/view' },
    { label: 'Beranda', href: '/' },
    { label: 'Peta', href: '/umkm' },
]

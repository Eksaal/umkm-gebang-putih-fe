'use client'
import React, { useState } from 'react'
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleOpenModal = () => {
        openModal('login')
    }

    const handleLogout = () => {
        logout()
        router.refresh()
    }
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };



    return (
        <nav className="fixed z-50 w-full bg-green-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0">
                    <div className="flex items-center">
                        <Image
                            src={'/homepage/logo.png'}
                            width={11}
                            height={9}
                            alt="logo"
                            className="inline-block align-text-top mr-2"
                        />
                        <h2 className="text-base md:text-xl font-extrabold text-green-500">UMKM GEBANG PUTIH</h2>
                    </div>
                </div>
                {/* Navigasi link dan tombol login/logout */}
                <div className="hidden md:flex ml-auto items-center space-x-2 md:space-x-4">
                    {navlinks.map((link, index) => (
                        <NavLinks key={index} href={link.href} label={link.label} />
                    ))}
                    {/* Tombol login/logout */}
                    {loggedIn ? (
                        <Button
                            onClick={handleLogout}
                            className="rounded-full bg-green-500 px-3 py-1 md:px-5 md:py-2 font-semibold text-white hover:bg-green-600 text-xs md:text-sm"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            onClick={handleOpenModal}
                            className="rounded-full bg-green-500 px-3 py-1 md:px-5 md:py-2 font-semibold text-white hover:bg-green-600 text-xs md:text-sm"
                        >
                            Login
                        </Button>
                    )}
                </div>
                {/* Tombol dropdown untuk mobile */}
                <div className="md:hidden">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center px-3 py-2 rounded-full bg-green-500 text-white"
                    >
                        <svg
                            className="h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2.75 5.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm0 4.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm0 4.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm8-9a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm0 4.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm0 4.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm-8-9a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm0 4.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm0 4.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                            {navlinks.map((link, index) => (
                                <NavLinks
                                    key={index}
                                    href={link.href}
                                    label={link.label}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
                                />
                            ))}
                            {loggedIn ? (
                                <Button
                                    onClick={handleLogout}
                                    className="w-full bg-green-500 text-left px-4 py-2 text-sm text-black-700 hover:bg-green-100"
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleOpenModal}
                                    className="w-full bg-green-500 text-left px-4 py-2 text-sm text-black-700 hover:bg-green-100"
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
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

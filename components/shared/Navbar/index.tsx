'use client'
import React, { useState } from 'react'
import AuthModal from '@/components/shared/AuthModal'
import { Button } from '@/components/ui/button'
import NavLinks from '@/components/shared/links/Navlinks'

export default function Navbar() {
    const [isModalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const navlinks = [
        { label: 'Home', href: '/' },
        { label: 'UMKM', href: '/umkm' },
    ]

    return (
        <nav className="z-20 flex h-16 items-center bg-green-100 px-16">
            <h2 className="text-xl font-extrabold">
                <span className="text-green-500">UMKM</span> GEBANG PUTIH
            </h2>
            <div className="ml-auto flex items-center space-x-9">
                {navlinks.map((link, index) => (
                    <NavLinks key={index} href={link.href} label={link.label} />
                ))}
                <Button
                    size="sm"
                    onClick={handleOpenModal}
                    className="rounded-full bg-green-500 px-5 font-semibold text-white hover:bg-green-400"
                >
                    Login
                </Button>
            </div>
            <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </nav>
    )
}

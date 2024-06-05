import React from 'react'
import Navbar from '@/components/shared/Navbar'
import Image from 'next/image'

export default function App() {
    return (
        <main className="min-h-screen bg-green-50">
            <Navbar />
            <section className="relative mx-auto mt-10 max-w-[1180px]">
                <Image
                    src="/homepage/hero.png"
                    alt="hero-image"
                    height={240}
                    width={1180}
                />
                <section className="absolute left-10 top-16 text-white">
                    <h2 className=" text-5xl font-extrabold">
                        UMKM GEBANG PUTIH
                    </h2>
                    <p className="pt-3 text-2xl">
                        Temukan UMKM di Gebang Putih
                    </p>
                </section>
            </section>
        </main>
    )
}

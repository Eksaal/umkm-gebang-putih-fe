import React from 'react'
import Navbar from '@/components/shared/Navbar'
import Image from 'next/image'

export default function App() {
    return (
        <main className="min-h-screen space-y-12 bg-green-50">
            <section className="relative mx-auto max-w-[1180px] pt-10">
                <Image
                    src="/homepage/hero.png"
                    alt="hero-image"
                    height={240}
                    width={1180}
                />
                <div className="absolute left-10 top-28 text-white">
                    <h2 className=" text-5xl font-extrabold">
                        <span className="text-neutral-700">UMKM</span> GEBANG
                        PUTIH
                    </h2>
                    <p className="pt-3 text-2xl">
                        Temukan UMKM di Gebang Putih
                    </p>
                </div>
            </section>
            <section className="flex items-center bg-green-100 px-60">
                <section className="space-y-4 pb-8 pt-12">
                    <div className="w-1/2 space-y-4">
                        <h3 className="text-4xl font-black">Hallo Sobat!!</h3>
                        <p className="">
                            UMKM Gebang Putih adalah project pengembangan
                            website berbasis lokasi sebagai pemetaan UMKM di
                            Kelurahan Gebang Putih, Kecamatan Sukolilo Surabaya
                            sekaligus menjadi wadah promosi UMKM yang ada
                        </p>
                    </div>
                    <p className="text-green-500">
                        Jelajahi website untuk menemukan informasi menarik di
                        setiap UMKMnya!!
                    </p>
                </section>
            </section>
            <section className="w-full">
                <h3 className="text-center text-lg">
                    Apa yang Anda Dapatkan di sini ?{' '}
                </h3>
                <div className="mx-auto mt-2 h-0.5 w-20 bg-green-400"></div>
            </section>
        </main>
    )
}

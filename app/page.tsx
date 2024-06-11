'use client'
import React from 'react'
import Footer from '@/components/shared/Footer'
import Image from 'next/image'
import BannerImage from '@/public/homepage/heroo.png'
import UmkmImage from '@/public/homepage/halo.png'
import { BiSolidLike, BiLocationPlus, BiBowlHot } from 'react-icons/bi'
import { useAuthModalStore } from '@/store/useAuthModalStore'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const HomePage: React.FunctionComponent = () => {
    const { openModal } = useAuthModalStore()
    const { loggedIn } = useAuth()
    const router = useRouter()

    const handleDaftarUmkm = () => {
        if (loggedIn) {
            router.push('/regisumkm')
        } else {
            openModal('login')
        }
    }

    return (
        <main className="min-h-screen space-y-12 pt-16">
            <section className="relative mx-auto max-w-[1180px] pt-16">
                <Image
                    src={BannerImage}
                    alt="hero-image"
                    height={240}
                    width={1180}
                />
                <div className="absolute left-10 top-35 text-white">
                    <h2 className="text-5xl font-extrabold">
                        <span className="text-neutral-700">UMKM</span> GEBANG
                        PUTIH
                    </h2>
                    <p className="pt-3 text-2xl text-500">
                        Temukan UMKM di Gebang Putih
                    </p>
                </div>
            </section>
            <section className="flex items-center bg-green-100 px-60">
                <section className="space-y-4 pb-8 pt-12">
                    <div className="w-1/2 space-y-4">
                        <h3 className="text-4xl font-bold">Hallo Sobat!!</h3>
                        <p>
                            UMKM Gebang Putih adalah project pengembangan
                            website berbasis lokasi sebagai pemetaan UMKM 
                            makanan dan minuman di Kelurahan Gebang Putih, 
                            Kecamatan Sukolilo Surabaya sekaligus menjadi 
                            wadah promosi UMKM yang ada.
                        </p>
                    </div>
                    <p className="text-green-500">
                        Jelajahi website untuk menemukan informasi menarik di
                        setiap UMKMnya!!
                    </p>
                </section>
                <Image
                    src={UmkmImage}
                    alt="hero-image"
                    height={420}
                    width={536}
                />
            </section>
            <section className="w-full pb-20">
                <h3 className="text-center text-lg">
                    Apa yang Anda Dapatkan di sini?
                </h3>
                <div className="mx-auto mt-2 h-0.5 w-20 bg-green-400"></div>
                <div className="grid grid-cols-3 px-[130px] pt-6">
                    {layanan.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center rounded-lg  p-4"
                        >
                            <div className="mb-2  h-10 text-3xl text-green-500">
                                {service.icon}
                            </div>
                            <h4 className="text-xl font-bold">
                                {service.name}
                            </h4>
                            <p className="text-center">{service.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="ove mt-10 flex h-80 items-center justify-center bg-umkm bg-cover px-60">
                    <div className="w-1/3">
                        <button
                            onClick={handleDaftarUmkm}
                            className="cursor-pointer rounded-full bg-green-100 px-10 py-3 text-xl font-semibold hover:bg-green-300"
                        >
                            DAFTARKAN UMKM
                        </button>
                    </div>
                    <div className="w-2/3 px-10 text-center text-white">
                        <h3 className="text-5xl font-bold">
                            Daftarkan UMKM Anda!!
                        </h3>
                        <p className=" pt-8 text-xl font-semibold">
                            Daftarkan UMKM anda untuk mendapatkan pelanggan dan
                            bantuan promosi agar usaha anda dapat dikenal oleh
                            banyak orang
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default HomePage

const layanan = [
    {
        name: 'Produk',
        desc: 'Temukani makanan dan minuman yang anda butuhkan',
        icon: <BiBowlHot />,
    },
    {
        name: 'Lokasi',
        desc: 'Tersedia lokasi UMKM sehingga anda bisa mendatangi penjual secara langsung',
        icon: <BiLocationPlus />,
    },
    {
        name: 'Ulasan',
        desc: 'Anda dapat melihat dan memberi ulasan pada toko',
        icon: <BiSolidLike />,
    },
]

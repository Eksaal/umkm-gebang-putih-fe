import React from 'react'
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import Image from 'next/image'

const contacts = [
    {
        icon: <FaMapMarkerAlt />,
        text: 'Jalan Raya Gebang Putih, Surabaya',
    },
    {
        icon: <FaPhone />,
        text: '+62 822 5090 7901',
    },
    {
        icon: <FaEnvelope />,
        text: 'umkmgebangid@gmail.com',
    },
]

export default function Footer() {
    return (
        <footer className="grid grid-cols-3 items-center gap-16 bg-green-100 px-[130px] py-10">
            <div className=" mt-4">
                <h5 className="text-uppercase text-lg font-bold">
                    Tentang Kami
                </h5>
                <p className="text-muted">
                    UMKM Gebang Putih adalah platform yang bertujuan untuk
                    membantu UMKM lokal dalam memasarkan produk mereka secara
                    online.
                </p>
            </div>
            <div className="kontak-kami mt-4">
                <h5 className="text-uppercase text-lg font-bold">
                    Kontak Kami
                </h5>
                <ul className="list-unstyled space-y-2">
                    {contacts.map((contact, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <span className="text-green-600">
                                {contact.icon}
                            </span>
                            <span>{contact.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="">
                <Image
                    src={'/homepage/logo.svg'}
                    width={464}
                    height={70}
                    alt="logo"
                />
            </div>
        </footer>
    )
}

import React from 'react'
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import { FaMessage } from "react-icons/fa6";

const contacts = [
    {
        icon: <FaMapMarkerAlt />,
        text: 'Jalan Raya Gebang Putih, Surabaya',
    },
    {
        icon: <FaPhone />,
        text: '+62 123 4567 890',
    },
    {
        icon: <FaEnvelope />,
        text: 'info@umkmgebangputih.com',
    },
    {
        icon: <FaMessage />,
        text: 'https://its.id/m/SurveiKepuasanUMKMGebangPutih',
    },
]

export default function Footer() {
    return (
        <footer className="grid grid-cols-3 bg-green-100 px-[130px] py-10">
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
        </footer>
    )
}

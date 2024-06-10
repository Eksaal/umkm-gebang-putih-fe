import React from 'react'
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import { FaMessage } from "react-icons/fa6"
import Image from 'next/image'
import Link from 'next/link';

const contacts = [
    {
        icon: <FaMapMarkerAlt />,
        href: '/https://www.google.com/maps/place/Gebang+Putih,+Kec.+Sukolilo,+Surabaya,+Jawa+Timur/@-7.2819328,112.7867909,16z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fa1487ff2801:0x790b0bf6776f8da2!8m2!3d-7.2833898!4d112.788207!16s%2Fg%2F121bk7y3?entry=ttu',
        text: 'Jalan Raya Gebang Putih, Surabaya',
    },
    {
        icon: <FaPhone />,
        href: '/https://wa.me/6282250907901',
        text: '+62 822 5090 7901',
    },
    {
        icon: <FaEnvelope />,
        href: 'https://mail.google.com/mail/u/0/?view=cm&tf=1&fs=1&to=umkmgebangid@gmail.com',
        text: 'umkmgebangid@gmail.com',
    },
    {
        icon: <FaMessage />,
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSfp3l9nSwdosAWtO4qshtqsEDoyuU1zOvsmoWbPSoDRc11LvA/viewform',
        text: 'https://its.id/m/SurveiKepuasanUMKMGebang',
    }
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
                            <Link href={contact.href}>
                            <span className="text-green-600">
                                {contact.icon}
                            </span>
                            <span>{contact.text}</span>
                            </Link>
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

'use client'
import * as React from 'react'
import Image from 'next/image'
import '@fortawesome/fontawesome-free/css/all.min.css'

interface ICardProps {
    readonly name: string
    readonly rating: number
    readonly address: string
    readonly image: string
    readonly type: string
}

const Card: React.FunctionComponent<ICardProps> = ({
    image,
    name,
    address,
    rating,
    type,
}) => {
    const cleanType = type.replace(/[\[\]"]/g, '').trim()
    return (
        <div className="relative mx-auto mb-4 grid h-[218px] w-[500px] grid-cols-2 gap-3 overflow-hidden rounded-lg shadow-lg">
            <Image
                src={`http://localhost:3333/${image}`}
                alt="hero-image"
                height={218}
                width={242}
                className="h-[218px] w-[242px] object-cover"
            />
            <div className="flex flex-col justify-between px-4 py-4">
                <h2 className="text-2xl font-bold uppercase">{name}</h2>
                <h3 className="">{rating} Ulasan</h3>

                <div className=""></div>
                <p className="text-sm">{address}</p>
            </div>
            <div className=" text-md absolute left-5 top-5 rounded-md  bg-blue-400 px-2 py-1 text-white">
                {cleanType}
            </div>
        </div>
    )
}

export default Card

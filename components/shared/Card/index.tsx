'use client'
import * as React from 'react'
import Image from 'next/image'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Rating from '../Rating'

interface ICardProps {
    readonly id: number
    readonly name: string
    readonly rating: number
    readonly address: string
    readonly image: string
    readonly type: string
    readonly totalUlasan: number
    onClick: (id: number) => void
}

const imagePath = process.env.NEXT_PUBLIC_IMAGE_URL

const Card: React.FunctionComponent<ICardProps> = ({
    id,
    image,
    name,
    address,
    rating,
    totalUlasan,
    type,
    onClick,
}) => {
    return (
        <div
            className="relative mx-auto mb-4 grid h-[218px] w-[500px] grid-cols-2 gap-3 overflow-hidden rounded-lg shadow-lg"
            onClick={() => onClick(id)}
        >
            <Image
                src={`${imagePath}${image}`}
                alt="hero-image"
                height={218}
                width={242}
                className="h-[218px] w-[242px] object-cover"
            />
            <div className="flex flex-col justify-between px-4 py-4">
                <h2 className="text-xl font-bold uppercase">{name}</h2>
                <div className="">
                    <div className="flex items-center gap-2">
                        <h3>{rating}</h3>
                        <Rating initialValue={rating} disabled />
                    </div>
                    <h3>( {totalUlasan} Ulasan )</h3>
                </div>
                <p className="text-sm">{address}</p>
            </div>
            <div className="text-md absolute left-5 top-5 rounded-md bg-blue-400 px-2 py-1 text-white">
                {type}
            </div>
        </div>
    )
}

export default Card

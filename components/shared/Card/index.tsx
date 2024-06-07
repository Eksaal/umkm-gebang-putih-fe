import * as React from 'react'
import Image from 'next/image'

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
}) => {
    return (
        <div className=" mx-auto grid h-[218px] w-[500px] grid-cols-2 gap-3 overflow-hidden rounded-lg shadow-lg">
            <Image
                src={image}
                alt="hero-image"
                height={218}
                width={242}
                className="h-[218px] w-[242px]"
            />
            <div className=" flex flex-col justify-between px-4 py-4">
                <h2 className="upercase text-2xl font-bold">{name}</h2>
                <h3 className="">{rating} Ulasan</h3>
                <p>{address} </p>
            </div>
        </div>
    )
}

export default Card

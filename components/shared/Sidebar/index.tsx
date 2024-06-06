'use client'
import * as React from 'react'
import { useState } from 'react'
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Card from '../Card'

interface ISIdebarProps {}

const Sidebar: React.FunctionComponent<ISIdebarProps> = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isMinimized, setIsMinimized] = useState(false)

    const cardsData = [
        {
            name: 'Nama',
            rating: 4,
            address:
                'bantuan promosi agar usaha anda dapat dikenal oleh banyak orang',
            type: 'Makanan',
            image: 'homepage/wrung1.png',
        },
        {
            name: 'Warung 2',
            rating: 5,
            address: 'bantuan promosi untuk usaha kuliner anda',
            type: 'Minuman',
            image: 'homepage/wrung1.png',
        },
        {
            name: 'Warung 3',
            rating: 3,
            address: 'promosi bisnis anda dengan efektif',
            type: 'Minuman',
            image: 'homepage/wrung1.png',
        },
    ]

    const filteredCards = cardsData.filter(
        (card) =>
            card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div
            className={`relative flex ${isMinimized ? '' : 'w-[37%'}] flex-col gap-4 px-5 pt-16`}
        >
            <button
                className="top-400 absolute -right-3  top-[50vh] rounded-l-lg bg-green-500  p-2 text-2xl"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                {isMinimized ? (
                    <FaChevronRight className="text-gray-600" />
                ) : (
                    <FaChevronLeft className="text-gray-600" />
                )}
            </button>
            {!isMinimized && (
                <>
                    <div className="relative my-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded border border-gray-300 p-2 pl-10"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                    </div>
                    {filteredCards.map((card, index) => (
                        <Card
                            key={index}
                            name={card.name}
                            rating={card.rating}
                            address={card.address}
                            type={card.type}
                            image={card.image}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

export default Sidebar

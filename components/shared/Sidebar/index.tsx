'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import Card from '../Card'

interface ISidebarProps {}

interface CardData {
    name: string
    rating: number
    address: string
    type: string
    image: string
}

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('All')

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const search = searchParams.get('search') || ''
        const type = searchParams.get('type') || 'All'
        setSearchTerm(search)
        setSelectedType(type)
    }, [searchParams])

    useEffect(() => {
        const params = new URLSearchParams()
        if (searchTerm) {
            params.set('search', searchTerm)
        }
        if (selectedType && selectedType !== 'All') {
            params.set('type', selectedType)
        }
        const queryString = params.toString()
        router.replace(`?${queryString}`, undefined)
    }, [searchTerm, selectedType, router])

    const cardsData: CardData[] = [
        {
            name: 'Nama',
            rating: 4,
            address:
                'bantuan promosi agar usaha anda dapat dikenal oleh banyak orang',
            type: 'Makanan',
            image: '/homepage/wrung1.png',
        },
        {
            name: 'Warung 2',
            rating: 5,
            address: 'bantuan promosi untuk usaha kuliner anda',
            type: 'Minuman',
            image: '/homepage/wrung1.png',
        },
        {
            name: 'Warung 3',
            rating: 3,
            address: 'promosi bisnis anda dengan efektif',
            type: 'Minuman',
            image: '/homepage/wrung1.png',
        },
        {
            name: 'Warung 3',
            rating: 3,
            address: 'promosi bisnis anda dengan efektif',
            type: 'Minuman',
            image: '/homepage/wrung1.png',
        },
        {
            name: 'Warung 3',
            rating: 3,
            address: 'promosi bisnis anda dengan efektif',
            type: 'Minuman',
            image: '/homepage/wrung1.png',
        },
    ]

    const filteredCards = cardsData.filter((card) => {
        const matchesName = card.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        const matchesType = selectedType === 'All' || card.type === selectedType
        return matchesName && matchesType
    })

    return (
        <div
            className={`${filteredCards.length < 1 ? '' : 'bg-white'} z-20 min-h-screen min-w-[543px] pt-16`}
        >
            <div className="flex gap-4 px-6">
                <div className="relative my-4 w-2/3">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl bg-white p-2 pl-10 shadow-md"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                </div>
                <div className="relative my-4 w-1/3">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full rounded-xl bg-white p-2 shadow-md"
                    >
                        <option value="All">Semua Jenis</option>
                        <option value="Makanan">Makanan</option>
                        <option value="Minuman">Minuman</option>
                    </select>
                </div>
            </div>
            <div
                className={`fixed inset-y-0  mt-32 flex flex-col gap-4 space-y-5 overflow-y-auto px-5`}
                style={{ maxHeight: 'calc(100vh - 4rem)' }}
            >
                {filteredCards.length > 0 ? (
                    <div>
                        <h1 className="py-2 text-lg">Hasil pencarian</h1>
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
                    </div>
                ) : (
                    <h1 className="py-2 text-lg"></h1>
                )}
            </div>
        </div>
    )
}

export default Sidebar

'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUmkm } from '@/hooks/useUMKM'
import { UmkmMeta } from '@/app/umkm/page'
import DetilModal from '../DetailModal'
import Card from '../Card'

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
    const { getMetaUmkm } = useUmkm()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [locations, setLocations] = useState<UmkmMeta[]>([])
    const [page, setPage] = useState(1)
    const [limit] = useState(3) // Adjust the limit as needed
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('All')

    const router = useRouter()
    const searchParams = useSearchParams()

    const cleanType = (type: string) => type.replace(/[\[\]"]/g, '').trim()

    const fetchData = async (page: number, limit: number) => {
        try {
            const data: UmkmMeta[] = await getMetaUmkm(page, limit)
            if (data.length === 0) {
                setHasMore(false)
            } else {
                const cleanedData = data.map((item) => ({
                    ...item,
                    category: cleanType(item.category),
                }))
                setLocations((prevLocations) => [
                    ...prevLocations,
                    ...cleanedData,
                ])
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching UMKM data:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        // Initial fetch with high priority
        fetchData(1, limit)
    }, [])

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

    const filteredCards = locations.filter((card) => {
        const matchesName = card.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        const matchesType =
            selectedType === 'All' || card.category === selectedType
        return matchesName && matchesType
    })

    const handleClick = (id: number) => {
        setSelectedId(id)
        setIsOpen(true)
    }

    const observer = useRef<IntersectionObserver | null>(null)
    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1)
                    fetchData(page + 1, limit)
                }
            })
            if (node) observer.current.observe(node)
        },
        [loading, hasMore, page, limit],
    )

    return (
        <div
            className={`${filteredCards.length < 1 ? '' : 'bg-white'} z-20 min-h-screen min-w-[543px] pt-16`}
        >
            <DetilModal
                id={selectedId}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="mb-5 flex gap-4 px-6">
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
                className={`fixed inset-y-0 mt-32 flex flex-col gap-4 space-y-5 overflow-y-auto px-5 pt-3`}
                style={{ maxHeight: 'calc(100vh - 4rem)' }}
            >
                {filteredCards.length > 0 ? (
                    <div>
                        <h1 className="py-2 text-lg">Hasil pencarian</h1>
                        {filteredCards.map((card, index) => (
                            <div
                                key={index}
                                ref={
                                    index === filteredCards.length - 1
                                        ? lastElementRef
                                        : null
                                }
                            >
                                <Card
                                    id={card.id}
                                    name={card.name}
                                    rating={card.averageRating}
                                    totalUlasan={card.totalReviews}
                                    address={card.address}
                                    type={card.category}
                                    image={card.pictures}
                                    onClick={() => handleClick(card.id)}
                                />
                            </div>
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

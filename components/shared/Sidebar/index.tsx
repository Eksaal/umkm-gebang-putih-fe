'use client'
import * as React from 'react'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import Card from '../Card'
import { useUmkm } from '@/hooks/useUMKM'
import { UmkmMeta } from '@/app/umkm/page'
import DetilModal from '../DetailModal'

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
    const { getMetaUmkm } = useUmkm()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [locations, setLocations] = useState<UmkmMeta[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)

    const cleanType = (type: string) => type.replace(/[\[\]"]/g, '').trim()

    const fetchData = async (page: number) => {
        try {
            const datarum: any = await getMetaUmkm(page)
            const data = datarum.data

            if (data.length === 0) {
                setHasMore(false)
            } else {
                const cleanedData = data.map((item: any) => ({
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
            setError('Failed to fetch data')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(page)
    }, [page])

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

    const debouncedSetSearchTerm = useCallback(
        debounce((value: string) => setSearchTerm(value), 300),
        [],
    )

    const filteredCards = useMemo(() => {
        return locations.filter((card) => {
            const matchesName = card.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            const matchesType =
                selectedType === 'All' || card.category === selectedType
            return matchesName && matchesType
        })
    }, [locations, searchTerm, selectedType])

    const handleClick = (id: number) => {
        setSelectedId(id)
        setIsOpen(true)
    }

    const lastCardRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1)
                }
            })
            if (node) observer.current.observe(node)
        },
        [loading, hasMore],
    )

    if (loading && page === 1) return <div>Loading...</div>
    if (error) return <div>{error}</div>

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
                        onChange={(e) => debouncedSetSearchTerm(e.target.value)}
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
                        {filteredCards.map((card, index) => {
                            if (index === filteredCards.length - 1) {
                                return (
                                    <div ref={lastCardRef} key={index}>
                                        <Card
                                            id={card.id}
                                            name={card.name}
                                            rating={card.averageRating}
                                            totalUlasan={card.totalReviews}
                                            address={card.address}
                                            type={card.category}
                                            image={card.pictures}
                                            onClick={handleClick}
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <Card
                                        key={index}
                                        id={card.id}
                                        name={card.name}
                                        rating={card.averageRating}
                                        totalUlasan={card.totalReviews}
                                        address={card.address}
                                        type={card.category}
                                        image={card.pictures}
                                        onClick={handleClick}
                                    />
                                )
                            }
                        })}
                    </div>
                ) : (
                    <h1 className="py-2 text-lg">No results found</h1>
                )}
            </div>
        </div>
    )
}

export default Sidebar

// Debounce function
function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout | null = null
    return function (...args: any[]) {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null
            func(...args)
        }, wait)
    }
}

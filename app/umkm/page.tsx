'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useUmkm } from '@/hooks/useUMKM'

export interface UmkmMeta {
    id: number
    name: string
    category: string
    address: string
    latitude: number
    longitude: number
    pictures: string
    totalReviews: number
    averageRating: number
}

const Map = dynamic(() => import('@/components/shared/Maps'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
}) as React.FC<{ locations: UmkmMeta[] }>

const Home: React.FC = () => {
    const { getMetaUmkm } = useUmkm()
    const [locations, setLocations] = useState<UmkmMeta[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)

    const fetchData = async (page: number) => {
        try {
            const datarumm: any = await getMetaUmkm(page, 100)
            const data = datarumm.data
            console.log(datarumm.data)

            console.log(data)
            if (data.length === 0) {
                setHasMore(false)
            } else {
                setLocations((prevLocations) => [...prevLocations, ...data])
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

    const lastElementRef = useCallback(
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

    if (error) return <div>{error}</div>

    return (
        <div className="flex-grow bg-transparent">
            <Map locations={locations} />
            {loading && <p>Loading...</p>}
            {hasMore && !loading && (
                <div ref={lastElementRef} style={{ height: 20 }}></div>
            )}
        </div>
    )
}

export default Home

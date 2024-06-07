// pages/home.tsx
'use client'
import React, { useEffect, useState } from 'react'
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
}

const Map = dynamic(() => import('@/components/shared/Maps'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
}) as React.FC<{ locations: UmkmMeta[] }>

const Home: React.FC = () => {
    const { getMetaUmkm } = useUmkm()
    const [locations, setLocations] = useState<UmkmMeta[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: UmkmMeta[] = await getMetaUmkm()
                setLocations(data)
            } catch (error) {
                console.error('Error fetching UMKM data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex-grow bg-transparent">
            <Map locations={locations} />
        </div>
    )
}

export default Home

'use client'
import React from 'react'
import dynamic from 'next/dynamic'

interface Location {
    id: string
    lat: number
    long: number
}

const Map = dynamic(() => import('@/components/shared/Maps'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
}) as React.FC<{ locations: Location[] }>

const latitudes = [
    -7.281863, -7.281861, -7.281867, -7.281791, -7.281416, -7.281373, -7.281285,
    -7.281414, -7.281477, -7.281243, -7.280982,
]

const longitudes = [
    112.785825, 112.785817, 112.785991, 112.786125, 112.787088, 112.787169,
    112.78733, 112.787067, 112.78708, 112.787392, 112.788039,
]

const locations = latitudes.map((lat, index) => ({
    id: (index + 1).toString(),
    lat,
    long: longitudes[index],
}))

const Home: React.FC = () => {
    return (
        <div className="flex-grow pt-16">
            <Map locations={locations} />
        </div>
    )
}

export default Home

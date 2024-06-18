'use client'
import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useRouter } from 'next/navigation'
import 'leaflet/dist/leaflet.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { UmkmMeta } from '@/app/umkm/page'

interface MapProps {
    locations: UmkmMeta[]
}

const createCustomIcon = (color: string, name: string) => {
    return L.divIcon({
        html: `<div style="font-size: 16px; text-align: center;"><i class="fas fa-map-marker-alt" style="color: ${color}; font-size: 18px;"></i><br/><span style="font-size: 10px; white-space: nowrap; display: block; margin: 0 auto; color: black;">${name}</span></div>`,
        className: '',
    })
}

const Map: React.FC<MapProps> = ({ locations }) => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('All')

    const searchParamss = new URLSearchParams(window.location.search)
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const search = searchParams.get('search') || ''
        const type = searchParams.get('type') || 'All'
        setSearchTerm(search)
        setSelectedType(type)
    }, [searchParamss])

    const cleanType = (type: string) => type.replace(/[\[\]"]/g, '').trim()

    const filteredLocations = locations.filter((location) => {
        const matchesName = location.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        const cleanedType = cleanType(location.category)
        const matchesType =
            selectedType === 'All' || cleanedType === selectedType
        return matchesName && matchesType
    })

    const handleMarkerClick = (name: string) => {
        const searchUrl = `/umkm?search=${encodeURIComponent(name)}`
        router.push(searchUrl)
    }

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari UMKM..."
                    className="w-full md:w-1/3 mb-2 md:mb-0 p-2 border border-gray-300 rounded-md"
                />
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
                >
                    <option value="All">Semua Kategori</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
            </div>
            <MapContainer
                center={[-7.282862, 112.785852]}
                zoom={13}
                className="flex-1"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredLocations.map((location) => (
                    <Marker
                        key={location.id}
                        icon={createCustomIcon(
                            location.category === 'Makanan' ? 'red' : 'green',
                            location.name,
                        )}
                        position={[location.latitude, location.longitude]}
                        eventHandlers={{
                            click: () => handleMarkerClick(location.name),
                        }}
                    >
                        <Popup>{location.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map

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
    <MapContainer
        center={[-7.282862, 112.785852]}
        zoom={15}
        className="fixed left-0 right-0 h-full w-full"
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
)
}

export default Map
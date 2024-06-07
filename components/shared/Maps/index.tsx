// components/shared/Maps.tsx
'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useRouter } from 'next/navigation'
import 'leaflet/dist/leaflet.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

export interface UmkmMeta {
    id: number
    name: string
    category: string
    address: string
    latitude: number
    longitude: number
    pictures: string
}

interface MapProps {
    locations: UmkmMeta[]
}

const createCustomIcon = () => {
    return L.divIcon({
        html: `<div style="color: red; font-size: 24px;"><i class="fas fa-map-marker-alt"></i></div>`,
        className: '',
    })
}

const Map: React.FC<MapProps> = ({ locations }) => {
    const router = useRouter()
    console.log('dar', locations)

    const handleMarkerClick = (name: string) => {
        console.log('NAME', name)
        const searchUrl = `/umkm?search=${encodeURIComponent(name)}`
        router.push(searchUrl)
    }

    return (
        <MapContainer
            center={[-7.282862, 112.785852]}
            zoom={20}
            className="fixed left-0 right-0 h-full w-full"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
                <Marker
                    key={location.id}
                    icon={createCustomIcon()}
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

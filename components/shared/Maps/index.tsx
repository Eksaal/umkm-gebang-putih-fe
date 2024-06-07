'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useRouter } from 'next/navigation'
import 'leaflet/dist/leaflet.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

interface MapProps {
    locations: {
        id: string
        lat: number
        long: number
        name: string
    }[]
}

const createCustomIcon = () => {
    const divIcon = L.divIcon({
        html: `<div style="color: red; font-size: 24px;"><i class="fas fa-map-marker-alt"></i></div>`,
        className: '',
    })
    return divIcon
}

const Map: React.FC<MapProps> = ({ locations }) => {
    const router = useRouter()

    const handleMarkerClick = (name: string) => {
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
                    position={[location.lat, location.long]}
                    eventHandlers={{
                        click: () => handleMarkerClick(location.name),
                    }}
                >
                    {location.name}
                </Marker>
            ))}
        </MapContainer>
    )
}

export default Map

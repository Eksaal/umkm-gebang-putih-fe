'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

interface MapProps {
    locations: {
        id: string
        lat: number
        long: number
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
    const handleMarkerClick = (id: string) => {
        console.log(`Marker ID: ${id}`)
    }

    return (
        <MapContainer
            center={[-7.282862, 112.785852]}
            zoom={23}
            style={{ height: '100vh', width: '100%' }}
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
                        click: () => handleMarkerClick(location.id),
                    }}
                >
                    <Popup>Marker ID: {location.id}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default Map

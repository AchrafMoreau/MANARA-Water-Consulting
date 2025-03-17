import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import L from "leaflet"
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";


const POSITION = {
  lat: 33.845978, 
  lng: -6.939560
}
export default function MapComponent() {
  const zoom = 16;

  console.log(POSITION);

  return (
        <MapContainer 
          center={POSITION} 
          zoom={zoom} 
          scrollWheelZoom={false} 
          className="h-[300px] rounded-lg z-0"
        >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={POSITION} >
            <Popup>
              Manara Water Consulting
            </Popup>
            </Marker>
        </MapContainer>
  )
}
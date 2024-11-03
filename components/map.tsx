import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useState } from 'react';

// Fix for default markers - with proper typing
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

// Create a function to generate colored icons
const createColoredIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: markerShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'marker-icon'
  });
}

const countries = [
  { name: "United States", coordinates: [39, -98], dateRange: "Jan 1, 2023 - Mar 15, 2023", color: "red" },
  { name: "Brazil", coordinates: [-10, -55], dateRange: "Apr 1, 2023 - Jun 30, 2023", color: "green" },
  { name: "France", coordinates: [47, 2], dateRange: "Jul 1, 2023 - Sep 30, 2023", color: "blue" },
  { name: "South Africa", coordinates: [-29, 25], dateRange: "Oct 1, 2023 - Dec 31, 2023", color: "orange" },
  { name: "India", coordinates: [20, 77], dateRange: "Jan 1, 2024 - Mar 31, 2024", color: "violet" },
  { name: "Russia", coordinates: [62, 94], dateRange: "Apr 1, 2024 - Jun 30, 2024", color: "yellow" },
]

export default function Map() {
  const [mapConfig, setMapConfig] = useState({
    center: [20, 0] as [number, number],
    zoom: 2
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Mobile breakpoint
        setMapConfig({
          center: [30, 0], // Adjust center point for better mobile view
          zoom: 1.5 // Zoom out a bit more on mobile
        });
      } else {
        setMapConfig({
          center: [20, 0],
          zoom: 2
        });
      }
    };

    // Set initial size
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MapContainer
      center={mapConfig.center}
      zoom={mapConfig.zoom}
      maxBounds={[[-90, -180], [90, 180]]}
      maxBoundsViscosity={1.0}
      style={{ 
        height: "calc(100vh - 3rem)", // Reduced header space
        width: "100vw", // Full viewport width
        position: "fixed", // This helps prevent mobile scrolling issues
        top: "3rem", // Align with header
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}
      minZoom={1.5}
      maxZoom={19}
      worldCopyJump={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        noWrap={true}
      />
      {countries.map(({ name, coordinates, dateRange, color }) => (
        <Marker 
          key={name} 
          position={[coordinates[0], coordinates[1]]}
          icon={createColoredIcon(color)}
          eventHandlers={{
            click: (e) => {
              e.target.openPopup();
            },
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            }
          }}
        >
          <Popup className="custom-popup">
            <strong>{name}</strong>
            <br />
            {dateRange}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
} 
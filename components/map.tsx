import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
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
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      minZoom={2}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stamen.com/">Stamen Design</a>'
      />
      {countries.map(({ name, coordinates, dateRange, color }) => (
        <Marker 
          key={name} 
          position={[coordinates[0], coordinates[1]]}
          icon={createColoredIcon(color)}
          eventHandlers={{
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
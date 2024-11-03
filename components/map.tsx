import React from "react"
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useState } from 'react';
import countriesData from '../data/countries.json';


delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});


const createColoredIcon = (color: string) => {
  const colors: { [key: string]: string } = {
    'red': 'red',
    'blue': 'blue',
    'green': 'green',
    'yellow': 'yellow',
    'orange': 'orange',
    'purple': 'violet',
    'gold': 'orange',
    'teal': 'blue',
    'pink': 'violet',
    'brown': 'black'
  };

  const safeColor = colors[color.toLowerCase()] || 'blue';

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${safeColor}.png`,
    shadowUrl: markerShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

function LayerController() {
  const map = useMap();

  useEffect(() => {
    const savedLayer = localStorage.getItem('selectedMapLayer') || 'Street View';

    const layerControls = document.querySelectorAll('.leaflet-control-layers-base label span');
    
    layerControls.forEach((layer: Element) => {
      if (layer.textContent === savedLayer) {
        (layer as HTMLElement).click();
      }
    });

    map.on('baselayerchange', (e: L.LayersControlEvent) => {
      localStorage.setItem('selectedMapLayer', e.name);
    });
  }, [map]);

  return null;
}

export default function Map() {
  const [mapConfig, setMapConfig] = useState({
    center: [20, 0] as [number, number],
    zoom: 2
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { 
        setMapConfig({
          center: [30, 0], 
          zoom: 1.5 
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
        height: "calc(100vh - 3rem)", 
        width: "100vw", 
        position: "fixed", 
        top: "3rem",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}
      minZoom={1.5}
      maxZoom={19}
      worldCopyJump={true}
    >
      <LayerController />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Street View">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            noWrap={true}
          />
        </LayersControl.BaseLayer>
        
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            noWrap={true}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Dark Mode">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            noWrap={true}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Terrain View">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            noWrap={true}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Light Mode">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            noWrap={true}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="OpenStreetMap Classic">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap={true}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {countriesData.cities.map(({ name, coordinates, dateRange, color }) => (
        <Marker 
          key={`${name}-${coordinates.join(',')}`}
          position={[
            coordinates[0] + (Math.random() - 0.5) * 0.01,
            coordinates[1] + (Math.random() - 0.5) * 0.01
          ]}
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
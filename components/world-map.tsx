"use client"

import React from "react"
import dynamic from 'next/dynamic'

// Create a dynamic import for the map component
const MapWithNoSSR = dynamic(() => import('./map'), { 
  ssr: false // Disable server-side rendering
})

export function WorldMapComponent() {
  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Hassan &amp; Luthfiya&apos;s Travel Map</h1>
      <div className="rounded-[40px] overflow-hidden border border-gray-200 h-[calc(100vh-120px)]">
        <MapWithNoSSR />
      </div>
    </div>
  )
}
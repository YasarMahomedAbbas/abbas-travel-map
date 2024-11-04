"use client"

import React, { useState } from "react"
import dynamic from 'next/dynamic'
import { Timeline } from './timeline'

const MapWithNoSSR = dynamic(() => import('./map'), { 
  ssr: false
})

export function WorldMapComponent() {
  const [activeTab, setActiveTab] = useState<'map' | 'timeline'>('map');

  return (
    <div className="w-full h-screen p-8 pt-2">
      <div className="relative z-[15]">
        <h1 className="text-2xl font-bold mb-8">Hassan &amp; Luthfiya&apos;s Travel Map</h1>
        
        <div className="flex gap-2 mb-8 ml-8">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-2 py-2 rounded-lg ${
              activeTab === 'map'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'timeline'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Timeline View
          </button>
        </div>
      </div>

      <div className="rounded-[40px] overflow-hidden border border-gray-200 h-[calc(100vh-250px)] mt-4">
        {activeTab === 'map' ? (
          <MapWithNoSSR />
        ) : (
          <Timeline />
        )}
      </div>
    </div>
  )
}
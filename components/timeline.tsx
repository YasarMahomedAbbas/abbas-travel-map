import React from 'react';
import countriesData from '../data/countries.json';

// Group cities by year
const groupByYear = (cities: typeof countriesData.cities) => {
  const grouped = cities.reduce((acc: { [key: string]: typeof countriesData.cities }, city) => {
    const year = new Date(city.startDate).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(city);
    return acc;
  }, {});

  return Object.entries(grouped).sort((a, b) => Number(a[0]) - Number(b[0]));
};

export function Timeline() {
  const groupedCities = groupByYear(countriesData.cities);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto relative min-h-screen">
        <div 
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 bg-gray-300"
          style={{ width: '2px' }}
        />
        
        {groupedCities.map(([year, cities]) => (
          <div key={year} className="mb-24 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="relative z-10 flex items-center translate-x-[0.5px]">
                <div 
                  className="w-16 h-1" 
                  style={{ backgroundColor: cities[0].color }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600 text-center translate-x-[0.5px]">{year}</div>
            </div>

            <div className="grid grid-cols-2 gap-16 mt-8">
              {cities.map((city) => (
                <div
                  key={`${city.name}-${city.coordinates.join(',')}`}
                  className={`${city.coordinates.join(',')} mb-0`}
                >
                  <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 
                    transition-colors bg-white shadow-sm">
                    <h3 className="font-semibold">{city.name}</h3>
                    <p className="text-gray-600 mt-1">{city.dateRange}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-0" />
          </div>
        ))}
      </div>
    </div>
  );
} 
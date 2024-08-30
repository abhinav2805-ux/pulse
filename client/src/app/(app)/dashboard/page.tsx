"use client"
import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { INDIA_STATES } from '../../../constants/testLoc';

interface PriceData {
  state: string;
  value: number;
}

const PriceDashboard = () => {
    const [data, setData] = useState<PriceData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/prices')
          .then(response => response.json())
          .then((data: PriceData[]) => {
            console.log("Fetched data:", data);
            setData(data);
            setIsLoading(false);
          })
          .catch((error: Error) => {
            console.error("Error fetching data:", error);
            setError(error);
            setIsLoading(false);
          });
      }, []);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const colorScale = scaleQuantile()
      .domain(data.map(d => d.value))
      .range([
        '#ffedea', '#ffcec5', '#ffad9f', '#ff8a75',
        '#ff5533', '#e2492d', '#be3d26', '#9a311f', '#782618'
      ]);

    return (
      <div className="w-full h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-center py-4">Real-time Price Dashboard</h1>
        <div className="h-[80vh] w-full">
        <ComposableMap projection="geoMercator" projectionConfig={{ center: [78.9629, 22.5937], scale: 1000 }}>
          <Geographies geography={INDIA_STATES}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = data.find(s => s.state === geo.properties.name);
                console.log("Processing geography:", geo.properties.name, current);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : '#EEE'}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                  />
                );
              })
            }
          </Geographies>
          
        </ComposableMap>
        </div>
      </div>
    );
};

export default PriceDashboard;

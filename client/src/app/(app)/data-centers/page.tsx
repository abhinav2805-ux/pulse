"use client";
import React, { useEffect, useRef, useState } from 'react';
import { OlaMaps } from '@/olaSDK/olamaps-js-sdk.es';

type City = {
  city: string;
  lat: number;
  lng: number;
};

export default function OlaTest() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const olaMapsRef = useRef<OlaMaps | null>(null);
    const myMapRef = useRef<any>(null);
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        fetch('cities_with_coordinates_cleaned.json')
            .then(response => response.json())
            .then(data => setCities(data.cities));
    }, []);

    useEffect(() => {
        if (!olaMapsRef.current && mapContainerRef.current && cities.length > 0) {
            olaMapsRef.current = new OlaMaps({
                apiKey: process.env.NEXT_PUBLIC_OLA_API_KEY,
            });

            myMapRef.current = olaMapsRef.current.init({
                style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                container: mapContainerRef.current,
                center: [cities[0].lng, cities[0].lat],
                zoom: 5,
            });

            if (myMapRef.current) {
                cities.forEach((city) => {
                    const popup = olaMapsRef.current!.addPopup({ offset: [0, -30], anchor: 'bottom' })
                        .setHTML(`<div class="font-semibold text-xl">${city.city}</div>`);

                    olaMapsRef.current!
                        .addMarker({ offset: [0, 6], anchor: 'bottom', color: 'red' })
                        .setLngLat([city.lng, city.lat])
                        .addTo(myMapRef.current)
                        .setPopup(popup);
                });
            }
        }
    }, [cities]);

    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-16 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                        Essential Commodities Price Monitoring
                    </h1>
                    <p className="mt-3 max-w-4xl mx-auto text-base text-gray-700 sm:text-lg md:mt-5 md:text-xl">
                        Price is monitored for twenty-two essential commodities across <span className="font-bold">550</span> market centres 
                        spread across the country, representing North, West, East, South and North-eastern regions.
                    </p>
                    <p className="mt-3 max-w-3xl mx-auto text-sm text-gray-600 md:text-base">
                        Commodities: Rice, Wheat, Atta, Gram Dal, Tur (Arhar) Dal, Urad Dal, Moong Dal, Masur Dal, Sugar, Gur, 
                        Groundnut Oil, Mustard Oil, Vanaspati, Sunflower Oil, Soya Oil, Palm Oil, Tea, Milk, Potato, Onion, Tomato and Salt
                    </p>
                </div>
                
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div ref={mapContainerRef} className="w-full h-[600px]" />
                </div>
                
                <div className="mt-8 text-center text-sm text-gray-600">
                    <p>Data last updated: {currentDate}</p>
                    <p>Total market centres shown: {cities.length}</p>
                </div>
            </div>
        </div>
    );
}
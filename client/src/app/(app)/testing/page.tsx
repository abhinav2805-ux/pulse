"use client";
import React, { useEffect, useRef } from 'react';
import { OlaMaps } from '@/ola/olamaps-js-sdk.es';

function OlaTest() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const olaMapsRef = useRef<OlaMaps | null>(null);

    useEffect(() => {
        // Check if the map has already been initialized
        if (!olaMapsRef.current) {
            olaMapsRef.current = new OlaMaps({
                apiKey: process.env.NEXT_PUBLIC_OLA_API_KEY,
            });

            olaMapsRef.current.init({
                style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                container: mapContainerRef.current as HTMLDivElement,
                center: [ 77.2909291,28.6896853],
                zoom: 15,
            });
        }
    }, []);

    return (
        <div className='min-h-screen px-10 py-10 flex justify-center items-center'>
            <div ref={mapContainerRef} style={{ width: '75%', height: '700px' }}></div>
        </div>
    );
}

export default OlaTest;

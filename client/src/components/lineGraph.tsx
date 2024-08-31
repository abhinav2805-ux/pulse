"use client";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Data from "@/constants/testData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const RealTimeGraph: React.FC = () => {
    const [humidityData, setHumidityData] = useState<number[]>([]);
    const [pricesData, setPricesData] = useState<number[]>([]);
    const [temperatureData, setTemperatureData] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < Data.predicted_humidity.length) {
                setHumidityData((prev) => [...prev, Data.predicted_humidity[currentIndex]]);
                setPricesData((prev) => [...prev, Data.predicted_prices[currentIndex]]);
                setTemperatureData((prev) => [...prev, Data.predicted_temperature[currentIndex]]);
                setCurrentIndex((prev) => prev + 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const humidity = {
        labels: humidityData.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: 'Predicted Humidity',
                data: humidityData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#22c55e',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor:' #22c55e',
            },
        ],
    };

    const temp = {
        labels: temperatureData.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: 'Predicted Temperature',
                data: temperatureData,
                fill: false,
                backgroundColor: 'rgba(54,162,235,0.4)',
                borderColor: 'rgba(54,162,235,1)',
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#3b82f6',
            },
        ],
    };

    const price = {
        labels: pricesData.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: 'Predicted Prices',
                data: pricesData,
                fill: false,
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: '#eab308',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#eab308',
            },
        ],
    };

    const optionsHumidity = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Humidity (g/kg)',
                },
            },
        },
    };

    const optionsTemp = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
            },
        },
    };

    const optionsPrice = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Price (Rupees)',
                },
            },
        },
    };

    return (
        <div className='mx-auto my-auto px-4 py-8 flex flex-col gap-8 bg-gray-100 rounded-xl'>
            <h2 className='text-left text-2xl font-semibold'>Real-Time Graph For Price Analysis Of Paddy</h2>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <Line data={humidity} options={optionsHumidity} />
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <Line data={temp} options={optionsTemp} />
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <Line data={price} options={optionsPrice} />
                </div>
        </div>
    );
};

export default RealTimeGraph;

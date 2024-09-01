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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface DataInterface {
    name: string;
    days: number;
    startDate?: string;
    selectType: 'days' | 'weeks' | 'months' | 'years';
    noofunits: number;
    predicted_humidity: number[];
    predicted_prices: number[];
    predicted_temperature: number[];
}

const RealTimeGraph: React.FC<DataInterface> = ({ name,days, startDate, selectType, noofunits, predicted_prices, predicted_humidity, predicted_temperature }) => {
    const [humidityData, setHumidityData] = useState<number[]>([]);
    const [pricesData, setPricesData] = useState<number[]>([]);
    const [temperatureData, setTemperatureData] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showExtraGraphs, setShowExtraGraphs] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < predicted_humidity.length) {
                setHumidityData((prev) => [...prev, predicted_humidity[currentIndex]]);
                setPricesData((prev) => [...prev, predicted_prices[currentIndex]]);
                setTemperatureData((prev) => [...prev, predicted_temperature[currentIndex]]);
                setCurrentIndex((prev) => prev + 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentIndex, predicted_humidity, predicted_prices, predicted_temperature]);

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
                pointHoverBorderColor: '#22c55e',
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

    const optionsPrice = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Price (Rupees)',
                },
            },
        },
    };

    const optionsHumidity = {
        responsive: true,
        maintainAspectRatio: false,
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
            },
        },
    };

    // Helper function to calculate dates based on startDate, noofunits, and selectType
    const calculateDates = (startDateStr: string | undefined, noOfUnits: number, selectType: 'days' | 'weeks' | 'months' | 'years'): string[] => {
        if (!startDateStr) return [];
        
        const startDate = new Date(startDateStr);
        const dates = [];
        
        for (let i = 0; i < noOfUnits; i++) {
            const date = new Date(startDate);
            switch (selectType) {
                case 'days':
                    date.setDate(startDate.getDate() + i);
                    break;
                case 'weeks':
                    date.setDate(startDate.getDate() + i * 7);
                    break;
                case 'months':
                    date.setMonth(startDate.getMonth() + i);
                    break;
                case 'years':
                    date.setFullYear(startDate.getFullYear() + i);
                    break;
                default:
                    break;
            }
            dates.push(date.toISOString().split('T')[0]);
        }
        
        return dates;
    };
    

    // Calculate dates for the table
    const dates = calculateDates(startDate, noofunits, selectType);

    return (
        <div className='flex flex-col items-center mx-auto my-auto px-4 py-8 bg-gray-100 rounded-xl'>
            <h2 className='text-left text-2xl font-semibold mb-4'>Real-Time Graph For Price Analysis Of {name}</h2>
            <div className='bg-white p-4 rounded-lg shadow-md w-full max-w-6xl md:h-[500px]'>
                <Line data={price} options={optionsPrice} />
            </div>
            <table className='mt-4 w-full max-w-6xl bg-white border border-gray-200 rounded-lg shadow-md'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='p-2 text-left'>Serial No</th>
                        <th className='p-2 text-left'>Date</th>
                        <th className='p-2 text-left'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {pricesData.map((price, index) => (
                        <tr key={index}>
                            <td className='p-2'>{index + 1}</td>
                            <td className='p-2'>{dates[index]}</td>
                            <td className='p-2'>{price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className='self-center mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg'
                onClick={() => setShowExtraGraphs((prev) => !prev)}
            >
                {showExtraGraphs ? 'Hide Humidity and Temperature Graphs' : 'Show Humidity and Temperature Graphs'}
            </button>
            {showExtraGraphs && (
                <div className='flex flex-wrap gap-4 mt-4 w-full max-w-6xl'>
                    <div className='bg-white p-4 rounded-lg shadow-md flex-1 min-w-[300px] md:h-[500px]'>
                        <Line data={humidity} options={optionsHumidity} />
                    </div>
                    <div className='bg-white p-4 rounded-lg shadow-md flex-1 min-w-[300px] md:h-[500px]'>
                        <Line data={temp} options={optionsTemp} />
                    </div>
                </div>
            )}
        </div>
    );
} 

export default RealTimeGraph;

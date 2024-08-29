"use client"
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

// Register the components with Chart.js
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
        labels: humidityData.map((_, index) => `Point ${index + 1}`),
        datasets: [
            {
                label: 'Predicted Humidity',
                data: humidityData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const temp = {
        labels: temperatureData.map((_, index) => `Point ${index + 1}`),
        datasets: [
            {
                label: 'Predicted Temperature',
                data: temperatureData,
                fill: false,
                backgroundColor: 'rgba(54,162,235,0.4)',
                borderColor: 'rgba(54,162,235,1)',
            },
        ],
    };

    const price = {
        labels: pricesData.map((_, index) => `Point ${index + 1}`),
        datasets: [
            {
                label: 'Predicted Prices',
                data: pricesData,
                fill: false,
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
            },
        ],
    };

    return (
        <div>
            <h2>Real-Time Graph</h2>
            <Line data={humidity} />
            <Line data={temp} />
            <Line data={price} />
        </div>
    );
};

export default RealTimeGraph;

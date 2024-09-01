"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import RealTimeGraph from "@/components/lineGraph";
import commodities from "@/constants/commodities";


const convertToDays = (unit: "days" | "weeks" | "months" | "years", value: number): number => {
  switch (unit) {
    case "weeks":
      return value * 7;
    case "months":
      return Math.round(value * 30.44);
    case "years":
      return Math.round(value * 365.25);
    default:
      return value;
  }
};

const formatDate = (date: Date | undefined): string => {
  if (!date) return "Select a date";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const Dropdown: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [unit, setUnit] = useState<"days" | "weeks" | "months" | "years">("days");
  const [value, setValue] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [data, setData] = useState<{ predicted_prices: number[], predicted_humidity: number[], predicted_temperature: number[] } | null>(null);
  const [days, setDays] = useState<number>(0);
  const [showTable, setShowTable] = useState(true); //initialy table show hogi , button dabane pr hide 
  const [loading, setLoading] = useState(false);

  const daysOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  const weeksOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const monthsOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearsOptions = Array.from({ length: 7 }, (_, i) => i + 1);

  //reset ka function
  const handleReset = () => {
    setSelectedCommodity("");
    setSelectedDate(undefined);
    setUnit("days");
    setValue(1);
    setData(null);
    setDays(0);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedDate) {
      console.error("Date not selected");
      return;
    }

    setLoading(true); 

    const computedDays = convertToDays(unit, value); // Compute days here
    setDays(computedDays); // Store the computed days in state
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const url = `http://127.0.0.1:5000/api/${selectedCommodity}/${formattedDate}/${computedDays}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const fetchedData = await response.json();

      setTimeout(() => {
        setData(fetchedData); 
        setLoading(false); 
      }, 1500); //1.5 second baad  loading false krdo or render krwado 
    } catch (error) {
      
      console.error("Fetch error:", error);
      
      setLoading(false); //loading puri hogyi to false 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 pt-[100px] ">
        <div className="flex flex-wrap gap-6 max-w-4xl w-full">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Select Commodity
            </label>
            <select
              title="commodity"
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a commodity</option>
              {commodities.map((commodity) => (
                <option key={commodity} value={commodity}>
                  {commodity}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker with ShadCN Calendar */}
          <div className="flex-1 min-w-[200px] relative">
            <label className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <div className="relative">
              <input
                title="date"
                type="text"
                readOnly
                value={formatDate(selectedDate)}
                onClick={() => setShowCalendar(!showCalendar)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-pointer"
              />
              {showCalendar && (
                <div className="absolute top-full mt-2 left-0 z-10">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Unit Type Dropdown */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Select Unit Type
            </label>
            <select
              title="timeframe"
              value={unit}
              onChange={(e) => setUnit(e.target.value as "days" | "weeks" | "months" | "years")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>

          {/* Value Dropdown */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              Number of {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </label>
            <select
              title="number of unit"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {(unit === "days" ? daysOptions : unit === "weeks" ? weeksOptions : unit === "months" ? monthsOptions : yearsOptions).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div className="mt-4 flex gap-4">
        <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            } shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Submit
        </button>
          {/* reset button lagaya hai taki input clear hojaye */}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reset
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center mt-4">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      )}


      {/* agar data hai to table dikhani hai ya nahi */}
      {data && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowTable(!showTable)}
            className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {showTable ? "Hide Table" : "Show Table"}
          </button>
        </div>
      )}         

      {/* Render the RealTimeGraph component only if data is available */}
      {data && (
        <RealTimeGraph
          name={selectedCommodity}
          days={days}
          startDate={selectedDate ? formatDate(selectedDate) : ''}
          selectType={unit}
          noofunits={value}
          predicted_prices={data.predicted_prices}
          predicted_humidity={data.predicted_humidity}
          predicted_temperature={data.predicted_temperature}
          showTable={showTable}
        />
      )}
    </>
  );
};

export default Dropdown;

"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const commodities = [
  "Wheat",
  "Rice",
  "Onion",
  "Potato",
  "Corn",
  "Sugar",
  "Cocoa",
  "Tea",
  "Coffee",
  "Milk",
  "Bread",
  "Fish",
  "Chicken",
  "Eggs",
  "Bananas",
  "Apples",
  "Oranges",
  "Grapes",
  "Strawberries",
];

const Dropdown: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [unit, setUnit] = useState("days"); 
  const [value, setValue] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);

  const daysOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  const weeksOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const monthsOptions = Array.from({ length: 12 }, (_, i) => i + 1); 
  const yearsOptions = Array.from({ length: 7 }, (_, i) => i + 1); // 
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setShowCalendar(false); 
  };

  return (
    <div className="flex flex-wrap gap-4 pt-[100px] min-h-screen">
      {/* Commodity Dropdown */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Select Commodity
        </label>
        <select
          value={selectedCommodity}
          onChange={(e) => setSelectedCommodity(e.target.value)}
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
      <div className="flex-1 relative">
        <label className="block text-sm font-medium text-gray-700">
          Select Date
        </label>
        <div className="relative">
          <input
            type="text"
            readOnly
            value={selectedDate ? selectedDate.toDateString() : "Select a date"}
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
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Select Unit Type
        </label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
      </div>

      {/* Value Dropdown */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Number of {unit.charAt(0).toUpperCase() + unit.slice(1)}
        </label>
        <select
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
  );
};

export default Dropdown;

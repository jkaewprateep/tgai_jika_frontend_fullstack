'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Function to generate mock data
const generateMockData = () =>
  Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 8, i + 1),
    carbon: Math.floor(Math.random() * 100) + 50,
    reducedCarbon: Math.floor(Math.random() * 50) + 20,
  }));

// Filter Data by Date Range
const filterDataByDate = (data: any[], startDate: Date, endDate: Date) => {
  return data.filter((data) => data.date >= startDate && data.date <= endDate);
};

// Calculate Average Value
const calculateAverage = (data: any[], key: string) => {
  const total = data.reduce((sum, item) => sum + item[key], 0);
  return (total / data.length).toFixed(2);
};

const CarbonAreaChart: React.FC = () => {
  const defaultStartDate = new Date(2024, 8, 1);
  const defaultEndDate = new Date(2024, 8, 30);

  const [startDate, setStartDate] = useState<Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);
  const [selectedRange, setSelectedRange] = useState<string>('custom');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]); // State to store the data

  useEffect(() => {
    // Generate mock data only on the client side
    setData(generateMockData());
  }, []);

  useEffect(() => {
    const today = new Date(2024, 8, 30);

    if (selectedRange === '1') {
      setStartDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
      );
      setEndDate(today);
    } else if (selectedRange === '7') {
      setStartDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
      );
      setEndDate(today);
    } else if (selectedRange === '30') {
      setStartDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
      );
      setEndDate(today);
    }
  }, [selectedRange]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(event.target.value);
  };

  const handleStartDateChange = (date: Date | null) => {
    setSelectedRange('custom');
    if (date) setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedRange('custom');
    if (date) setEndDate(date);
  };

  const resetDates = () => {
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setSelectedRange('custom');
  };

  return (
    <div className="flex flex-col lg:flex-row p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 lg:space-y-0 lg:space-x-8">
      <div className="w-full lg:w-3/4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center lg:text-left">
          Carbon and Reduced Carbon Over Time
        </h2>

        {/* Dropdown for selecting range */}
        <div className="flex justify-center lg:justify-start space-x-4 mb-6">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="range"
              className="text-gray-700 dark:text-gray-200 font-semibold"
            >
              Select Range:
            </label>
            <select
              id="range"
              value={selectedRange}
              onChange={handleRangeChange}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all focus:ring focus:ring-blue-200 dark:focus:ring-blue-500"
            >
              <option value="custom">Custom</option>
              <option value="1">1 Day</option>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
            </select>
          </div>

          {/* Date Picker for selecting range */}
          {selectedRange === 'custom' && (
            <div className="flex justify-center lg:justify-start space-x-4 mb-6 items-end">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 dark:text-gray-200 font-semibold">
                  Start Date:
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all focus:ring focus:ring-blue-200 dark:focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 dark:text-gray-200 font-semibold">
                  End Date:
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all focus:ring focus:ring-blue-200 dark:focus:ring-blue-500"
                />
              </div>

              {/* Reset Button */}
              <div className="mb-0">
                <button
                  onClick={resetDates}
                  className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-all focus:ring focus:ring-red-200 dark:focus:ring-red-500 shadow-md"
                >
                  Reset Dates
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Area Chart */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={filterDataByDate(data, startDate, endDate)}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDarkMode ? '#4B5563' : '#e5e7eb'}
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date: Date) =>
                    date.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                    })
                  }
                  stroke={isDarkMode ? '#9CA3AF' : '#6b7280'}
                />
                <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6b7280'} />
                <Tooltip
                  labelFormatter={(date: Date) =>
                    date.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                    })
                  }
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area
                  type="monotone"
                  dataKey="carbon"
                  stroke="#4f46e5"
                  fillOpacity={0.3}
                  fill="#6366f1"
                />
                <Area
                  type="monotone"
                  dataKey="reducedCarbon"
                  stroke="#10b981"
                  fillOpacity={0.3}
                  fill="#34d399"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Average Circles */}
      <div className="w-full lg:w-1/4 flex flex-col items-center justify-center space-y-6">
        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-lg">
          <div className="text-center text-white">
            <p className="text-lg font-semibold">Average Carbon</p>
            <p className="text-3xl font-bold">
              {calculateAverage(
                filterDataByDate(data, startDate, endDate),
                'carbon'
              )}
            </p>
          </div>
        </div>

        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-green-400 to-green-500 dark:from-green-600 dark:to-green-700 flex items-center justify-center shadow-lg">
          <div className="text-center text-white">
            <p className="text-lg font-semibold">Average Reduced Carbon</p>
            <p className="text-3xl font-bold">
              {calculateAverage(
                filterDataByDate(data, startDate, endDate),
                'reducedCarbon'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonAreaChart;

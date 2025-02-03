'use client';

import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

// Description for the chart
export const description = 'A stacked bar chart';

// Sample data structure for the chart
const initialData = [
  { date: 'Day 1', carbon: 100, carbonReduce: 50 },
  // Add more data points as needed
];

function CarbonChart() {
  const [chartData, setChartData] = useState(initialData);
  const [carbon, setCarbon] = useState<number>(100); // Initial value
  const [carbonReduce, setCarbonReduce] = useState<number>(50); // Initial value

  // Update chart data based on the input values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCarbon(value);
    setCarbonReduce(value / 2);
    setChartData([
      { date: 'Day 1', carbon: value, carbonReduce: value / 2 },
      // You can add more data points or adjust as needed
    ]);
  };

  // Reset to initial values
  const handleReset = () => {
    setCarbon(0);
    setCarbonReduce(0);
    setChartData([{ date: 'Day 1', carbon: 0, carbonReduce: 0 }]);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bar Chart - Stacked</CardTitle>
          <CardDescription>
            Showing monthly carbon emissions and reductions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={245}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="carbon" fill="#8884d8" />
              <Bar dataKey="carbonReduce" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        {/* <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{' '}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Day 1 - Day 31
              </div>
            </div>
          </div>
        </CardFooter> */}
      </Card>

      {/* <input
        type="number"
        value={carbon === 0 ? '' : carbon} // Show empty string if carbon is 0
        onChange={handleInputChange}
        className="text-cyan-700 mb-4 p-2 border rounded w-32"
        placeholder="Carbon value"
      />
      <button
        onClick={handleReset}
        className="mb-4 p-2 border rounded bg-gray-200 hover:bg-gray-300"
      >
        Reset
      </button>

      <div className="w-1/4 mt-4 flex flex-col items-start text-sm">
        <p>Carbon: {carbon} kg</p>
        <p>Carbon Reduce: {carbonReduce} kg</p>
      </div> */}
    </div>
  );
}

export default CarbonChart;

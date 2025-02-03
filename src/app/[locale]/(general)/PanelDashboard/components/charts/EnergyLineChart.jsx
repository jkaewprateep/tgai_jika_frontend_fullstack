// components/charts/EnergyLineChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const EnergyLineChart = ({ data, color = "#00ffff" }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="time" 
          stroke="#00ffff"
          tick={{ fill: '#00ffff' }}
        />
        <YAxis 
          stroke="#00ffff"
          tick={{ fill: '#00ffff' }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnergyLineChart;
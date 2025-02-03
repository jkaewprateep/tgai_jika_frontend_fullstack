// components/charts/BarChart.jsx
import React from 'react';

const BarChart = ({ value, maxValue, label }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-cyan-300">{label}</span>
      <div className="flex-1 h-4 bg-[#003333] rounded-full overflow-hidden">
        <div 
          className="h-full bg-cyan-300 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-32 text-right text-cyan-300">
        {value.toLocaleString('th-TH', { maximumFractionDigits: 2 })}
      </span>
    </div>
  );
};

export default BarChart;

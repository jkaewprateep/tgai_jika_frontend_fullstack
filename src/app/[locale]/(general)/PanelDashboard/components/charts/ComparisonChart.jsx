// components/charts/ComparisonChart.jsx
import React from 'react';

const ComparisonChart = ({ onPeak, offPeak }) => {
  const maxHeight = Math.max(onPeak, offPeak);
  const scale = 100 / maxHeight;

  return (
    <div className="flex justify-around items-end h-40">
      <div className="text-center">
        <div 
          className="w-8 bg-cyan-300 transition-all duration-500"
          style={{ height: `${onPeak * scale}%` }}
        />
        <div className="mt-2 text-cyan-300">OnPeak</div>
        <div className="text-cyan-300">{onPeak}%</div>
      </div>
      <div className="text-center">
        <div 
          className="w-8 bg-cyan-300 transition-all duration-500"
          style={{ height: `${offPeak * scale}%` }}
        />
        <div className="mt-2 text-cyan-300">OffPeak</div>
        <div className="text-cyan-300">{offPeak}%</div>
      </div>
    </div>
  );
};

export default ComparisonChart;

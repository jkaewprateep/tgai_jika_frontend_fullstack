// src/app/[locale]/PanelDashboard/components/charts/RevenueChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const data = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 3600 },
    { name: 'Wed', value: 2800 },
    { name: 'Thu', value: 4200 },
    { name: 'Fri', value: 3200 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 2900 },
  ];

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis hide={true} />
        <Bar dataKey="value" fill="#FDB022" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
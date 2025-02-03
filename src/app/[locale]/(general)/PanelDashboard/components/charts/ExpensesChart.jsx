// src/app/[locale]/PanelDashboard/components/charts/ExpensesChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const ExpensesChart = () => {
  const data = [
    { name: 'Mon', value: 1800 },
    { name: 'Tue', value: 1200 },
    { name: 'Wed', value: 2100 },
    { name: 'Thu', value: 1600 },
    { name: 'Fri', value: 2400 },
    { name: 'Sat', value: 1900 },
    { name: 'Sun', value: 2200 },
  ];

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis hide={true} />
        <Bar dataKey="value" fill="#F97066" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpensesChart;
// src/app/[locale]/PanelDashboard/page.tsx
'use client';

import React from 'react';
import MDBCabinet from './components/cabinet/MDBCabinet';
import RevenueChart from './components/charts/RevenueChart';
import ExpensesChart from './components/charts/ExpensesChart';
import GanttChart from '@/components/chart/GanttChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const PanelDashboard: React.FC = () => {
  return (
    <div className="p-4 min-h-screen max-h-screen flex flex-col">
      {/* Header - ทำให้กะทัดรัดขึ้น */}
      <div className="mb-2">
        <h1 className="text-xl font-bold">Electrical Panel Dashboard</h1>
        <p className="text-sm text-gray-600">LIMBIC SYSTEM (SC)</p>
      </div>

      {/* Content Container */}
      <div className="flex-1 space-y-2 overflow-hidden">
        {/* Stats Cards - ลดความสูง */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-[#fff5e6] rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm text-gray-600">Revenue</h3>
                <p className="text-2xl font-bold">$950,031</p>
              </div>
              <div className="bg-white rounded-full px-2 py-0.5 text-sm">25+</div>
            </div>
            <div className="h-24"> {/* กำหนดความสูงชัดเจน */}
              <RevenueChart />
            </div>
          </div>

          <div className="p-4 bg-[#ffe6e6] rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm text-gray-600">Expenses</h3>
                <p className="text-2xl font-bold">$234,390</p>
              </div>
              <button className="bg-white w-6 h-6 rounded-full flex items-center justify-center text-sm">+</button>
            </div>
            <div className="h-4">
              <ExpensesChart />
            </div>
          </div>

          <div className="p-4 bg-[#e6ffe6] rounded-lg">
            <h3 className="text-sm text-gray-600">Important</h3>
            <h2 className="text-2xl font-bold">Power Status</h2>
            <p className="text-sm text-gray-600 mt-2">All systems operating normally</p>
          </div>
        </div>

        {/* Cabinet and Gantt Chart Container */}
        <div className="grid grid-rows-2 gap-2 flex-1">
          {/* Cabinet Section - เพิ่มความสูงเป็น 700px */}
          <div className="p-4 rounded-lg -mt-12">
            <div className="h-[550px]">
              <MDBCabinet />
            </div>
          </div>

          {/* Gantt Chart */}
          <Card className="overflow-hidden">
            <CardHeader className="py-2">
              <CardTitle className="text-sm">Gantt Chart</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-[50px]"> {/* กำหนดความสูงชัดเจน */}
                <GanttChart />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PanelDashboard;
// SchedulePage.tsx
'use client';

import { Schedule } from '@/types';
import React, { useState, useEffect } from 'react';
import { initialMonthlyTasks, initialSchedules } from './mockData';
import AllTasks from './AllTasks';
import MonthlyTasks from './MonthlyTasks';

const SchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [monthlyTasks, setMonthlyTasks] =
    useState<Schedule[]>(initialMonthlyTasks);
  const [activeTab, setActiveTab] = useState<'allTasks' | 'monthlyTasks'>(
    'allTasks'
  );

  // State สำหรับฟอร์มของ All Tasks
  const [formValues, setFormValues] = useState({
    month: 'October 2024',
    startDate: '2024-10-01',
    department: '',
    endDate: '2024-10-31',
    pmStatus: '',
    machinePriority: '',
    checkSheetType: 'All',
    location: 'All',
    machine: '',
    year: '2024',
  });

  // State สำหรับฟอร์มของ Monthly Tasks
  const [monthlyFormValues, setMonthlyFormValues] = useState({
    year: '2024',
    month: 'January',
    startDate: '2024-01-01',
    department: '',
    endDate: '2024-12-31',
    pmStatus: '',
    machinePriority: '',
    checkSheetType: 'All',
    location: 'All',
    machine: '',
  });

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของฟอร์ม
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (activeTab === 'allTasks') {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    } else {
      setMonthlyFormValues({
        ...monthlyFormValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  // ฟังก์ชันสำหรับการแสดงข้อมูลตามฟิลเตอร์ (All Tasks)
  const filteredSchedules = schedules.filter((schedule) => {
    const isTypeMatch =
      schedule.checkSheetType === formValues.checkSheetType ||
      formValues.checkSheetType === 'All';
    // คุณสามารถเพิ่มเงื่อนไขการกรองเพิ่มเติมได้ที่นี่
    return isTypeMatch;
  });

  // ฟังก์ชันสำหรับการแสดงข้อมูลตามฟิลเตอร์ (Monthly Tasks)
  const filteredMonthlyTasks = monthlyTasks.filter((task) => {
    const isTypeMatch =
      task.checkSheetType === monthlyFormValues.checkSheetType ||
      monthlyFormValues.checkSheetType === 'All';
    // คุณสามารถเพิ่มเงื่อนไขการกรองเพิ่มเติมได้ที่นี่
    return isTypeMatch;
  });

  // ฟังก์ชันสำหรับการย้ายแผน PM/AM
  const handleMovePlan = () => {
    alert('ฟังก์ชันการย้ายแผน PM/AM ยังไม่ได้ถูกพัฒนา');
  };

  // ฟังก์ชันสำหรับการสร้างคอลัมน์วันที่ (All Tasks)
  const generateDayColumns = () => {
    const startDate = new Date(formValues.startDate);
    const endDate = new Date(formValues.endDate);
    const dayColumns = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dayColumns.push(
        <th key={currentDate.toDateString()} className="p-2 text-center">
          {currentDate.getDate()}
        </th>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dayColumns;
  };

  // ฟังก์ชันสำหรับการสร้างเซลล์วันที่ (All Tasks)
  const generateDayCells = (schedule: Schedule) => {
    const startDate = new Date(formValues.startDate);
    const endDate = new Date(formValues.endDate);
    const dayCells = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      const isChecked = schedule.selectedDates?.includes(dateString);
      dayCells.push(
        <td key={currentDate.toDateString()} className="p-2 text-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleDateCheckboxChange(schedule.id, dateString)}
          />
        </td>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dayCells;
  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของ Checkbox (All Tasks)
  const handleDateCheckboxChange = (scheduleId: number, date: string) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) => {
        if (schedule.id === scheduleId) {
          const selectedDates = schedule.selectedDates || [];
          if (selectedDates.includes(date)) {
            // เอาออก
            return {
              ...schedule,
              selectedDates: selectedDates.filter((d) => d !== date),
            };
          } else {
            // เพิ่มเข้าไป
            return {
              ...schedule,
              selectedDates: [...selectedDates, date],
            };
          }
        }
        return schedule;
      })
    );
  };

  // ฟังก์ชันสำหรับการสร้างคอลัมน์เดือน (Monthly Tasks)
  const generateMonthColumns = () => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return months.map((month, index) => (
      <th key={month} className="p-2 text-center">
        {month}
      </th>
    ));
  };

  // ฟังก์ชันสำหรับการสร้างเซลล์เดือน (Monthly Tasks)
  const generateMonthCells = (task: Schedule) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return months.map((month) => {
      const isChecked = task.selectedMonths?.includes(month);
      return (
        <td key={month} className="p-2 text-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleMonthCheckboxChange(task.id, month)}
          />
        </td>
      );
    });
  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของ Checkbox (Monthly Tasks)
  const handleMonthCheckboxChange = (taskId: number, month: number) => {
    setMonthlyTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const selectedMonths = task.selectedMonths || [];
          if (selectedMonths.includes(month)) {
            // เอาออก
            return {
              ...task,
              selectedMonths: selectedMonths.filter((m) => m !== month),
            };
          } else {
            // เพิ่มเข้าไป
            return {
              ...task,
              selectedMonths: [...selectedMonths, month],
            };
          }
        }
        return task;
      })
    );
  };

  return (
    <div className="mx-auto p-6 h-screen overflow-auto bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Schedule
        </h1>
        <div className="flex items-center space-x-2">
          <button className="bg-red-500 text-white py-1 px-3 rounded dark:bg-red-700">
            Instruction
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 ${
              activeTab === 'allTasks'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('allTasks')}
          >
            All Tasks
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === 'monthlyTasks'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('monthlyTasks')}
          >
            Monthly Tasks
          </button>
        </div>
      </div>

      {/* All Tasks Section */}
      {activeTab === 'allTasks' && (
        <AllTasks
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleMovePlan={handleMovePlan}
          filteredSchedules={filteredSchedules}
          generateDayColumns={generateDayColumns}
          generateDayCells={generateDayCells}
          handleDateCheckboxChange={handleDateCheckboxChange}
        />
      )}

      {/* Monthly Tasks Section */}
      {activeTab === 'monthlyTasks' && (
        <MonthlyTasks
          formValues={monthlyFormValues}
          handleInputChange={handleInputChange}
          handleMovePlan={handleMovePlan}
          filteredMonthlyTasks={filteredMonthlyTasks}
          generateMonthColumns={generateMonthColumns}
          generateMonthCells={generateMonthCells}
          handleMonthCheckboxChange={handleMonthCheckboxChange}
        />
      )}
    </div>
  );
};

export default SchedulePage;

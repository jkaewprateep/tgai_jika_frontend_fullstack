// components/AllTasks.tsx
'use client';

import { Schedule } from '@/types';
import React from 'react';

interface AllTasksProps {
  formValues: {
    month: string;
    startDate: string;
    department: string;
    endDate: string;
    pmStatus: string;
    machinePriority: string;
    checkSheetType: string;
    location: string;
    machine: string;
    year: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleMovePlan: () => void;
  filteredSchedules: Schedule[];
  generateDayColumns: () => JSX.Element[];
  generateDayCells: (schedule: Schedule) => JSX.Element[];
  handleDateCheckboxChange: (scheduleId: number, date: string) => void;
}

const AllTasks: React.FC<AllTasksProps> = ({
  formValues,
  handleInputChange,
  handleMovePlan,
  filteredSchedules,
  generateDayColumns,
  generateDayCells,
  handleDateCheckboxChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Month */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Month
          </label>
          <select
            name="month"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.month}
            onChange={handleInputChange}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Year
          </label>
          <select
            name="year"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.year}
            onChange={handleInputChange}
          >
            {Array.from({ length: 5 }, (_, index) => {
              const year = new Date().getFullYear() + index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Department
          </label>
          <input
            type="text"
            name="department"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Department"
            value={formValues.department}
            onChange={handleInputChange}
          />
        </div>
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.startDate}
            onChange={handleInputChange}
          />
        </div>
        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.endDate}
            onChange={handleInputChange}
          />
        </div>
        {/* PM Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            PM Status
          </label>
          <input
            type="text"
            name="pmStatus"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Select PM status"
            value={formValues.pmStatus}
            onChange={handleInputChange}
          />
        </div>
        {/* Machine Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Machine Priority
          </label>
          <input
            type="text"
            name="machinePriority"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Select machine priority"
            value={formValues.machinePriority}
            onChange={handleInputChange}
          />
        </div>
        {/* Check Sheet Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Check Sheet Type
          </label>
          <select
            name="checkSheetType"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.checkSheetType}
            onChange={handleInputChange}
          >
            <option value="All">All</option>
            <option value="PM">PM</option>
            <option value="AM">AM</option>
          </select>
        </div>
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <select
            name="location"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.location}
            onChange={handleInputChange}
          >
            <option value="All">All</option>
            <option value="Factory">Factory</option>
            <option value="Warehouse">Warehouse</option>
          </select>
        </div>
        {/* Machine / Device */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Machine / Device
          </label>
          <input
            type="text"
            name="machine"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Select Machine / Device"
            value={formValues.machine}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleMovePlan}
          className="bg-blue-600 text-white py-2 px-4 rounded dark:bg-blue-800"
        >
          Move PM/AM Plan
        </button>
      </div>

      {/* Schedule Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="p-2 text-left text-gray-700 dark:text-gray-300">
                Checksheet
              </th>
              <th className="p-2 text-center text-gray-700 dark:text-gray-300">
                Check Sheet Type
              </th>
              <th className="p-2 text-center text-gray-700 dark:text-gray-300">
                Frequency (Day)
              </th>
              {generateDayColumns()}
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.map((schedule) => (
              <tr key={schedule.id} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-900 dark:text-gray-200">
                  {schedule.checkSheet}
                </td>
                <td className="p-2 text-center text-gray-900 dark:text-gray-200">
                  {schedule.checkSheetType}
                </td>
                <td className="p-2 text-center text-gray-900 dark:text-gray-200">
                  {schedule.frequency}
                </td>
                {generateDayCells(schedule)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllTasks;

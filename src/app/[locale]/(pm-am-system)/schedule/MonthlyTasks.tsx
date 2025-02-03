// components/MonthlyTasks.tsx
'use client';

import { Schedule } from '@/types';
import React from 'react';

interface MonthlyTasksProps {
  formValues: {
    year: string;
    month: string;
    startDate: string;
    department: string;
    endDate: string;
    pmStatus: string;
    machinePriority: string;
    checkSheetType: string;
    location: string;
    machine: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleMovePlan: () => void;
  filteredMonthlyTasks: Schedule[];
  generateMonthColumns: () => JSX.Element[];
  generateMonthCells: (task: Schedule) => JSX.Element[];
  handleMonthCheckboxChange: (taskId: number, month: number) => void;
}

const MonthlyTasks: React.FC<MonthlyTasksProps> = ({
  formValues,
  handleInputChange,
  handleMovePlan,
  filteredMonthlyTasks,
  generateMonthColumns,
  generateMonthCells,
  handleMonthCheckboxChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Month (Read-Only Text Field) */}
        <input
          type="text"
          name="month"
          className="border p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          placeholder="Month"
          value={formValues.month}
          readOnly
        />

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date:
          </label>
          <input
            type="date"
            name="startDate"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.startDate}
            onChange={handleInputChange}
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Department:
          </label>
          <select
            name="department"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.department}
            onChange={handleInputChange}
          >
            <option value="">Select Department</option>
            <option value="Production">Production</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date:
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
            PM Status:
          </label>
          <select
            name="pmStatus"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.pmStatus}
            onChange={handleInputChange}
          >
            <option value="">Select PM Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        {/* Machine Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Machine Priority:
          </label>
          <select
            name="machinePriority"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={formValues.machinePriority}
            onChange={handleInputChange}
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Check Sheet Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Check Sheet Type:
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
            Location:
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
            <option value="Office">Office</option>
          </select>
        </div>

        {/* Machine / Device */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Machine / Device:
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

      {/* Monthly Tasks Table */}
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
              {generateMonthColumns()}
            </tr>
          </thead>
          <tbody>
            {filteredMonthlyTasks.map((task) => (
              <tr key={task.id} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-900 dark:text-gray-200">
                  {task.checkSheet}
                </td>
                <td className="p-2 text-center text-gray-900 dark:text-gray-200">
                  {task.checkSheetType}
                </td>
                <td className="p-2 text-center text-gray-900 dark:text-gray-200">
                  {task.frequency}
                </td>
                {generateMonthCells(task)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonthlyTasks;

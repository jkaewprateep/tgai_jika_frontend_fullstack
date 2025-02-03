// components/PMHistoryPage.tsx
'use client';

import { PMHistory } from '@/types';
import React, { useState, useEffect } from 'react';
import { mockData } from './mockData';
import * as XLSX from 'xlsx';

const PMHistoryPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('2024-10-01');
  const [endDate, setEndDate] = useState<string>('2024-10-31');
  const [device, setDevice] = useState<string>('');
  const [jobId, setJobId] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [checklistType, setChecklistType] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [filteredData, setFilteredData] = useState<PMHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Pagination state
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Dark Mode state

  const handleShowData = () => {
    setIsLoading(true); // เริ่มสถานะโหลด
    setTimeout(() => {
      // Filter the data after 2 seconds
      const filtered = mockData.filter((item) => {
        const finishDate = new Date(item.finishDate);
        const start = new Date(startDate);
        const end = new Date(endDate);

        const isWithinDateRange = finishDate >= start && finishDate <= end;
        const isDeviceMatch =
          device === '' ||
          item.device.toLowerCase().includes(device.toLowerCase());
        const isJobIdMatch =
          jobId === '' ||
          item.jobId.toLowerCase().includes(jobId.toLowerCase());
        const isDepartmentMatch =
          department === '' || item.department === department;
        const isChecklistTypeMatch =
          checklistType === '' || item.checklistType === checklistType;
        const isUserMatch = user === '' || item.user === user;

        return (
          isWithinDateRange &&
          isDeviceMatch &&
          isJobIdMatch &&
          isDepartmentMatch &&
          isChecklistTypeMatch &&
          isUserMatch
        );
      });

      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page
      setIsLoading(false); // ปิดสถานะโหลดหลังการโหลดเสร็จ
    }, 2000);
  };

  const handleClearFilters = () => {
    setStartDate('2024-10-01');
    setEndDate('2024-10-31');
    setDevice('');
    setJobId('');
    setDepartment('');
    setChecklistType('');
    setUser('');
    setFilteredData([]);
  };

  const handleDownloadCSV = () => {
    if (filteredData.length === 0) {
      alert('No data to download.');
      return;
    }

    const csvContent = [
      [
        'Finish Date',
        'Device',
        'Job ID',
        'Department',
        'Checklist Type',
        'User',
      ],
      ...filteredData.map((item) => [
        item.finishDate,
        item.device,
        item.jobId,
        item.department,
        item.checklistType,
        item.user,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'PM_History.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key: keyof PMHistory) => {
    setFilteredData((prevData) =>
      [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      })
    );
  };

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          History
        </h1>
        <div className="flex items-center space-x-2">
          <button className="bg-red-500 text-white py-1 px-3 rounded dark:bg-red-700">
            Instruction
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Start Date
          </label>
          <input
            type="date"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            End Date
          </label>
          <input
            type="date"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Device / Machine
          </label>
          <input
            type="text"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            PM/AM Job ID
          </label>
          <input
            type="text"
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Department
          </label>
          <select
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">-- Please Select --</option>
            <option value="Department A">Department A</option>
            <option value="Department B">Department B</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Checklist Type
          </label>
          <select
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={checklistType}
            onChange={(e) => setChecklistType(e.target.value)}
          >
            <option value="">-- Please Select --</option>
            <option value="PM">PM</option>
            <option value="AM">AM</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            User
          </label>
          <select
            className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            <option value="">-- Please Select --</option>
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded dark:bg-blue-800"
          onClick={handleShowData}
        >
          {isLoading ? 'Loading...' : 'Show Data'}
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded dark:bg-gray-700"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
        <button
          className="bg-green-600 text-white py-2 px-4 rounded dark:bg-green-800"
          onClick={handleDownloadCSV}
        >
          Download CSV
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading data, please wait...
        </p>
      )}

      {/* Data Table */}
      {!isLoading && filteredData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th
                  onClick={() => handleSort('finishDate')}
                  className="p-2 text-left cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  Finish Date
                </th>
                <th
                  onClick={() => handleSort('device')}
                  className="p-2 text-left cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  Device
                </th>
                <th
                  onClick={() => handleSort('jobId')}
                  className="p-2 text-left cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  Job ID
                </th>
                <th
                  onClick={() => handleSort('department')}
                  className="p-2 text-left cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  Department
                </th>
                <th
                  onClick={() => handleSort('checklistType')}
                  className="p-2 text-left cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  Checklist Type
                </th>
                <th
                  onClick={() => handleSort('user')}
                  className="p-2 text-left cursor-pointer text-gray-700 dark:text-gray-300"
                >
                  User
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="p-2 text-gray-900 dark:text-gray-200">
                    {item.finishDate}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-200">
                    {item.device}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-200">
                    {item.jobId}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-200">
                    {item.department}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-200">
                    {item.checklistType}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-200">
                    {item.user}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed dark:border-gray-700'
                : 'dark:border-gray-700'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed dark:border-gray-700'
                : 'dark:border-gray-700'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <p className="text-gray-500 dark:text-gray-400">No data to display.</p>
      )}
    </div>
  );
};

export default PMHistoryPage;

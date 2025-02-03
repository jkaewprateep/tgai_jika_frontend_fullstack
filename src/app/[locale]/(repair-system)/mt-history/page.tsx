'use client';

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import mockData from './mockData';

interface RepairRecord {
  id: number;
  repairNo: string;
  dateRequested: string;
  dateResolved: string;
  qrCode: string;
  device: string;
  cause: string;
  solution: string;
  repairedBy: string;
}

type SortOrder = 'asc' | 'desc';

export default function RepairHistory() {
  const [data, setData] = useState<RepairRecord[]>(mockData);
  const [filteredData, setFilteredData] = useState<RepairRecord[]>([]);
  const [sortedData, setSortedData] = useState<RepairRecord[]>([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  type SearchByKey = 'dateRequested' | 'dateResolved';
  const [searchBy, setSearchBy] = useState<SearchByKey>('dateRequested');
  const [selectedRecord, setSelectedRecord] = useState<RepairRecord | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [sortConfig, setSortConfig] = useState<{
    key: keyof RepairRecord;
    direction: SortOrder;
  } | null>(null);

  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    device: '',
    repairedBy: '',
    qrCode: '',
  });

  // การกรองข้อมูล
  useEffect(() => {
    let filtered = data;

    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item[searchBy]);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      });
    }

    if (advancedFilters.device) {
      filtered = filtered.filter((item) =>
        item.device.toLowerCase().includes(advancedFilters.device.toLowerCase())
      );
    }

    if (advancedFilters.repairedBy) {
      filtered = filtered.filter((item) =>
        item.repairedBy
          .toLowerCase()
          .includes(advancedFilters.repairedBy.toLowerCase())
      );
    }

    if (advancedFilters.qrCode) {
      filtered = filtered.filter((item) =>
        item.qrCode.toLowerCase().includes(advancedFilters.qrCode.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, startDate, endDate, searchBy, advancedFilters]);

  // การเรียงลำดับข้อมูล
  useEffect(() => {
    let sortableData = [...filteredData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const key = sortConfig.key;
        if (a[key] < b[key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedData(sortableData);
    setCurrentPage(1);
  }, [filteredData, sortConfig]);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Repair History');
    XLSX.writeFile(workbook, 'RepairHistory.xlsx');
  };

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSort = (key: keyof RepairRecord) => {
    let direction: SortOrder = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="h-screen overflow-auto mx-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-xl md:text-2xl font-bold text-blue-500 dark:text-blue-400 mb-4 md:mb-6">
        Repair History
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 items-center">
        <div className="col-span-1">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Search By
          </label>
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as SearchByKey)}
            className="block w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          >
            <option value="dateRequested">Date requested to repair</option>
            <option value="dateResolved">Date resolved</option>
          </select>
        </div>

        <div className="col-span-2 flex items-center justify-between md:justify-center">
          <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
            <div className="mt-2 md:mt-0">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 flex justify-start md:justify-end">
          <button
            className="px-4 py-2 border border-blue-400 text-blue-500 rounded-md shadow-md hover:bg-blue-50 dark:hover:bg-blue-900"
            onClick={() => setIsAdvancedFilterOpen(true)}
          >
            Advanced Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => {}}
        >
          Search
        </button>
        <button
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900"
          onClick={handleDownloadExcel}
        >
          Download All Excel
        </button>
      </div>

      <div className="mt-6 overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th
                className="py-2 px-4 text-start cursor-pointer"
                onClick={() => handleSort('repairNo')}
              >
                Repair No.
                {sortConfig?.key === 'repairNo'
                  ? sortConfig.direction === 'asc'
                    ? ' ▲'
                    : ' ▼'
                  : ''}
              </th>
              <th
                className="py-2 px-4 text-start cursor-pointer"
                onClick={() => handleSort('dateRequested')}
              >
                Date Requested
                {sortConfig?.key === 'dateRequested'
                  ? sortConfig.direction === 'asc'
                    ? ' ▲'
                    : ' ▼'
                  : ''}
              </th>
              <th
                className="py-2 px-4 text-start cursor-pointer"
                onClick={() => handleSort('dateResolved')}
              >
                Date Resolved
                {sortConfig?.key === 'dateResolved'
                  ? sortConfig.direction === 'asc'
                    ? ' ▲'
                    : ' ▼'
                  : ''}
              </th>
              <th
                className="py-2 px-4 text-start cursor-pointer"
                onClick={() => handleSort('qrCode')}
              >
                Internal S/N (QR Code)
                {sortConfig?.key === 'qrCode'
                  ? sortConfig.direction === 'asc'
                    ? ' ▲'
                    : ' ▼'
                  : ''}
              </th>
              <th
                className="py-2 px-4 text-start cursor-pointer"
                onClick={() => handleSort('device')}
              >
                Device / Machine Type
                {sortConfig?.key === 'device'
                  ? sortConfig.direction === 'asc'
                    ? ' ▲'
                    : ' ▼'
                  : ''}
              </th>
              <th className="py-2 px-4 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <tr
                  key={item.id}
                  className="text-sm md:text-base hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="py-2 px-4">{item.repairNo}</td>
                  <td className="py-2 px-4">{item.dateRequested}</td>
                  <td className="py-2 px-4">{item.dateResolved}</td>
                  <td className="py-2 px-4">{item.qrCode}</td>
                  <td className="py-2 px-4">{item.device}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                      onClick={() => setSelectedRecord(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-sm md:text-base">
                <td
                  className="py-2 px-4 text-center text-gray-600 dark:text-gray-400"
                  colSpan={6}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md max-w-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Repair Details
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Repair No.:</strong> {selectedRecord.repairNo}
              </p>
              <p>
                <strong>Date Requested:</strong> {selectedRecord.dateRequested}
              </p>
              <p>
                <strong>Date Resolved:</strong> {selectedRecord.dateResolved}
              </p>
              <p>
                <strong>Internal S/N (QR Code):</strong> {selectedRecord.qrCode}
              </p>
              <p>
                <strong>Device / Machine Type:</strong> {selectedRecord.device}
              </p>
              <p>
                <strong>Root Cause:</strong> {selectedRecord.cause}
              </p>
              <p>
                <strong>Solution:</strong> {selectedRecord.solution}
              </p>
              <p>
                <strong>Repaired By:</strong> {selectedRecord.repairedBy}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isAdvancedFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Advanced Filters
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <label className="block mb-2">Device Type:</label>
                <input
                  type="text"
                  value={advancedFilters.device}
                  onChange={(e) =>
                    setAdvancedFilters({
                      ...advancedFilters,
                      device: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Repaired By:</label>
                <input
                  type="text"
                  value={advancedFilters.repairedBy}
                  onChange={(e) =>
                    setAdvancedFilters({
                      ...advancedFilters,
                      repairedBy: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">QR Code:</label>
                <input
                  type="text"
                  value={advancedFilters.qrCode}
                  onChange={(e) =>
                    setAdvancedFilters({
                      ...advancedFilters,
                      qrCode: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => {
                  setAdvancedFilters({
                    device: '',
                    repairedBy: '',
                    qrCode: '',
                  });
                  setIsAdvancedFilterOpen(false);
                }}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => {
                  setIsAdvancedFilterOpen(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

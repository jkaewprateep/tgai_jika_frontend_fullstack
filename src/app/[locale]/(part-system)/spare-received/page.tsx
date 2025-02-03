'use client';

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaDownload, FaPrint } from 'react-icons/fa';
import { initialSparePartsReceived } from './mockData';
import { SparePartReceived } from '@/types';

const SparePartReceivedPage: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePartReceived[]>(
    initialSparePartsReceived
  );
  const [filteredSpareParts, setFilteredSpareParts] = useState<
    SparePartReceived[]
  >(initialSparePartsReceived);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    handleShowData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const handleShowData = () => {
    if (!startDate || !endDate) {
      setFilteredSpareParts(spareParts);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = spareParts.filter((part) => {
      const [day, month, year] = part.receiveDate.split('/');
      const partDate = new Date(`${year}-${month}-${day}`);
      return partDate >= start && partDate <= end;
    });
    setFilteredSpareParts(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const handleDownload = () => {
    if (filteredSpareParts.length === 0) {
      alert('No data to download.');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredSpareParts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Spare_Parts_Received');
    XLSX.writeFile(workbook, 'Spare_Parts_Received.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredSpareParts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSpareParts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        Spare Part Received
      </h1>

      {/* Date Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            From
          </label>
          <input
            type="date"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            To
          </label>
          <input
            type="date"
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mb-6 flex flex-wrap space-x-4">
        <button
          className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
          onClick={handleShowData}
        >
          Show Data
        </button>
        <button
          className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
          onClick={handleDownload}
        >
          <FaDownload className="mr-2" />
          Download
        </button>
        <button
          className="bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
          onClick={handlePrint}
        >
          <FaPrint className="mr-2" />
          Print
        </button>
      </div>

      {/* Spare Parts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700 mb-6">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Receive Date
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                PO No.
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Spare Part Code
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Spare Part
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Warehouse
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Brand
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Supplier
              </th>
              <th className="p-2 text-right text-gray-700 dark:text-gray-300 font-semibold">
                Receive Amount
              </th>
              <th className="p-2 text-right text-gray-700 dark:text-gray-300 font-semibold">
                Price
              </th>
              <th className="p-2 text-right text-gray-700 dark:text-gray-300 font-semibold">
                Total
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Spare Unit
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Received By
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((part) => (
                <tr
                  key={part.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.receiveDate}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.poNumber}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.sparePartCode}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.sparePartName}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.warehouse}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.brand}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.supplier}
                  </td>
                  <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                    {part.receiveAmount}
                  </td>
                  <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                    {part.price}
                  </td>
                  <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                    {part.total}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.spareUnit}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.receivedByUser}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="p-2 text-center text-gray-500 dark:text-gray-400"
                >
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <span className="text-gray-600 dark:text-gray-300 mb-2 md:mb-0">
          Showing {indexOfFirstItem + 1} to{' '}
          {indexOfLastItem > filteredSpareParts.length
            ? filteredSpareParts.length
            : indexOfLastItem}{' '}
          of {filteredSpareParts.length} entries
        </span>
        <div className="flex items-center space-x-1">
          <button
            className={`py-1 px-3 border dark:border-gray-700 rounded-l ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            } transition-colors duration-300`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                className={`py-1 px-3 border dark:border-gray-700 ${
                  currentPage === number
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                } transition-colors duration-300`}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </button>
            )
          )}
          <button
            className={`py-1 px-3 border dark:border-gray-700 rounded-r ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            } transition-colors duration-300`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SparePartReceivedPage;

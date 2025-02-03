'use client';

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaDownload, FaPrint } from 'react-icons/fa';
import { SparePartHistory } from '@/types';
import { initialSparePartHistory } from './mockData';

const SparePartHistoryPage: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePartHistory[]>(
    initialSparePartHistory
  );
  const [activeTab, setActiveTab] = useState<
    'sparePartHistory' | 'incomingSparePart'
  >('sparePartHistory');
  const [searchParams, setSearchParams] = useState({
    fromDate: '',
    toDate: '',
    department: '',
    machineType: '',
    customerName: '',
  });
  const [filteredSpareParts, setFilteredSpareParts] = useState<
    SparePartHistory[]
  >(initialSparePartHistory);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = () => {
    // Filter logic based on search parameters
    const filtered = spareParts.filter((part) => {
      const isWithinDateRange =
        (!searchParams.fromDate ||
          new Date(part.openedDate) >= new Date(searchParams.fromDate)) &&
        (!searchParams.toDate ||
          new Date(part.closedDate) <= new Date(searchParams.toDate));

      const isDepartmentMatch =
        searchParams.department === '' ||
        part.department
          .toLowerCase()
          .includes(searchParams.department.toLowerCase());

      const isMachineTypeMatch =
        searchParams.machineType === '' ||
        part.machineType
          .toLowerCase()
          .includes(searchParams.machineType.toLowerCase());

      const isCustomerNameMatch =
        searchParams.customerName === '' ||
        part.customerName
          .toLowerCase()
          .includes(searchParams.customerName.toLowerCase());

      return (
        isWithinDateRange &&
        isDepartmentMatch &&
        isMachineTypeMatch &&
        isCustomerNameMatch
      );
    });
    setFilteredSpareParts(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleDownload = () => {
    if (filteredSpareParts.length === 0) {
      alert('No data to download.');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredSpareParts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Spare_Part_History');
    XLSX.writeFile(workbook, 'Spare_Part_History.xlsx');
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
        Spare Part History
      </h1>

      {/* Tabs */}
      <div className="border-b mb-6">
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === 'sparePartHistory'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
          } transition-colors duration-300`}
          onClick={() => setActiveTab('sparePartHistory')}
        >
          Spare Part History
        </button>
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === 'incomingSparePart'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
          } transition-colors duration-300`}
          onClick={() => setActiveTab('incomingSparePart')}
        >
          Incoming Spare Part
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'sparePartHistory' && (
        <>
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                From Date
              </label>
              <input
                type="date"
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600 transition-colors duration-300"
                value={searchParams.fromDate}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, fromDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                To Date
              </label>
              <input
                type="date"
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600 transition-colors duration-300"
                value={searchParams.toDate}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, toDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Department
              </label>
              <input
                type="text"
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600 transition-colors duration-300"
                placeholder="Department"
                value={searchParams.department}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    department: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Machine Type
              </label>
              <input
                type="text"
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600 transition-colors duration-300"
                placeholder="Machine Type"
                value={searchParams.machineType}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    machineType: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Customer Name
              </label>
              <input
                type="text"
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600 transition-colors duration-300"
                placeholder="Customer Name"
                value={searchParams.customerName}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    customerName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mb-6 flex flex-wrap space-x-4">
            <button
              className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
              onClick={handleSearch}
            >
              Show Data
            </button>
            <button
              className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
              onClick={handleDownload}
            >
              <FaDownload className="mr-2" />
              Download Excel
            </button>
            <button
              className="bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
              onClick={handlePrint}
            >
              <FaPrint className="mr-2" />
              Print
            </button>
          </div>

          {/* Spare Part History Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700 mb-6">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr className="border-b dark:border-gray-700">
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Action
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Opened Date
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Closed Date
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Department
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Machine Code
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    QR Code
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Machine Type
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Spare Part Code
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Spare Part Name
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Customer Name
                  </th>
                  <th className="p-2 text-right text-gray-700 dark:text-gray-300 font-semibold">
                    Min
                  </th>
                  <th className="p-2 text-right text-gray-700 dark:text-gray-300 font-semibold">
                    Max
                  </th>
                  <th className="p-2 text-right text-gray-700 dark:text-gray-300 font-semibold">
                    Price
                  </th>
                  <th className="p-2 text-right text-gray-700 dark:text-gray-300 font-semibold">
                    Total
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Brand
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Reason
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Details
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
                        {part.action}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.openedDate}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.closedDate}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.department}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.machineCode}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.qrCode}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.machineType}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.sparePartCode}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.sparePartName}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.customerName}
                      </td>
                      <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                        {part.min}
                      </td>
                      <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                        {part.max}
                      </td>
                      <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                        {part.price}
                      </td>
                      <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                        {part.total}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.brand}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.reason}
                      </td>
                      <td className="p-2 text-gray-900 dark:text-gray-100">
                        {part.details}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={17}
                      className="p-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No data found
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
        </>
      )}

      {activeTab === 'incomingSparePart' && (
        <div>
          <h2 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            Incoming Spare Parts
          </h2>
          {/* You can add content for the "Incoming Spare Part" tab here */}
          {/* Example table for incoming spare parts */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700 mb-6">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr className="border-b dark:border-gray-700">
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Transaction ID
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Date
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Spare Part Code
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Spare Part Name
                  </th>
                  <th className="p-2 text-right text-gray-700 dark:text-gray-300 font-semibold">
                    Quantity
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Type
                  </th>
                  <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Replace the sample data below with actual data */}
                <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    TRX-001
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    2024-10-15
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    SP-001
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    Bearing
                  </td>
                  <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                    5
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    Issue
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    Used for repair
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    TRX-002
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    2024-10-16
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    SP-002
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    Filter
                  </td>
                  <td className="p-2 text-right text-gray-900 dark:text-gray-100">
                    3
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    Return
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    Returned unused
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SparePartHistoryPage;

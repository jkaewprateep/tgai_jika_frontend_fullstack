'use client';

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaDownload, FaPrint, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { initialBrokenSpareParts } from './mockData';
import { BrokenSparePart } from '@/types';

const ReturnBrokenSparePartPage: React.FC = () => {
  const [brokenSpareParts, setBrokenSpareParts] = useState<BrokenSparePart[]>(
    initialBrokenSpareParts
  );
  const [filteredBrokenSpareParts, setFilteredBrokenSpareParts] = useState<
    BrokenSparePart[]
  >(initialBrokenSpareParts);
  const [selectedMonth, setSelectedMonth] = useState<string>('2024-10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newSparePart, setNewSparePart] = useState<Partial<BrokenSparePart>>(
    {}
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    handleShowDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  const handleShowDate = () => {
    // Filter data based on selectedMonth
    const filtered = brokenSpareParts.filter((part) => {
      const [day, month, year] = part.date.split('/');
      const partDate = new Date(`${year}-${month}-${day}`);
      const [selectedYear, selectedMonthValue] = selectedMonth.split('-');
      return (
        partDate.getMonth() + 1 === parseInt(selectedMonthValue) &&
        partDate.getFullYear() === parseInt(selectedYear)
      );
    });
    setFilteredBrokenSpareParts(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const handleDownload = () => {
    if (filteredBrokenSpareParts.length === 0) {
      alert('No data to download.');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredBrokenSpareParts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Broken_Spare_Parts');
    XLSX.writeFile(workbook, 'Broken_Spare_Parts.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBrokenSpareParts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBrokenSpareParts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handleAddBrokenSparePart = () => {
    setShowModal(true);
    setIsEditing(false);
    setNewSparePart({});
  };

  const handleEditBrokenSparePart = (index: number) => {
    const partToEdit = filteredBrokenSpareParts[index];
    setNewSparePart({ ...partToEdit });
    setShowModal(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteBrokenSparePart = (index: number) => {
    setShowDeleteConfirm(true);
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedBrokenSpareParts = [...brokenSpareParts];
      const globalIndex = brokenSpareParts.findIndex(
        (part) => part.no === filteredBrokenSpareParts[deleteIndex].no
      );
      updatedBrokenSpareParts.splice(globalIndex, 1);
      setBrokenSpareParts(updatedBrokenSpareParts);
      setFilteredBrokenSpareParts(updatedBrokenSpareParts);
      setDeleteIndex(null);
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
    setShowDeleteConfirm(false);
  };

  const handleSaveNewSparePart = () => {
    if (newSparePart) {
      if (isEditing && editIndex !== null) {
        // Editing existing spare part
        const updatedBrokenSpareParts = [...brokenSpareParts];
        const globalIndex = brokenSpareParts.findIndex(
          (part) => part.no === filteredBrokenSpareParts[editIndex].no
        );
        updatedBrokenSpareParts[globalIndex] = {
          no: updatedBrokenSpareParts[globalIndex].no,
          repairJob: newSparePart.repairJob || '',
          sparePartCode: newSparePart.sparePartCode || '',
          sparePartName: newSparePart.sparePartName || '',
          returnMessage: newSparePart.returnMessage || '',
          date: newSparePart.date || '',
          createdBy: newSparePart.createdBy || '',
        };
        setBrokenSpareParts(updatedBrokenSpareParts);
        setFilteredBrokenSpareParts(updatedBrokenSpareParts);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        // Adding new spare part
        const no = brokenSpareParts.length + 1;
        const part: BrokenSparePart = {
          no,
          repairJob: newSparePart.repairJob || '',
          sparePartCode: newSparePart.sparePartCode || '',
          sparePartName: newSparePart.sparePartName || '',
          returnMessage: newSparePart.returnMessage || '',
          date: newSparePart.date || '',
          createdBy: newSparePart.createdBy || '',
        };
        const updatedParts = [...brokenSpareParts, part];
        setBrokenSpareParts(updatedParts);
        setFilteredBrokenSpareParts(updatedParts);
      }
      setShowModal(false);
      setNewSparePart({});
    }
  };

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        Return Broken Spare Part
      </h1>

      {/* Select Month */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Select Month
        </label>
        <input
          type="month"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="mb-6 flex flex-wrap space-x-4">
        <button
          className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
          onClick={handleShowDate}
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
        <button
          className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
          onClick={handleAddBrokenSparePart}
        >
          <FaPlus className="mr-2" />
          Add Broken Spare Part
        </button>
      </div>

      {/* Broken Spare Parts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700 mb-6">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                No.
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Repair Job
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Spare Part Code
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Spare Part Name
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Return Message
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Date
              </th>
              <th className="p-2 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Created By
              </th>
              <th className="p-2 text-center text-gray-700 dark:text-gray-300 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((part, index) => (
                <tr
                  key={part.no}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.no}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.repairJob}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.sparePartCode}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.sparePartName}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.returnMessage}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.date}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    {part.createdBy}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 mr-2"
                      onClick={() =>
                        handleEditBrokenSparePart(index + indexOfFirstItem)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600"
                      onClick={() =>
                        handleDeleteBrokenSparePart(index + indexOfFirstItem)
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
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
      <div className="flex justify-between items-center mt-6">
        <span className="text-gray-700 dark:text-gray-300">
          Showing {indexOfFirstItem + 1} to{' '}
          {indexOfLastItem > filteredBrokenSpareParts.length
            ? filteredBrokenSpareParts.length
            : indexOfLastItem}{' '}
          of {filteredBrokenSpareParts.length} entries
        </span>
        <div className="flex items-center space-x-1">
          <button
            className={`py-1 px-3 border dark:border-gray-700 rounded-l ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
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
                }`}
                onClick={() => setCurrentPage(number)}
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
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Broken Spare Part Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">
              {isEditing ? 'Edit' : 'Add'} Broken Spare Part
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Repair Job *
                </label>
                <input
                  type="text"
                  placeholder="Repair Job"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
                  value={newSparePart.repairJob || ''}
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      repairJob: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Spare Part Code *
                </label>
                <input
                  type="text"
                  placeholder="Spare Part Code"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
                  value={newSparePart.sparePartCode || ''}
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      sparePartCode: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Spare Part Name *
                </label>
                <input
                  type="text"
                  placeholder="Spare Part Name"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
                  value={newSparePart.sparePartName || ''}
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      sparePartName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Return Message *
                </label>
                <textarea
                  placeholder="Return Message"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
                  value={newSparePart.returnMessage || ''}
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      returnMessage: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Date *
                </label>
                <input
                  type="date"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
                  value={
                    newSparePart.date
                      ? newSparePart.date.split('/').reverse().join('-')
                      : ''
                  }
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      date: e.target.value.split('-').reverse().join('/'),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Created By *
                </label>
                <input
                  type="text"
                  placeholder="Created By"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
                  value={newSparePart.createdBy || ''}
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      createdBy: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white py-2 px-4 rounded"
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  setEditIndex(null);
                  setNewSparePart({});
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded"
                onClick={handleSaveNewSparePart}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this broken spare part?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white py-2 px-4 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white py-2 px-4 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnBrokenSparePartPage;

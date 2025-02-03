'use client';

import React, { useState } from 'react';

// Define the Holiday interface
interface Holiday {
  id: number;
  openClose: string;
  repeat: string;
  date: string;
  am: string;
  pm: string;
  createdBy: string;
  createDate: string;
  updateDate: string;
}

const initialHolidays: Holiday[] = [
  {
    id: 1,
    openClose: 'Closed',
    repeat: 'Yearly',
    date: '2024-12-25',
    am: 'Closed',
    pm: 'Closed',
    createdBy: 'Admin',
    createDate: '2024-01-01',
    updateDate: '2024-01-01',
  },
  {
    id: 2,
    openClose: 'Closed',
    repeat: 'Yearly',
    date: '2025-01-01',
    am: 'Closed',
    pm: 'Closed',
    createdBy: 'Admin',
    createDate: '2024-01-01',
    updateDate: '2024-01-01',
  },
  // Add more initial holidays if needed
];

const HolidayCalendar: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentHolidayId, setCurrentHolidayId] = useState<number | null>(null);
  const [newHoliday, setNewHoliday] = useState<Holiday>({
    id: holidays.length + 1,
    openClose: 'Closed',
    repeat: 'None',
    date: '',
    am: 'Closed',
    pm: 'Closed',
    createdBy: 'Admin',
    createDate: new Date().toISOString().split('T')[0],
    updateDate: new Date().toISOString().split('T')[0],
  });
  const [showInstruction, setShowInstruction] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const holidaysPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(holidays.length / holidaysPerPage);

  // Get current holidays
  const indexOfLastHoliday = currentPage * holidaysPerPage;
  const indexOfFirstHoliday = indexOfLastHoliday - holidaysPerPage;
  const currentHolidays = holidays.slice(
    indexOfFirstHoliday,
    indexOfLastHoliday
  );

  const handleAddHoliday = () => {
    setNewHoliday({
      id: holidays.length + 1,
      openClose: 'Closed',
      repeat: 'None',
      date: '',
      am: 'Closed',
      pm: 'Closed',
      createdBy: 'Admin',
      createDate: new Date().toISOString().split('T')[0],
      updateDate: new Date().toISOString().split('T')[0],
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleSaveHoliday = () => {
    if (!newHoliday.date) {
      alert('Please enter a valid date');
      return;
    }

    if (isEditing && currentHolidayId !== null) {
      // Update existing holiday
      setHolidays(
        holidays.map((holiday) =>
          holiday.id === currentHolidayId
            ? {
                ...newHoliday,
                id: currentHolidayId,
                updateDate: new Date().toISOString().split('T')[0],
              }
            : holiday
        )
      );
    } else {
      // Add new holiday
      setHolidays([...holidays, { ...newHoliday, id: holidays.length + 1 }]);
    }

    setNewHoliday({
      id: holidays.length + 2,
      openClose: 'Closed',
      repeat: 'None',
      date: '',
      am: 'Closed',
      pm: 'Closed',
      createdBy: 'Admin',
      createDate: new Date().toISOString().split('T')[0],
      updateDate: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
    setIsEditing(false);
    setCurrentHolidayId(null);
  };

  const handleCancel = () => {
    setNewHoliday({
      id: holidays.length + 1,
      openClose: 'Closed',
      repeat: 'None',
      date: '',
      am: 'Closed',
      pm: 'Closed',
      createdBy: 'Admin',
      createDate: new Date().toISOString().split('T')[0],
      updateDate: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
    setIsEditing(false);
    setCurrentHolidayId(null);
  };

  const handleInstruction = () => {
    setShowInstruction(true);
  };

  const handleEdit = (id: number) => {
    const holidayToEdit = holidays.find((holiday) => holiday.id === id);
    if (holidayToEdit) {
      setNewHoliday(holidayToEdit);
      setIsEditing(true);
      setCurrentHolidayId(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      setHolidays(holidays.filter((holiday) => holiday.id !== id));
    }
  };

  return (
    <div className="mx-auto p-6 h-screen overflow-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
          Holiday Calendar
        </h1>
        <button
          onClick={handleInstruction}
          className="bg-red-500 dark:bg-red-600 text-white py-2 px-4 rounded shadow-lg hover:bg-red-600 dark:hover:bg-red-700 transition duration-300"
        >
          Instruction
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={handleAddHoliday}
          className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-5 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
        >
          + Add Holiday
        </button>
      </div>

      {/* Holiday Table */}
      <div className="overflow-x-auto mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 border-b">
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Open / Close
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Repeat
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Date
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                AM
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                PM
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Created By
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Create Date
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Update Date
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentHolidays.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  Data Not Found
                </td>
              </tr>
            ) : (
              currentHolidays.map((holiday) => (
                <tr
                  key={holiday.id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {holiday.openClose}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {holiday.repeat}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {holiday.date}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {holiday.am}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {holiday.pm}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {holiday.createdBy}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {holiday.createDate}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {holiday.updateDate}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    <button
                      onClick={() => handleEdit(holiday.id)}
                      className="text-blue-600 dark:text-blue-400 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(holiday.id)}
                      className="text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600 dark:text-gray-400">
          Showing {currentHolidays.length} of {holidays.length} holidays
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-1 px-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`py-1 px-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                currentPage === index + 1
                  ? 'bg-gray-200 dark:bg-gray-600 font-bold'
                  : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-1 px-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Holiday Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {isEditing ? 'Edit Holiday' : 'Add New Holiday'}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Date:
                </label>
                <input
                  type="date"
                  value={newHoliday.date}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, date: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Open / Close:
                </label>
                <select
                  value={newHoliday.openClose}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, openClose: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Repeat:
                </label>
                <select
                  value={newHoliday.repeat}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, repeat: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="None">None</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  AM:
                </label>
                <select
                  value={newHoliday.am}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, am: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  PM:
                </label>
                <select
                  value={newHoliday.pm}
                  onChange={(e) =>
                    setNewHoliday({ ...newHoliday, pm: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCancel}
                className="py-2 px-4 bg-gray-500 dark:bg-gray-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHoliday}
                className="py-2 px-4 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800"
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instruction Modal */}
      {showInstruction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex justify-center items-center z-40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Instructions
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              This calendar allows you to manage holidays.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
              <li>Click &apos;Add Holiday&apos; to add a new holiday.</li>
              <li>
                Use the &apos;Edit&apos; button to modify an existing holiday.
              </li>
              <li>Use the &apos;Delete&apos; button to remove a holiday.</li>
              <li>
                Use the pagination controls to navigate through the list of
                holidays.
              </li>
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowInstruction(false)}
                className="py-2 px-4 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayCalendar;

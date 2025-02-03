'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  FaSave,
  FaTimes,
  FaDownload,
  FaSyncAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import { initialUsers } from './mockData';

interface User {
  id: number;
  status: string;
  username: string;
  firstName: string;
  lastName: string;
  permissionLevel: string;
  department: string;
  email: string;
  phone: string;
  dateUpdated: string;
  updatedBy: string;
  passwordReset?: boolean;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [originalUsers, setOriginalUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAlert, setShowAlert] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleResetPassword = (id: number) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, passwordReset: true } : user
    );
    setUsers(updatedUsers);
    setModalMessage(`Password for user ID ${id} has been reset.`);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setOriginalUsers(users);
    setShowAlert({ type: 'success', message: 'User changes have been saved.' });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleCancel = () => {
    setUsers(originalUsers);
    setShowAlert({ type: 'info', message: 'Changes have been canceled.' });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleInputChange = (id: number, field: keyof User, value: string) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, [field]: value } : user
    );
    setUsers(updatedUsers);
  };

  const handleDownloadExcel = () => {
    const worksheetData = users.map((user) => ({
      ID: user.id,
      Status: user.status,
      Username: user.username,
      'First Name': user.firstName,
      'Last Name': user.lastName,
      'Permission Level': user.permissionLevel,
      Department: user.department,
      Email: user.email,
      Phone: user.phone,
      'Date Updated': user.dateUpdated,
      'Updated By': user.updatedBy,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'users.xlsx');
  };

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-gray-50 dark:bg-gray-900 dark:text-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
        User Management
      </h1>

      {/* Alert Message */}
      {showAlert && (
        <div
          className={`mb-4 p-4 rounded ${
            showAlert.type === 'success'
              ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300'
              : showAlert.type === 'info'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300'
              : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300'
          } flex items-center`}
        >
          {showAlert.type === 'success' ? (
            <FaCheckCircle className="mr-2" />
          ) : (
            <FaExclamationCircle className="mr-2" />
          )}
          {showAlert.message}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap mb-6 space-x-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded flex items-center shadow-lg"
          onClick={handleSave}
        >
          <FaSave className="mr-2" />
          Save
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded flex items-center shadow-lg"
          onClick={handleCancel}
        >
          <FaTimes className="mr-2" />
          Cancel
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded flex items-center shadow-lg"
          onClick={handleDownloadExcel}
        >
          <FaDownload className="mr-2" />
          ดาวน์โหลดไฟล์ผลลัพธ์ (Excel)
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Username"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="border-b">
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Reset Password</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">First Name</th>
              <th className="p-4 text-left">Last Name</th>
              <th className="p-4 text-left">Permission Level</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Date Updated</th>
              <th className="p-4 text-left">Updated By</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b ${
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200`}
                >
                  <td className="p-4">{indexOfFirstItem + index + 1}</td>
                  <td className="p-4">
                    <select
                      className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      value={user.status}
                      onChange={(e) =>
                        handleInputChange(user.id, 'status', e.target.value)
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      className={`${
                        user.passwordReset
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white py-1 px-3 rounded transition-all duration-200 shadow-sm flex items-center`}
                      onClick={() => handleResetPassword(user.id)}
                    >
                      <FaSyncAlt className="mr-1" />
                      {user.passwordReset ? 'Password Reset' : 'Reset Password'}
                    </button>
                  </td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">
                    <input
                      type="text"
                      className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      value={user.firstName}
                      onChange={(e) =>
                        handleInputChange(user.id, 'firstName', e.target.value)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="text"
                      className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      value={user.lastName}
                      onChange={(e) =>
                        handleInputChange(user.id, 'lastName', e.target.value)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <select
                      className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      value={user.permissionLevel}
                      onChange={(e) =>
                        handleInputChange(
                          user.id,
                          'permissionLevel',
                          e.target.value
                        )
                      }
                    >
                      <option value="Manager">Manager</option>
                      <option value="Reporter">Reporter</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <select
                      className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      value={user.department}
                      onChange={(e) =>
                        handleInputChange(user.id, 'department', e.target.value)
                      }
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <input
                      type="email"
                      className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      value={user.email}
                      onChange={(e) =>
                        handleInputChange(user.id, 'email', e.target.value)
                      }
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="tel"
                      className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      value={user.phone}
                      onChange={(e) =>
                        handleInputChange(user.id, 'phone', e.target.value)
                      }
                    />
                  </td>
                  <td className="p-4">{user.dateUpdated}</td>
                  <td className="p-4">{user.updatedBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Showing {indexOfFirstItem + 1} to{' '}
          {indexOfLastItem > filteredUsers.length
            ? filteredUsers.length
            : indexOfLastItem}{' '}
          of {filteredUsers.length} entries
        </span>
        <div className="flex items-center space-x-2">
          <button
            className={`py-1 px-3 border rounded ${
              currentPage === 1
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage}
          </span>
          <button
            className={`py-1 px-3 border rounded ${
              currentPage === totalPages
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md mx-auto">
            <p className="text-lg text-center dark:text-gray-200">
              {modalMessage}
            </p>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;

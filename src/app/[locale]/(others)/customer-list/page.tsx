'use client';

import React, { useState } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExclamationCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import { initialCustomers } from './mockData';

interface Customer {
  id: number;
  code: string;
  companyName: string;
  shortName: string;
  address: string;
  contactName: string;
  dateCreated: string;
  createdBy: string;
  dateUpdated: string;
  updatedBy: string;
}

const CustomerManagementPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAlert, setShowAlert] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  );

  // Pagination calculations
  const indexOfLastCustomer = currentPage * rowsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - rowsPerPage;

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  const handleAddCustomer = () => {
    setModalMode('add');
    setCurrentCustomer(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setModalMode('edit');
    setCurrentCustomer(customer);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteCustomer = () => {
    if (customerToDelete) {
      setCustomers(customers.filter((c) => c.id !== customerToDelete.id));
      setShowAlert({
        type: 'success',
        message: 'Customer deleted successfully.',
      });
      setTimeout(() => setShowAlert(null), 3000);
      setIsDeleteModalOpen(false);
    }
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const newCustomerData: Customer = {
      id: modalMode === 'add' ? customers.length + 1 : currentCustomer!.id,
      code:
        modalMode === 'add'
          ? 'CUST-' + (customers.length + 1).toString().padStart(3, '0')
          : currentCustomer!.code,
      companyName: (formData.get('companyName') as string).trim(),
      shortName: (formData.get('shortName') as string).trim(),
      address: (formData.get('address') as string).trim(),
      contactName: (formData.get('contactName') as string).trim(),
      dateCreated:
        modalMode === 'add'
          ? new Date().toISOString().split('T')[0]
          : currentCustomer!.dateCreated,
      createdBy: 'admin',
      dateUpdated:
        modalMode === 'edit' ? new Date().toISOString().split('T')[0] : '',
      updatedBy: modalMode === 'edit' ? 'admin' : '',
    };

    // Form validation
    const newErrors: { [key: string]: string } = {};
    if (!newCustomerData.companyName)
      newErrors.companyName = 'Company Name is required.';
    if (!newCustomerData.shortName)
      newErrors.shortName = 'Short Name is required.';
    if (!newCustomerData.address) newErrors.address = 'Address is required.';
    if (!newCustomerData.contactName)
      newErrors.contactName = 'Contact Name is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (modalMode === 'add') {
      setCustomers([...customers, newCustomerData]);
      setShowAlert({ type: 'success', message: 'New customer added.' });
    } else {
      setCustomers(
        customers.map((customer) =>
          customer.id === currentCustomer!.id ? newCustomerData : customer
        )
      );
      setShowAlert({
        type: 'success',
        message: 'Customer updated successfully.',
      });
    }
    setIsModalOpen(false);
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleChangeRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto p-6 h-screen overflow-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
        Customer Management
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
      <div className="flex mb-6 space-x-4">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-200 shadow flex items-center"
          onClick={handleAddCustomer}
        >
          <FaPlus className="mr-2" />
          Add
        </button>
      </div>

      {/* Search and Rows Per Page */}
      <div className="flex flex-wrap justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select
            className="border p-2 rounded dark:border-gray-600"
            value={rowsPerPage}
            onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>rows</span>
        </div>
        <div className="mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search by Company Name or Code"
            className="border p-2 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border rounded-lg shadow dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="border-b">
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Company Name</th>
              <th className="p-4 text-left">Short Name</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Contact Name</th>
              <th className="p-4 text-left">Date Created</th>
              <th className="p-4 text-left">Created By</th>
              <th className="p-4 text-left">Date Updated</th>
              <th className="p-4 text-left">Updated By</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`border-b ${
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''
                  } hover:bg-gray-100 dark:hover:bg-gray-600`}
                >
                  <td className="p-4">{indexOfFirstCustomer + index + 1}</td>
                  <td className="p-4">{customer.code}</td>
                  <td className="p-4">{customer.companyName}</td>
                  <td className="p-4">{customer.shortName}</td>
                  <td className="p-4">{customer.address}</td>
                  <td className="p-4">{customer.contactName}</td>
                  <td className="p-4">{customer.dateCreated}</td>
                  <td className="p-4">{customer.createdBy}</td>
                  <td className="p-4">{customer.dateUpdated || 'N/A'}</td>
                  <td className="p-4">{customer.updatedBy || 'N/A'}</td>
                  <td className="p-4">
                    <button
                      className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition-all duration-200 mr-2"
                      onClick={() => handleEditCustomer(customer)}
                      title="Edit Customer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition-all duration-200"
                      onClick={() => handleDeleteCustomer(customer)}
                      title="Delete Customer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
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
      <div className="flex flex-wrap justify-between items-center mt-6">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Showing {indexOfFirstCustomer + 1} to{' '}
          {indexOfLastCustomer > filteredCustomers.length
            ? filteredCustomers.length
            : indexOfLastCustomer}{' '}
          of {filteredCustomers.length} entries
        </span>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <button
            className={`py-1 px-3 border rounded ${
              currentPage === 1
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
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
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              {modalMode === 'add' ? 'Add Customer' : 'Edit Customer'}
            </h2>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label className="block mb-1 dark:text-gray-200">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  defaultValue={currentCustomer?.companyName || ''}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
                {errors.companyName && (
                  <p className="text-red-600 text-sm">{errors.companyName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1 dark:text-gray-200">
                  Short Name
                </label>
                <input
                  type="text"
                  name="shortName"
                  defaultValue={currentCustomer?.shortName || ''}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
                {errors.shortName && (
                  <p className="text-red-600 text-sm">{errors.shortName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1 dark:text-gray-200">Address</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={currentCustomer?.address || ''}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
                {errors.address && (
                  <p className="text-red-600 text-sm">{errors.address}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1 dark:text-gray-200">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  defaultValue={currentCustomer?.contactName || ''}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
                {errors.contactName && (
                  <p className="text-red-600 text-sm">{errors.contactName}</p>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-all duration-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all duration-200"
                >
                  {modalMode === 'add' ? 'Add' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Confirm Deletion
            </h2>
            <p className="mb-6 dark:text-gray-300">
              Are you sure you want to delete{' '}
              <strong>{customerToDelete?.companyName}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-all duration-200"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-all duration-200"
                onClick={confirmDeleteCustomer}
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

export default CustomerManagementPage;

'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code'; // ใช้ react-qr-code
import { initialDevices } from './mockdata';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface Device {
  id: number;
  qrCode: string;
  barcode: string;
  name: string;
  status: string;
  location: string;
  brand: string;
  model: string;
  factorySerial: string;
  lastUpdateBy: string;
  manualFile?: string;
  responsiblePerson?: string;
}

const registrationLimit = 100; // สมมติว่ามีจำกัดการลงทะเบียน

const DeviceListPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    'register' | 'edit' | 'addResponsible' | 'downloadQR' | null
  >(null);
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
  const [newDevice, setNewDevice] = useState<Device>({
    id: devices.length + 1,
    qrCode: '',
    barcode: '',
    name: '',
    status: '',
    location: '',
    brand: '',
    model: '',
    factorySerial: '',
    lastUpdateBy: '',
    manualFile: '',
    responsiblePerson: '',
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [responsiblePerson, setResponsiblePerson] = useState<string>('');

  // ฟิลเตอร์อุปกรณ์ตามคำค้นหา
  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ลอจิกการแบ่งหน้า
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDevices.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Device
  ) => {
    setNewDevice({ ...newDevice, [key]: e.target.value });
  };

  const handleAddDevice = () => {
    setIsSaving(true);
    setTimeout(() => {
      setDevices([...devices, { ...newDevice, id: devices.length + 1 }]);
      setIsModalOpen(false);
      setNewDevice({
        id: devices.length + 2,
        qrCode: '',
        barcode: '',
        name: '',
        status: '',
        location: '',
        brand: '',
        model: '',
        factorySerial: '',
        lastUpdateBy: '',
        manualFile: '',
        responsiblePerson: '',
      });
      setIsSaving(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }, 1000);
  };

  const handleEditDevice = () => {
    if (currentDevice) {
      setIsSaving(true);
      setTimeout(() => {
        const updatedDevices = devices.map((device) =>
          device.id === currentDevice.id ? currentDevice : device
        );
        setDevices(updatedDevices);
        setIsModalOpen(false);
        setCurrentDevice(null);
        setIsSaving(false);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      }, 1000);
    }
  };

  const handleAddResponsiblePerson = () => {
    if (currentDevice) {
      const updatedDevices = devices.map((device) =>
        device.id === currentDevice.id
          ? { ...device, responsiblePerson }
          : device
      );
      setDevices(updatedDevices);
      setIsModalOpen(false);
      setResponsiblePerson('');
      setCurrentDevice(null);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    if (currentDevice) {
      const svg = document.getElementById(
        `qrCode-${currentDevice.id}`
      ) as unknown as SVGElement;
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL('image/png');

          const downloadLink = document.createElement('a');
          downloadLink.download = `${currentDevice.name}-QRCode.png`;
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      }
      setIsModalOpen(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const fields = [
    { label: 'QR Code', key: 'qrCode' },
    { label: 'Barcode', key: 'barcode' },
    { label: 'Name', key: 'name' },
    { label: 'Status', key: 'status' },
    { label: 'Location', key: 'location' },
    { label: 'Brand', key: 'brand' },
    { label: 'Model', key: 'model' },
    { label: 'Factory Serial', key: 'factorySerial' },
    { label: 'Last Update By', key: 'lastUpdateBy' },
    { label: 'Responsible Person', key: 'responsiblePerson' },
  ];

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
        Device / Machine List
      </h1>

      {/* Success Alert */}
      {showAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 dark:bg-green-800 dark:border-green-700 dark:text-green-300">
          Action completed successfully!
        </div>
      )}

      {/* Actions */}
      <div className="mb-6 flex flex-wrap items-center space-x-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
          onClick={() => {
            setIsModalOpen(true);
            setModalType('register');
          }}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 5a1 1 0 00-1 1v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V6a1 1 0 00-1-1z" />
          </svg>
          Register Device
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center"
          onClick={() =>
            alert(`Remaining Codes: ${registrationLimit - devices.length}`)
          }
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7.414A2 2 0 0016.414 6L13 2.586A2 2 0 0011.586 2H5z" />
          </svg>
          Remaining Code
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center"
          onClick={() => {
            if (currentDevice) {
              setIsModalOpen(true);
              setModalType('addResponsible');
            } else {
              alert('Please select a device first.');
            }
          }}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zm6 1a2 2 0 10-4 0 2 2 0 004 0zm-6 2a6 6 0 00-6 6v1a1 1 0 001 1h12a1 1 0 001-1v-1a6 6 0 00-6-6z" />
          </svg>
          Add Responsible
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded flex items-center"
          onClick={() => {
            if (currentDevice) {
              setIsModalOpen(true);
              setModalType('downloadQR');
            } else {
              alert('Please select a device first.');
            }
          }}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 3a2 2 0 012-2h6a2 2 0 012 2v1h4a2 2 0 012 2v5h-2V6H5v12h5v2H5a2 2 0 01-2-2V3zm11 9v-3h2v3h3l-4 4-4-4h3z" />
          </svg>
          Download QR Code
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center"
          onClick={() => {
            if (currentDevice) {
              setIsModalOpen(true);
              setModalType('edit');
            } else {
              alert('Please select a device first.');
            }
          }}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.465.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.465l9.9-9.9a2 2 0 012.828 0zM5 16h10a1 1 0 100-2H5a1 1 0 100 2z" />
          </svg>
          Edit Device
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          placeholder="Search devices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Device Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left text-gray-900 dark:text-white">
                <input
                  type="checkbox"
                  aria-label="Select all devices"
                  // Implement select all functionality if needed
                />
              </th>
              <th className="p-3 text-left text-gray-900 dark:text-white">
                No.
              </th>
              {fields.map((field) => (
                <th
                  key={field.key}
                  className="p-3 text-left text-gray-900 dark:text-white"
                >
                  {field.label}
                </th>
              ))}
              <th className="p-3 text-left text-gray-900 dark:text-white">
                Manual File
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((device, index) => (
                <tr
                  key={device.id}
                  className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                    currentDevice?.id === device.id
                      ? 'bg-blue-50 dark:bg-blue-700'
                      : ''
                  }`}
                  onClick={() => setCurrentDevice(device)}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={currentDevice?.id === device.id}
                      onChange={() => setCurrentDevice(device)}
                      aria-label={`Select device ${device.name}`}
                    />
                  </td>
                  <td className="p-3">{indexOfFirstItem + index + 1}</td>
                  {fields.map((field) => (
                    <td
                      key={field.key}
                      className="p-3 text-gray-900 dark:text-white"
                    >
                      {device[field.key as keyof Device]}
                    </td>
                  ))}
                  <td className="p-3">{device.manualFile || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={fields.length + 3}
                  className="p-3 text-center text-gray-600 dark:text-gray-300"
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
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Showing {indexOfFirstItem + 1} to{' '}
          {indexOfLastItem > filteredDevices.length
            ? filteredDevices.length
            : indexOfLastItem}{' '}
          of {filteredDevices.length} entries
        </span>
        <div className="flex items-center space-x-2">
          <button
            className={`py-1 px-3 border rounded ${
              currentPage === 1
                ? 'bg-gray-200 cursor-not-allowed dark:bg-gray-600'
                : 'bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={handlePreviousPage}
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
                ? 'bg-gray-200 cursor-not-allowed dark:bg-gray-600'
                : 'bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          {modalType === 'register' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-lg transform transition-all">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
                Register Device / Machine
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {fields.map((field) => (
                  <input
                    key={field.key}
                    type="text"
                    placeholder={field.label}
                    className="border dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    value={newDevice[field.key as keyof Device] as string}
                    onChange={(e) =>
                      handleInputChange(e, field.key as keyof Device)
                    }
                  />
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className={`bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleAddDevice}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {modalType === 'edit' && currentDevice && (
            <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded shadow-md w-full max-w-lg transform transition-all">
              <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400">
                Edit Device / Machine
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {fields.map((field) => (
                  <input
                    key={field.key}
                    type="text"
                    placeholder={field.label}
                    className="border dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={currentDevice[field.key as keyof Device] as string}
                    onChange={(e) =>
                      setCurrentDevice({
                        ...currentDevice,
                        [field.key]: e.target.value,
                      } as Device)
                    }
                  />
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className={`bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleEditDevice}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {modalType === 'addResponsible' && currentDevice && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md transform transition-all">
              <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">
                Add Responsible Person
              </h2>
              <input
                type="text"
                placeholder="Responsible Person"
                className="border dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                value={responsiblePerson}
                onChange={(e) => setResponsiblePerson(e.target.value)}
              />
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
                  onClick={handleAddResponsiblePerson}
                >
                  Save
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
                  onClick={() => {
                    setIsModalOpen(false);
                    setResponsiblePerson('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {modalType === 'downloadQR' && currentDevice && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md text-center transform transition-all">
              <h2 className="text-2xl font-bold mb-6 text-yellow-600 dark:text-yellow-400">
                Download QR Code
              </h2>
              <div className="flex justify-center mb-6">
                <QRCode
                  id={`qrCode-${currentDevice.id}`}
                  value={currentDevice.qrCode}
                  size={256}
                  level="H"
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </div>
              <div className="mt-6 flex justify-center space-x-3">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                  onClick={handleDownloadQR}
                >
                  Download
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeviceListPage;

'use client';

import { useState, useEffect } from 'react';
import {
  FaDownload,
  FaPrint,
  FaPlus,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
} from 'react-icons/fa';

import * as XLSX from 'xlsx';
import Modal from '@/components/Modal';
import mockData from './mockData';
import RequestForm from '@/components/RequestForm';
import Toast from '@/components/Toast';

interface RepairData {
  repairNo: string;
  dateRequested: string;
  unsettledDays: number;
  internalSN: string;
  device: string;
  problem: string;
  repairType: string;
  lastComment: string;
  reportedBy: string;
  technician: string;
  machineStatus: string;
}

type SortOrder = 'asc' | 'desc';

const RequestRepairPage = () => {
  // สถานะของข้อมูล
  const [data, setData] = useState<RepairData[]>(mockData);
  const [filteredData, setFilteredData] = useState<RepairData[]>([]);
  const [sortedData, setSortedData] = useState<RepairData[]>([]);

  // สถานะของฟิลเตอร์
  const [statusFilter, setStatusFilter] = useState('All');
  const [technicianFilter, setTechnicianFilter] = useState('Everyone');
  const [machineStatusFilter, setMachineStatusFilter] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  // สถานะของการแบ่งหน้า
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // จำนวนแถวต่อหน้า

  // สถานะของโมดอล
  const [isModalOpen, setIsModalOpen] = useState(false);

  // สถานะของการเรียงลำดับ
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RepairData;
    direction: SortOrder;
  } | null>(null);

  // สถานะของการแจ้งเตือน
  const [notification, setNotification] = useState('');

  // การจัดการการเรียงลำดับ
  const handleSort = (key: keyof RepairData) => {
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

  // การกรองข้อมูลเมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    const filtered = data.filter((repair) => {
      const matchStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Completed'
          ? repair.unsettledDays === 0
          : repair.unsettledDays > 0);

      const matchTechnician =
        technicianFilter === 'Everyone' ||
        repair.technician === technicianFilter;

      const matchMachineStatus =
        machineStatusFilter === 'All Status' ||
        repair.machineStatus === machineStatusFilter;

      const matchSearchQuery =
        searchQuery === '' ||
        repair.repairNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repair.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repair.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repair.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchStatus && matchTechnician && matchMachineStatus && matchSearchQuery
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1); // รีเซ็ตไปยังหน้าที่ 1 เมื่อมีการเปลี่ยนแปลง
  }, [data, statusFilter, technicianFilter, machineStatusFilter, searchQuery]);

  // การเรียงลำดับข้อมูลเมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    let sortableData = [...filteredData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedData(sortableData);
    setCurrentPage(1); // รีเซ็ตไปยังหน้าที่ 1 เมื่อมีการเรียงลำดับ
  }, [filteredData, sortConfig]);

  // การดาวน์โหลดไฟล์ Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Repairs');
    XLSX.writeFile(workbook, 'RepairData.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  // การแบ่งหน้า
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ปิดการแจ้งเตือนหลังจาก 3 วินาที
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg min-h-screen overflow-auto transition-all duration-300">
      {/* หัวข้อ */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Repair Assignment
        </h1>
        {/* ปุ่มเพิ่ม */}
      </div>

      {/* การแจ้งเตือน */}
      {notification && <Toast message={notification} />}

      {/* ส่วนฟิลเตอร์ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* ฟิลเตอร์การค้นหา */}
        <div className="md:col-span-1">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition-all"
              placeholder="Search..."
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>
        {/* ฟิลเตอร์สถานะ */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition-all"
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        {/* ฟิลเตอร์ช่างเทคนิค */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Technician in Charge
          </label>
          <select
            value={technicianFilter}
            onChange={(e) => setTechnicianFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition-all"
          >
            <option>Everyone</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
            {/* เพิ่มช่างเทคนิคเพิ่มเติมตามต้องการ */}
          </select>
        </div>
        {/* ฟิลเตอร์สถานะเครื่องจักร */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Machine Status
          </label>
          <select
            value={machineStatusFilter}
            onChange={(e) => setMachineStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition-all"
          >
            <option>All Status</option>
            <option>Running</option>
            <option>Stopped</option>
          </select>
        </div>
      </div>

      {/* ปุ่มการดำเนินการ */}
      <div className="flex flex-wrap items-center justify-between space-x-4 mb-4">
        <div className="flex space-x-4">
          <button className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
            <FaDownload /> Download Excel
          </button>
          <button className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
            <FaPrint /> Print Current Page
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600 dark:hover:bg-green-700 transition-all duration-200"
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* ตาราง */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded transition-all">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {/* หัวข้อตารางพร้อมการเรียงลำดับ */}
              {[
                { label: 'View', key: null },
                { label: 'Action', key: null },
                { label: 'Repair No.', key: 'repairNo' },
                { label: 'Date Requested', key: 'dateRequested' },
                { label: 'Unsettled Days', key: 'unsettledDays' },
                { label: 'Internal S/N', key: 'internalSN' },
                { label: 'Device / Machine', key: 'device' },
                { label: 'Problem', key: 'problem' },
                { label: 'Repair Type', key: 'repairType' },
                { label: 'Last Comment', key: 'lastComment' },
                { label: 'Reported By', key: 'reportedBy' },
              ].map((column, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 border text-gray-700 dark:text-gray-300 text-left"
                >
                  <div className="flex items-center">
                    {column.label}
                    {column.key && (
                      <button
                        onClick={() =>
                          handleSort(column.key as keyof RepairData)
                        }
                        className="ml-2 text-gray-600 dark:text-gray-400"
                      >
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((repair, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
                      title="View Details"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 border flex flex-wrap gap-2">
                    <button
                      className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
                      title="Assign to User"
                    >
                      Assign
                    </button>
                    <button
                      className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                      title="Add Comment"
                    >
                      Comment
                    </button>
                  </td>
                  <td className="px-4 py-2 border">{repair.repairNo}</td>
                  <td className="px-4 py-2 border">{repair.dateRequested}</td>
                  <td className="text-center px-4 py-2 border">
                    {repair.unsettledDays}
                  </td>
                  <td className="px-4 py-2 border">{repair.internalSN}</td>
                  <td className="px-4 py-2 border">{repair.device}</td>
                  <td className="px-4 py-2 border">{repair.problem}</td>
                  <td className="px-4 py-2 border">{repair.repairType}</td>
                  <td className="px-4 py-2 border">{repair.lastComment}</td>
                  <td className="px-4 py-2 border">{repair.reportedBy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                >
                  No repair records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* การแบ่งหน้า */}
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-gray-400">
        <p className="mb-2 md:mb-0">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
          {sortedData.length} entries
        </p>
        <div className="space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
              currentPage === totalPages || totalPages === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* โมดอล */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <RequestForm
            onSubmit={(newData) => {
              setData([...data, newData]);
              setIsModalOpen(false);
              setNotification('Repair request added successfully.');
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default RequestRepairPage;

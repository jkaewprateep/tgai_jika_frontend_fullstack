'use client';

import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { initialSparePartRequests, initialSpareParts } from './mockdata';

interface SparePartRequest {
  id: number;
  requestId: string;
  itemName: string;
  requestDate: string;
  location: string;
  usageDetails: string;
  requester: string;
  requestTime: string;
}

interface SparePart {
  partCode: string;
  partName: string;
  quantity: number;
  remaining: number;
}

const SparePartApprovalPage: React.FC = () => {
  const [sparePartRequests, setSparePartRequests] = useState<
    SparePartRequest[]
  >(initialSparePartRequests);
  const [approvedSpareParts, setApprovedSpareParts] = useState<
    SparePartRequest[]
  >([]);
  const [rejectedSpareParts, setRejectedSpareParts] = useState<
    SparePartRequest[]
  >([]);
  const [selectedRequest, setSelectedRequest] =
    useState<SparePartRequest | null>(null);
  const [spareParts, setSpareParts] = useState<SparePart[]>(initialSpareParts);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'request' | 'inventory' | 'approved' | 'rejected'
  >('request');

  const handleSelectRequest = (request: SparePartRequest) => {
    setSelectedRequest(request);
  };

  const handleApprove = () => {
    if (selectedRequest) {
      const updatedSpareParts = spareParts.map((part) => ({
        ...part,
        remaining: part.remaining - part.quantity,
      }));
      setSpareParts(updatedSpareParts);
      setApprovedSpareParts([...approvedSpareParts, selectedRequest]);
      setSparePartRequests(
        sparePartRequests.filter((req) => req.id !== selectedRequest.id)
      );
      setSelectedRequest(null);
      setIsApproveModalOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedRequest) {
      setRejectedSpareParts([...rejectedSpareParts, selectedRequest]);
      setSparePartRequests(
        sparePartRequests.filter((req) => req.id !== selectedRequest.id)
      );
      setSelectedRequest(null);
      setIsRejectModalOpen(false);
    }
  };

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        อนุมัติใบเบิกอะไหล่
      </h1>

      {/* Tabs */}
      <div className="flex mb-6 border-b dark:border-gray-700">
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === 'request'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
          onClick={() => setActiveTab('request')}
        >
          วัสดุกรรม
        </button>
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === 'approved'
              ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
          }`}
          onClick={() => setActiveTab('approved')}
        >
          อนุมัติแล้ว
        </button>
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === 'rejected'
              ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
          }`}
          onClick={() => setActiveTab('rejected')}
        >
          ปฏิเสธแล้ว
        </button>
        <button
          className={`py-2 px-4 focus:outline-none ${
            activeTab === 'inventory'
              ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 font-semibold'
              : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
          }`}
          onClick={() => setActiveTab('inventory')}
        >
          คลังอะไหล่
        </button>
      </div>
      {/* Spare Part Details */}
      {selectedRequest && (
        <div className="mb-4 bg-white dark:bg-gray-800 shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-gray-300">
            รายละเอียดอะไหล่
          </h2>
          <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="border-b dark:border-gray-700">
                <th className="p-2 text-left text-gray-900 dark:text-gray-300">
                  รหัสอะไหล่
                </th>
                <th className="p-2 text-left text-gray-900 dark:text-gray-300">
                  ชื่ออะไหล่
                </th>
                <th className="p-2 text-right text-gray-900 dark:text-gray-300">
                  คงเหลือ
                </th>
                <th className="p-2 text-right text-gray-900 dark:text-gray-300">
                  จำนวนที่ต้องการ
                </th>
              </tr>
            </thead>
            <tbody>
              {spareParts.map((part, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-2 text-gray-900 dark:text-gray-300">
                    {part.partCode}
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-300">
                    {part.partName}
                  </td>
                  <td className="p-2 text-right text-gray-900 dark:text-gray-300">
                    {part.remaining}
                  </td>
                  <td className="p-2 text-right text-gray-900 dark:text-gray-300">
                    {part.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-gray-300 py-2 px-6 rounded flex items-center"
              onClick={() => setIsApproveModalOpen(true)}
            >
              <FaCheck className="mr-2" />
              อนุมัติ
            </button>
            <button
              className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-gray-300 py-2 px-6 rounded flex items-center"
              onClick={() => setIsRejectModalOpen(true)}
            >
              <FaTimes className="mr-2" />
              ปฏิเสธ
            </button>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'request' && (
        <div>
          {/* Request List */}
          <div className="mb-4 bg-white dark:bg-gray-800 shadow rounded p-4">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              รายการขอเบิกอะไหล่
            </h2>
            {sparePartRequests.length > 0 ? (
              sparePartRequests.map((request) => (
                <div
                  key={request.id}
                  className={`border-b border-gray-200 py-4 cursor-pointer ${
                    selectedRequest?.id === request.id
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : ''
                  }`}
                  onClick={() => handleSelectRequest(request)}
                >
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {request.itemName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    เลขที่ใบแจ้งซ่อม: {request.requestId}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    สถานที่: {request.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    ลักษณะอาการเสีย: {request.usageDetails}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    ชื่อผู้เบิก: {request.requester}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    วันที่เบิก: {request.requestTime}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                ไม่มีรายการขอเบิกอะไหล่
              </p>
            )}
          </div>
        </div>
      )}

      {/* Approved Tab */}
      {activeTab === 'approved' && (
        <div className="mb-4 bg-white dark:bg-gray-800 shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
            รายการที่อนุมัติแล้ว
          </h2>
          {approvedSpareParts.length > 0 ? (
            approvedSpareParts.map((request) => (
              <div key={request.id} className="border-b border-gray-200 py-4">
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {request.itemName}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  เลขที่ใบแจ้งซ่อม: {request.requestId}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  สถานที่: {request.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  วันที่อนุมัติ: {new Date().toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              ไม่มีรายการที่อนุมัติแล้ว
            </p>
          )}
        </div>
      )}

      {/* Rejected Tab */}
      {activeTab === 'rejected' && (
        <div className="mb-4 bg-white dark:bg-gray-800 shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
            รายการที่ปฏิเสธแล้ว
          </h2>
          {rejectedSpareParts.length > 0 ? (
            rejectedSpareParts.map((request) => (
              <div key={request.id} className="border-b border-gray-200 py-4">
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                  {request.itemName}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  เลขที่ใบแจ้งซ่อม: {request.requestId}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  สถานที่: {request.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  วันที่ปฏิเสธ: {new Date().toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              ไม่มีรายการที่ปฏิเสธแล้ว
            </p>
          )}
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="mb-4 bg-white dark:bg-gray-800 shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
            รายการในคลังอะไหล่
          </h2>
          <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="border-b dark:border-gray-700">
                <th className="p-2 text-left">รหัสอะไหล่</th>
                <th className="p-2 text-left">ชื่ออะไหล่</th>
                <th className="p-2 text-right">คงเหลือ</th>
              </tr>
            </thead>
            <tbody>
              {spareParts.map((part, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-2">{part.partCode}</td>
                  <td className="p-2">{part.partName}</td>
                  <td className="p-2 text-right">{part.remaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Approve Modal */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              ยืนยันการอนุมัติใบเบิกอะไหล่
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              คุณต้องการอนุมัติใบเบิกอะไหล่นี้ใช่หรือไม่?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white py-2 px-6 rounded flex items-center"
                onClick={handleApprove}
              >
                <FaCheck className="mr-2" />
                อนุมัติ
              </button>
              <button
                className="bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600 text-white py-2 px-6 rounded flex items-center"
                onClick={() => setIsApproveModalOpen(false)}
              >
                <FaTimes className="mr-2" />
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              ยืนยันการปฏิเสธใบเบิกอะไหล่
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              คุณต้องการปฏิเสธใบเบิกอะไหล่นี้ใช่หรือไม่?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white py-2 px-6 rounded flex items-center"
                onClick={handleReject}
              >
                <FaTimes className="mr-2" />
                ปฏิเสธ
              </button>
              <button
                className="bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600 text-white py-2 px-6 rounded flex items-center"
                onClick={() => setIsRejectModalOpen(false)}
              >
                <FaTimes className="mr-2" />
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SparePartApprovalPage;

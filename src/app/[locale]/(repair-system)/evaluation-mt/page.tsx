'use client';

import React, { useState, useEffect } from 'react';
import mockData from './mockData';
import { Task } from '@/types';

const EvaluationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedDocumentTask, setSelectedDocumentTask] = useState<Task | null>(
    null
  );
  const [evaluation, setEvaluation] = useState({ rating: '', comment: '' });

  const rowsPerPage = 5;

  // State for managing active tab ('evaluate' or 'track')
  const [activeTab, setActiveTab] = useState<'evaluate' | 'track'>('evaluate');

  // Separate lists for pending evaluation and evaluated tasks
  const [pendingEvaluationTasks, setPendingEvaluationTasks] =
    useState<Task[]>(mockData);
  const [evaluatedTasks, setEvaluatedTasks] = useState<Task[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEvaluation({ ...evaluation, rating: e.target.value });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEvaluation({ ...evaluation, comment: e.target.value });
  };

  const handleSubmitEvaluation = () => {
    if (window.confirm('คุณต้องการส่งการประเมินหรือไม่?')) {
      alert(
        `คุณได้ส่งการประเมินสำหรับ ${selectedTask?.repairNo} ด้วยคะแนน: ${evaluation.rating} และความคิดเห็น: ${evaluation.comment}`
      );
      if (selectedTask) {
        // Add evaluation data to the task
        const evaluatedTask = {
          ...selectedTask,
          evaluation: { ...evaluation },
        };
        // Remove from pending tasks
        setPendingEvaluationTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedTask.id)
        );
        // Add to evaluated tasks
        setEvaluatedTasks((prevTasks) => [...prevTasks, evaluatedTask]);
      }
      setSelectedTask(null);
      setEvaluation({ rating: '', comment: '' });
    }
  };

  const handleViewDocument = (task: Task) => {
    setSelectedDocumentTask(task);
  };

  // Determine which tasks to display based on active tab
  const tasksToDisplay =
    activeTab === 'evaluate' ? pendingEvaluationTasks : evaluatedTasks;

  // Filtered data based on search term
  const filteredData = tasksToDisplay.filter((item) =>
    item.device.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset current page when switching tabs or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  return (
    <div className="h-screen mx-auto p-6 overflow-auto bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        ติดตามงานซ่อม
      </h1>

      <div className="mb-6 border-b">
        <ul className="flex space-x-4">
          <li>
            <button
              className={`border-b-2 py-2 ${
                activeTab === 'evaluate'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-blue-500'
              }`}
              onClick={() => setActiveTab('evaluate')}
            >
              ประเมินงานซ่อม
            </button>
          </li>
          <li>
            <button
              className={`border-b-2 py-2 ${
                activeTab === 'track'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:border-blue-500'
              }`}
              onClick={() => setActiveTab('track')}
            >
              ติดตามงานซ่อม
            </button>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="ค้นหา..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 border">ดูใบแจ้งซ่อม</th>
              <th className="px-4 py-2 border">เลขที่ใบแจ้งซ่อม</th>
              <th className="px-4 py-2 border">วันที่แจ้งซ่อม</th>
              <th className="px-4 py-2 border">วันที่ซ่อมเสร็จ</th>
              <th className="px-4 py-2 border">รหัสครุภัณฑ์ (QR Code)</th>
              <th className="px-4 py-2 border">ประเภทเครื่องจักร / อุปกรณ์</th>
              <th className="px-4 py-2 border">สาเหตุของปัญหา</th>
              <th className="px-4 py-2 border">วิธีการแก้ไข</th>
              <th className="px-4 py-2 border">ชื่อผู้ซ่อม</th>
              <th className="px-4 py-2 border">สถานะ</th>
              {activeTab === 'evaluate' && (
                <th className="px-4 py-2 border">ประเมิน</th>
              )}
              {activeTab === 'track' && (
                <>
                  <th className="px-4 py-2 border">คะแนน</th>
                  <th className="px-4 py-2 border">ความคิดเห็น</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 border">
                    <button
                      className="text-blue-500 dark:text-blue-400 hover:underline focus:outline-none"
                      onClick={() => handleViewDocument(row)}
                    >
                      ดูเอกสาร
                    </button>
                  </td>
                  <td className="px-4 py-2 border">{row.repairNo}</td>
                  <td className="px-4 py-2 border">{row.dateRequested}</td>
                  <td className="px-4 py-2 border">{row.dateResolved}</td>
                  <td className="px-4 py-2 border">{row.qrCode}</td>
                  <td className="px-4 py-2 border">{row.device}</td>
                  <td className="px-4 py-2 border">{row.cause}</td>
                  <td className="px-4 py-2 border">{row.solution}</td>
                  <td className="px-4 py-2 border">{row.repairedBy}</td>
                  <td
                    className={`px-4 py-2 border ${
                      row.status === 'ซ่อมเสร็จแล้ว'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {row.status}
                  </td>
                  {activeTab === 'evaluate' && (
                    <td className="px-4 py-2 border">
                      <button
                        className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={() => setSelectedTask(row)}
                      >
                        ประเมิน
                      </button>
                    </td>
                  )}
                  {activeTab === 'track' && (
                    <>
                      <td className="px-4 py-2 border">
                        {row.evaluation?.rating || '-'}
                      </td>
                      <td className="px-4 py-2 border">
                        {row.evaluation?.comment || '-'}
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={activeTab === 'evaluate' ? 11 : 12}
                  className="px-4 py-2 text-center text-gray-600 dark:text-gray-400"
                >
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400">
          แสดง {indexOfFirstRow + 1} ถึง{' '}
          {indexOfLastRow > filteredData.length
            ? filteredData.length
            : indexOfLastRow}{' '}
          จาก {filteredData.length} รายการ
        </p>
        <div className="space-x-4">
          <button
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </button>
          <button
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            ถัดไป
          </button>
        </div>
      </div>

      {/* Evaluation Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              ประเมินงาน {selectedTask.device}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                คะแนน:
              </label>
              <select
                value={evaluation.rating}
                onChange={handleRatingChange}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- เลือกคะแนน --</option>
                <option value="1">1 - แย่</option>
                <option value="2">2 - พอใช้</option>
                <option value="3">3 - ปานกลาง</option>
                <option value="4">4 - ดี</option>
                <option value="5">5 - ยอดเยี่ยม</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                ความคิดเห็น:
              </label>
              <textarea
                value={evaluation.comment}
                onChange={handleCommentChange}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-700"
                onClick={() => {
                  setSelectedTask(null);
                  setEvaluation({ rating: '', comment: '' });
                }}
              >
                ยกเลิก
              </button>
              <button
                className={`px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 ${
                  !evaluation.rating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleSubmitEvaluation}
                disabled={!evaluation.rating}
              >
                ส่งการประเมิน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Modal */}
      {selectedDocumentTask && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setSelectedDocumentTask(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              เอกสารของงาน {selectedDocumentTask.device}
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>เลขที่ใบแจ้งซ่อม:</strong>{' '}
                {selectedDocumentTask.repairNo}
              </p>
              <p>
                <strong>วันที่แจ้งซ่อม:</strong>{' '}
                {selectedDocumentTask.dateRequested}
              </p>
              <p>
                <strong>วันที่ซ่อมเสร็จ:</strong>{' '}
                {selectedDocumentTask.dateResolved}
              </p>
              <p>
                <strong>รหัสครุภัณฑ์ (QR Code):</strong>{' '}
                {selectedDocumentTask.qrCode}
              </p>
              <p>
                <strong>สาเหตุของปัญหา:</strong> {selectedDocumentTask.cause}
              </p>
              <p>
                <strong>วิธีการแก้ไข:</strong> {selectedDocumentTask.solution}
              </p>
              <p>
                <strong>ชื่อผู้ซ่อม:</strong> {selectedDocumentTask.repairedBy}
              </p>
              <p>
                <strong>สถานะ:</strong>{' '}
                <span
                  className={
                    selectedDocumentTask.status === 'ซ่อมเสร็จแล้ว'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }
                >
                  {selectedDocumentTask.status}
                </span>
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => setSelectedDocumentTask(null)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationPage;

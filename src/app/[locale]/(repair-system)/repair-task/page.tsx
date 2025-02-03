'use client';

import React, { useState } from 'react';
import initialNewTasks from './mockData';

const MyRepairTask: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'onProcess' | 'completed'>(
    'new'
  );
  const [newTasks, setNewTasks] = useState(initialNewTasks);
  const [onProcessTasks, setOnProcessTasks] = useState<typeof initialNewTasks>(
    []
  );
  const [completedTasks, setCompletedTasks] = useState<typeof initialNewTasks>(
    []
  );

  const [taskStatus, setTaskStatus] = useState<
    Record<string, 'pending' | 'acknowledged' | 'inProgress' | 'completed'>
  >(
    initialNewTasks.reduce((acc, task) => {
      acc[task.repairNo] = 'pending';
      return acc;
    }, {} as Record<string, 'pending' | 'acknowledged' | 'inProgress' | 'completed'>)
  );

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentMediaSrc, setCurrentMediaSrc] = useState<string>('');

  const handleAcknowledge = (repairNo: string) => {
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [repairNo]: 'acknowledged',
    }));
    alert(`งาน ${repairNo} ได้รับทราบแล้ว`);
  };

  const handleStartRepair = (repairNo: string) => {
    const taskToMove = newTasks.find((task) => task.repairNo === repairNo);
    if (taskToMove) {
      setOnProcessTasks([...onProcessTasks, taskToMove]);
      setNewTasks(newTasks.filter((task) => task.repairNo !== repairNo));
      setTaskStatus((prevStatus) => ({
        ...prevStatus,
        [repairNo]: 'inProgress',
      }));
      setActiveTab('onProcess');
      alert(`งาน ${repairNo} ได้ถูกเริ่มแล้ว`);
    }
  };

  const handleCompleteRepair = (repairNo: string) => {
    const taskToMove = onProcessTasks.find(
      (task) => task.repairNo === repairNo
    );
    if (taskToMove) {
      setCompletedTasks([...completedTasks, taskToMove]);
      setOnProcessTasks(
        onProcessTasks.filter((task) => task.repairNo !== repairNo)
      );
      setTaskStatus((prevStatus) => ({
        ...prevStatus,
        [repairNo]: 'completed',
      }));
      setActiveTab('completed');
      alert(`งาน ${repairNo} เสร็จสมบูรณ์แล้ว`);
    }
  };

  const handleViewImage = (imageSrc: string) => {
    setCurrentMediaSrc(imageSrc);
    setIsImageModalOpen(true);
  };

  return (
    <div className="h-screen mx-auto p-6 bg-gray-50 dark:bg-gray-900 overflow-auto text-gray-800 dark:text-gray-100">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-4">
        My Repair Task
      </h1>

      {/* Toggle Tab */}
      <div className="flex mb-4 border-b border-gray-300 dark:border-gray-700">
        <button
          className={`px-6 py-2 text-white rounded-t-md transition-all ${
            activeTab === 'new'
              ? 'bg-blue-500 dark:bg-blue-600'
              : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => setActiveTab('new')}
        >
          New Task
        </button>
        <button
          className={`px-6 py-2 transition-all ${
            activeTab === 'onProcess'
              ? 'bg-blue-500 text-white rounded-t-md dark:bg-blue-600'
              : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => setActiveTab('onProcess')}
        >
          On Process Task
        </button>
        <button
          className={`px-6 py-2 rounded-t-md transition-all ${
            activeTab === 'completed'
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Task
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'new' && newTasks.length > 0 ? (
          newTasks.map((task, index) => (
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4 transition-all"
              key={index}
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`font-semibold ${
                    task.urgent ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {task.urgent ? 'ด่วนซ่อม' : 'ปกติ'}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {task.urgent ? 'ด่วน' : 'ไม่ด่วน (Not Urgent)'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {task.taskName}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                เลขที่ใบแจ้งซ่อม: {task.repairNo}
              </p>
              <div className="flex justify-between items-center mb-4">
                <div className="text-gray-700 dark:text-gray-300">
                  <p>อุปกรณ์: {task.equipment}</p>
                  <p>แผนก: {task.department}</p>
                  <p>ลักษณะอาการเสีย: {task.problem}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-all"
                    onClick={() => handleViewImage(task.image)}
                  >
                    ดูรูปภาพ
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-gray-700 dark:text-gray-300">
                  ผู้แจ้ง: {task.reportedBy}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {task.reportDate}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  สถานที่: {task.location}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    className={`px-4 py-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 border border-blue-600 rounded hover:bg-blue-200 dark:hover:bg-blue-900 transition-all ${
                      taskStatus[task.repairNo] !== 'pending'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => handleAcknowledge(task.repairNo)}
                    disabled={taskStatus[task.repairNo] !== 'pending'}
                  >
                    รับทราบแล้ว
                  </button>
                  <button
                    className={`px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-all ${
                      taskStatus[task.repairNo] !== 'acknowledged'
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => handleStartRepair(task.repairNo)}
                    disabled={taskStatus[task.repairNo] !== 'acknowledged'}
                  >
                    รับงานและเริ่มซ่อม
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : activeTab === 'new' && newTasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">ไม่มีงานใหม่</p>
        ) : activeTab === 'onProcess' && onProcessTasks.length > 0 ? (
          onProcessTasks.map((task, index) => (
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4"
              key={index}
            >
              <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {task.taskName}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                เลขที่ใบแจ้งซ่อม: {task.repairNo}
              </p>
              <p className="text-red-500 mt-2">
                ลักษณะอาการเสีย: {task.problem}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 transition-all"
                  onClick={() => handleCompleteRepair(task.repairNo)}
                >
                  เสร็จแล้ว
                </button>
              </div>
            </div>
          ))
        ) : activeTab === 'onProcess' && onProcessTasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            ไม่มีงานที่กำลังดำเนินการ
          </p>
        ) : completedTasks.length > 0 ? (
          completedTasks.map((task, index) => (
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4"
              key={index}
            >
              <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {task.taskName}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                เลขที่ใบแจ้งซ่อม: {task.repairNo}
              </p>
              <p className="text-green-500 mt-2">งานเสร็จสมบูรณ์</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            ไม่มีงานที่เสร็จสมบูรณ์
          </p>
        )}
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg">
            <img
              src={currentMediaSrc}
              alt="Task Image"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRepairTask;

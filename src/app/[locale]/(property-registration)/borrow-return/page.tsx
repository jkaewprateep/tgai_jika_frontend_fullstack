'use client';

import React, { useState } from 'react';
import {
  FaPlus,
  FaUndo,
  FaCheck,
  FaTimes,
  FaUsers,
  FaHistory,
} from 'react-icons/fa';
import { initialGroups, initialTools } from './mockData';
import { Tool } from '@/types';

interface Group {
  id: number;
  name: string;
}

interface HistoryRecord {
  id: number;
  toolId: number;
  action: 'Borrowed' | 'Returned';
  date: string;
  reason: string;
}

const BorrowReturnToolPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [reasonBorrow, setReasonBorrow] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('borrow');
  const [selectedTools, setSelectedTools] = useState<number[]>([]);
  const [searchBy, setSearchBy] = useState<'qr' | 'group'>('qr');
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Handle tool selection
  const handleToolSelection = (toolId: number) => {
    setSelectedTools((prevSelected) =>
      prevSelected.includes(toolId)
        ? prevSelected.filter((id) => id !== toolId)
        : [...prevSelected, toolId]
    );
  };

  // Handle Borrow Action
  const handleBorrow = () => {
    if (selectedTools.length === 0 || reasonBorrow.trim() === '') {
      setModalMessage(
        'Please select tools and provide a reason for borrowing.'
      );
      setShowModal(true);
      return;
    }

    const updatedTools = tools.map((tool) => {
      if (selectedTools.includes(tool.id)) {
        return {
          ...tool,
          status: 'Borrowed' as 'Borrowed',
          reasonBorrow,
        };
      }
      return tool;
    });

    const newHistoryRecords = selectedTools.map((toolId) => ({
      id: history.length + 1,
      toolId,
      action: 'Borrowed' as const,
      date: new Date().toLocaleString(),
      reason: reasonBorrow,
    }));

    setTools(updatedTools);
    setHistory([...history, ...newHistoryRecords]);
    setSelectedTools([]);
    setReasonBorrow('');
    setModalMessage('Tools borrowed successfully.');
    setShowModal(true);
  };

  // Handle Return Action
  const handleReturn = () => {
    if (selectedTools.length === 0) {
      setModalMessage('Please select tools to return.');
      setShowModal(true);
      return;
    }

    const updatedTools = tools.map((tool) => {
      if (selectedTools.includes(tool.id)) {
        return {
          ...tool,
          status: 'Available' as 'Available',
          reasonBorrow: '',
        };
      }
      return tool;
    });

    const newHistoryRecords = selectedTools.map((toolId) => ({
      id: history.length + 1,
      toolId,
      action: 'Returned' as const,
      date: new Date().toLocaleString(),
      reason: '',
    }));

    setTools(updatedTools);
    setHistory([...history, ...newHistoryRecords]);
    setSelectedTools([]);
    setModalMessage('Tools returned successfully.');
    setShowModal(true);
  };

  // Handle Group Creation
  const handleCreateGroup = () => {
    if (newGroupName.trim() === '') {
      setModalMessage('Please enter a group name.');
      setShowModal(true);
      return;
    }
    const newGroup: Group = {
      id: groups.length + 1,
      name: newGroupName,
    };
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setModalMessage('Group created successfully.');
    setShowModal(true);
  };

  // Filter tools based on search term and search type
  const filteredTools = tools.filter((tool) => {
    if (searchBy === 'qr') {
      return tool.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return tool.groupId === selectedGroupId;
    }
  });

  // Tools that are currently borrowed (for Return Tab)
  const borrowedTools = tools.filter((tool) => tool.status === 'Borrowed');

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-gray-50 dark:bg-gray-900 dark:text-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
        Borrow & Return Tool
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap items-center space-x-4 mb-6">
        <button
          className={`py-2 px-4 rounded flex items-center ${
            activeTab === 'borrow'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => {
            setActiveTab('borrow');
            setSelectedTools([]);
          }}
        >
          <FaPlus className="mr-2" />
          Borrow Tool
        </button>
        <button
          className={`py-2 px-4 rounded flex items-center ${
            activeTab === 'return'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => {
            setActiveTab('return');
            setSelectedTools([]);
          }}
        >
          <FaUndo className="mr-2" />
          Return Tool
        </button>
        <button
          className={`py-2 px-4 rounded flex items-center ${
            activeTab === 'group'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('group')}
        >
          <FaUsers className="mr-2" />
          Group Management
        </button>
        <button
          className={`py-2 px-4 rounded flex items-center ${
            activeTab === 'history'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory className="mr-2" />
          History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'borrow' && (
        <div>
          {/* Reason for Borrowing */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Reason for Borrowing
            </label>
            <input
              type="text"
              placeholder="Enter reason for borrowing"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              value={reasonBorrow}
              onChange={(e) => setReasonBorrow(e.target.value)}
            />
          </div>

          {/* Search Tool */}
          <div className="mb-6 flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="qr"
                name="searchBy"
                value="qr"
                className="mr-2"
                checked={searchBy === 'qr'}
                onChange={() => setSearchBy('qr')}
              />
              <label htmlFor="qr">Search by QR Code</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="group"
                name="searchBy"
                value="group"
                className="mr-2"
                checked={searchBy === 'group'}
                onChange={() => setSearchBy('group')}
              />
              <label htmlFor="group">Search by Group</label>
            </div>
            {searchBy === 'qr' ? (
              <input
                type="text"
                placeholder="Enter QR Code"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            ) : (
              <select
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                value={selectedGroupId || ''}
                onChange={(e) =>
                  setSelectedGroupId(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              >
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tools Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-3 text-left">Select</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">QR Code</th>
                  <th className="p-3 text-left">Machine Type</th>
                  <th className="p-3 text-left">Machine Name</th>
                  <th className="p-3 text-left">Brand</th>
                  <th className="p-3 text-left">Model</th>
                </tr>
              </thead>
              <tbody>
                {filteredTools.length > 0 ? (
                  filteredTools
                    .filter((tool) => tool.status === 'Available')
                    .map((tool) => (
                      <tr
                        key={tool.id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedTools.includes(tool.id)}
                            onChange={() => handleToolSelection(tool.id)}
                            aria-label={`Select tool ${tool.machineName}`}
                          />
                        </td>
                        <td className="p-3">{tool.status}</td>
                        <td className="p-3">{tool.qrCode}</td>
                        <td className="p-3">{tool.machineType}</td>
                        <td className="p-3">{tool.machineName}</td>
                        <td className="p-3">{tool.brand}</td>
                        <td className="p-3">{tool.model}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-3 text-center text-gray-500 dark:text-gray-400"
                    >
                      No available tools found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Borrow Button */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded flex items-center"
              onClick={handleBorrow}
            >
              <FaCheck className="mr-2" />
              Borrow
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded flex items-center"
              onClick={() => {
                setSelectedTools([]);
                setReasonBorrow('');
              }}
            >
              <FaTimes className="mr-2" />
              Reset
            </button>
          </div>
        </div>
      )}

      {activeTab === 'return' && (
        <div>
          {/* Search Tool */}
          <div className="mb-6 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search borrowed tools by QR Code"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Borrowed Tools Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-3 text-left">Select</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">QR Code</th>
                  <th className="p-3 text-left">Machine Type</th>
                  <th className="p-3 text-left">Machine Name</th>
                  <th className="p-3 text-left">Brand</th>
                  <th className="p-3 text-left">Model</th>
                  <th className="p-3 text-left">Reason Borrowed</th>
                </tr>
              </thead>
              <tbody>
                {borrowedTools.length > 0 ? (
                  borrowedTools
                    .filter((tool) =>
                      tool.qrCode
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((tool) => (
                      <tr
                        key={tool.id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedTools.includes(tool.id)}
                            onChange={() => handleToolSelection(tool.id)}
                            aria-label={`Select tool ${tool.machineName}`}
                          />
                        </td>
                        <td className="p-3">{tool.status}</td>
                        <td className="p-3">{tool.qrCode}</td>
                        <td className="p-3">{tool.machineType}</td>
                        <td className="p-3">{tool.machineName}</td>
                        <td className="p-3">{tool.brand}</td>
                        <td className="p-3">{tool.model}</td>
                        <td className="p-3">{tool.reasonBorrow}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-3 text-center text-gray-500 dark:text-gray-400"
                    >
                      No borrowed tools found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Return Button */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded flex items-center"
              onClick={handleReturn}
            >
              <FaUndo className="mr-2" />
              Return
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded flex items-center"
              onClick={() => setSelectedTools([])}
            >
              <FaTimes className="mr-2" />
              Reset
            </button>
          </div>
        </div>
      )}

      {activeTab === 'group' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400">
            Group Management
          </h2>

          {/* Create Group */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Create New Group</h3>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Enter group name"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded flex items-center"
                onClick={handleCreateGroup}
              >
                <FaPlus className="mr-2" />
                Create Group
              </button>
            </div>
          </div>

          {/* List of Groups */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Existing Groups</h3>
            <ul className="space-y-3">
              {groups.map((group) => (
                <li
                  key={group.id}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">{group.name}</span>
                  {/* Add edit and delete buttons if needed */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-yellow-700 dark:text-yellow-400">
            Borrow & Return Tool History
          </h2>

          {/* History Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg shadow-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Action</th>
                  <th className="p-3 text-left">Tool</th>
                  <th className="p-3 text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((record) => {
                    const tool = tools.find((t) => t.id === record.toolId);
                    return (
                      <tr
                        key={record.id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-3">{record.date}</td>
                        <td className="p-3">{record.action}</td>
                        <td className="p-3">{tool?.machineName}</td>
                        <td className="p-3">{record.reason || 'N/A'}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-3 text-center text-gray-500 dark:text-gray-400"
                    >
                      No history records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md mx-auto">
            <p className="text-lg text-center">{modalMessage}</p>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
                onClick={() => setShowModal(false)}
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

export default BorrowReturnToolPage;

'use client';

import React, { useEffect, useState } from 'react';
import { FaDownload, FaFilter, FaPlus, FaPrint } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { initialSpareParts } from './mockData';
import { SparePart } from '@/types';

const SparePartInventoryPage: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>(initialSpareParts);
  const [filteredSpareParts, setFilteredSpareParts] =
    useState<SparePart[]>(initialSpareParts);
  const [productionLine, setProductionLine] = useState<string>('Show All');
  const [brand, setBrand] = useState<string>('Show All');
  const [sparePartSpec, setSparePartSpec] = useState<string>('Show All');
  const [sparePartName, setSparePartName] = useState<string>('Show All');
  const [activeTab, setActiveTab] = useState<string>('Detail');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newSparePart, setNewSparePart] = useState<Partial<SparePart>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Dynamic filter options based on data
  const productionLines = Array.from(
    new Set(spareParts.map((part) => part.productionLine))
  );
  const brands = Array.from(new Set(spareParts.map((part) => part.brand)));
  const specs = Array.from(
    new Set(spareParts.map((part) => part.sparePartSpec))
  );
  const names = Array.from(
    new Set(spareParts.map((part) => part.sparePartName))
  );

  useEffect(() => {
    handleShowData();
  }, [productionLine, brand, sparePartSpec, sparePartName]);

  const handleShowData = () => {
    const filtered = spareParts.filter((part) => {
      const productionLineMatch =
        productionLine === 'Show All' || part.productionLine === productionLine;
      const brandMatch = brand === 'Show All' || part.brand === brand;
      const specMatch =
        sparePartSpec === 'Show All' || part.sparePartSpec === sparePartSpec;
      const nameMatch =
        sparePartName === 'Show All' || part.sparePartName === sparePartName;

      return productionLineMatch && brandMatch && specMatch && nameMatch;
    });
    setFilteredSpareParts(filtered);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setProductionLine('Show All');
    setBrand('Show All');
    setSparePartSpec('Show All');
    setSparePartName('Show All');
  };

  const handleAddNewSparePart = () => {
    setShowModal(true);
  };

  const handleSaveNewSparePart = () => {
    if (newSparePart) {
      const id = spareParts.length + 1;
      const sparePart: SparePart = {
        id,
        receivingDate: newSparePart.receivingDate || '',
        poNo: newSparePart.poNo || '',
        invoiceNo: newSparePart.invoiceNo || '',
        expireDate: newSparePart.expireDate || '',
        referenceName: newSparePart.referenceName || '',
        detail: newSparePart.detail || '',
        brand: newSparePart.brand || '',
        productionLine: newSparePart.productionLine || '',
        warehouse: newSparePart.warehouse || '',
        min: newSparePart.min || 0,
        max: newSparePart.max || 0,
        unitPrice: newSparePart.unitPrice || 0,
        total: newSparePart.total || 0,
        balance: newSparePart.balance || 0,
        spareUnit: newSparePart.spareUnit || '',
        sparePartSpec: newSparePart.sparePartSpec || '',
        sparePartName: newSparePart.sparePartName || '',
      };
      setSpareParts([...spareParts, sparePart]);
      setFilteredSpareParts([...spareParts, sparePart]);
      setShowModal(false);
      setNewSparePart({});
    }
  };

  const handleDownloadExcel = () => {
    if (filteredSpareParts.length === 0) {
      alert('No data to download.');
      return;
    }

    // Prepare data for Excel based on active tab
    let dataToExport = filteredSpareParts.map((part) => {
      if (activeTab === 'Detail') {
        const { id, ...rest } = part;
        return rest;
      } else if (activeTab === 'Balance') {
        return {
          'Spare Part Name': part.sparePartName,
          Balance: part.balance,
        };
      } else if (activeTab === 'Detail Balance') {
        return {
          'Spare Part Name': part.sparePartName,
          Detail: part.detail,
          Balance: part.balance,
        };
      }
      return part;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Spare_Part_Inventory');

    XLSX.writeFile(workbook, 'Spare_Part_Inventory.xlsx');
  };

  const handlePrintPage = () => {
    window.print();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSpareParts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSpareParts.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Sorting functionality
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...currentItems];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aKey = a as any;
        const bKey = b as any;
        if (aKey[sortConfig.key] < bKey[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aKey[sortConfig.key] > bKey[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [currentItems, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handlers for the buttons to display an alert
  const handleAddSparePartList = () => {
    alert('This feature is currently under development.');
  };

  const handleAddSparePartItem = () => {
    alert('This feature is currently under development.');
  };

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Spare Part Inventory
        </h1>
        <button
          className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white py-2 px-4 rounded flex items-center transition duration-300"
          onClick={() => alert('ฟังก์ชัน Instruction ยังไม่ได้ถูกพัฒนา')}
        >
          <FaFilter className="mr-2" />
          Instruction
        </button>
      </div>

      {/* Filter Form */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Production Line
          </label>
          <select
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            value={productionLine}
            onChange={(e) => setProductionLine(e.target.value)}
          >
            <option>Show All</option>
            {productionLines.map((line, index) => (
              <option key={index}>{line}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Brand
          </label>
          <select
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option>Show All</option>
            {brands.map((brand, index) => (
              <option key={index}>{brand}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Spare Part Spec
          </label>
          <select
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            value={sparePartSpec}
            onChange={(e) => setSparePartSpec(e.target.value)}
          >
            <option>Show All</option>
            {specs.map((spec, index) => (
              <option key={index}>{spec}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Spare Part Name
          </label>
          <select
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            value={sparePartName}
            onChange={(e) => setSparePartName(e.target.value)}
          >
            <option>Show All</option>
            {names.map((name, index) => (
              <option key={index}>{name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-300"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeTab === 'Detail'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
            onClick={() => setActiveTab('Detail')}
          >
            Detail
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeTab === 'Balance'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
            onClick={() => setActiveTab('Balance')}
          >
            Balance
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeTab === 'Detail Balance'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
            onClick={() => setActiveTab('Detail Balance')}
          >
            Detail Balance
          </button>
        </div>
      </div>

      {/* Action Buttons for Spare Part */}
      <div className="flex flex-wrap space-x-2 mb-6">
        <button
          className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded flex items-center transition duration-300"
          onClick={handleAddNewSparePart}
        >
          <FaPlus className="mr-2" />
          Add New Spare Part
        </button>
        <button
          className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
          onClick={handleAddSparePartList}
        >
          Add Spare Part List
        </button>
        <button
          className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
          onClick={handleAddSparePartItem}
        >
          Add Spare Part Item
        </button>
      </div>

      {/* Spare Part Table */}
      <div className="overflow-x-auto mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
          <thead>
            <tr className="border-b dark:border-gray-600">
              {activeTab === 'Detail' && (
                <>
                  <th
                    className="p-2 text-left dark:text-gray-300 cursor-pointer"
                    onClick={() => requestSort('receivingDate')}
                  >
                    Receiving Date
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">PO No.</th>
                  <th className="p-2 text-left dark:text-gray-300">
                    Invoice No.
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">
                    Expire Date
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">
                    Reference Name
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">Detail</th>
                  <th className="p-2 text-left dark:text-gray-300">Brand</th>
                  <th className="p-2 text-left dark:text-gray-300">
                    Production Line
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">
                    Warehouse
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">Min</th>
                  <th className="p-2 text-left dark:text-gray-300">Max</th>
                  <th className="p-2 text-left dark:text-gray-300">
                    Unit Price
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">Total</th>
                  <th className="p-2 text-left dark:text-gray-300">Balance</th>
                  <th className="p-2 text-left dark:text-gray-300">
                    Spare Unit
                  </th>
                </>
              )}
              {activeTab === 'Balance' && (
                <>
                  <th className="p-2 text-left dark:text-gray-300">
                    Spare Part Name
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">Balance</th>
                </>
              )}
              {activeTab === 'Detail Balance' && (
                <>
                  <th className="p-2 text-left dark:text-gray-300">
                    Spare Part Name
                  </th>
                  <th className="p-2 text-left dark:text-gray-300">Detail</th>
                  <th className="p-2 text-left dark:text-gray-300">Balance</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedItems.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    activeTab === 'Detail'
                      ? 15
                      : activeTab === 'Balance'
                      ? 2
                      : 3
                  }
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  No data available in table
                </td>
              </tr>
            ) : (
              sortedItems.map((part) => (
                <tr
                  key={part.id}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
                >
                  {activeTab === 'Detail' && (
                    <>
                      <td className="p-2 dark:text-gray-300">
                        {part.receivingDate}
                      </td>
                      <td className="p-2 dark:text-gray-300">{part.poNo}</td>
                      <td className="p-2 dark:text-gray-300">
                        {part.invoiceNo}
                      </td>
                      <td className="p-2 dark:text-gray-300">
                        {part.expireDate}
                      </td>
                      <td className="p-2 dark:text-gray-300">
                        {part.referenceName}
                      </td>
                      <td className="p-2 dark:text-gray-300">{part.detail}</td>
                      <td className="p-2 dark:text-gray-300">{part.brand}</td>
                      <td className="p-2 dark:text-gray-300">
                        {part.productionLine}
                      </td>
                      <td className="p-2 dark:text-gray-300">
                        {part.warehouse}
                      </td>
                      <td className="p-2 dark:text-gray-300">{part.min}</td>
                      <td className="p-2 dark:text-gray-300">{part.max}</td>
                      <td className="p-2 dark:text-gray-300">
                        {part.unitPrice}
                      </td>
                      <td className="p-2 dark:text-gray-300">{part.total}</td>
                      <td className="p-2 dark:text-gray-300">{part.balance}</td>
                      <td className="p-2 dark:text-gray-300">
                        {part.spareUnit}
                      </td>
                    </>
                  )}
                  {activeTab === 'Balance' && (
                    <>
                      <td className="p-2 dark:text-gray-300">
                        {part.sparePartName}
                      </td>
                      <td className="p-2 dark:text-gray-300">{part.balance}</td>
                    </>
                  )}
                  {activeTab === 'Detail Balance' && (
                    <>
                      <td className="p-2 dark:text-gray-300">
                        {part.sparePartName}
                      </td>
                      <td className="p-2 dark:text-gray-300">{part.detail}</td>
                      <td className="p-2 dark:text-gray-300">{part.balance}</td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6">
        <span className="text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
          Showing {indexOfFirstItem + 1} to{' '}
          {indexOfLastItem > filteredSpareParts.length
            ? filteredSpareParts.length
            : indexOfLastItem}{' '}
          of {filteredSpareParts.length} entries
        </span>
        <div className="flex items-center space-x-1">
          <button
            className={`py-1 px-3 border rounded-l ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
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
                className={`py-1 px-3 border ${
                  currentPage === number
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </button>
            )
          )}
          <button
            className={`py-1 px-3 border rounded-r ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Additional Action Buttons */}
      <div className="flex flex-wrap space-x-2 mt-6">
        <button
          className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center transition duration-300"
          onClick={handleDownloadExcel}
        >
          <FaDownload className="mr-2" />
          Download Excel
        </button>
        <button
          className="bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 text-white py-2 px-4 rounded flex items-center transition duration-300"
          onClick={handlePrintPage}
        >
          <FaPrint className="mr-2" />
          Print Page
        </button>
      </div>

      {/* Add New Spare Part Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Add New Spare Part
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Spare Part Name *
                </label>
                <input
                  type="text"
                  placeholder="Spare Part Name"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
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
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Brand *
                </label>
                <input
                  type="text"
                  placeholder="Brand"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  value={newSparePart.brand || ''}
                  onChange={(e) =>
                    setNewSparePart({ ...newSparePart, brand: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Unit Price *
                </label>
                <input
                  type="number"
                  placeholder="Unit Price"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  value={newSparePart.unitPrice || ''}
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      unitPrice: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Production Line *
                </label>
                <input
                  type="text"
                  placeholder="Production Line"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  value={newSparePart.productionLine || ''}
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      productionLine: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Warehouse *
                </label>
                <input
                  type="text"
                  placeholder="Warehouse"
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  value={newSparePart.warehouse || ''}
                  onChange={(e) =>
                    setNewSparePart({
                      ...newSparePart,
                      warehouse: e.target.value,
                    })
                  }
                />
              </div>
              {/* Add more input fields as needed */}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white py-2 px-4 rounded transition duration-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded transition duration-300"
                onClick={handleSaveNewSparePart}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SparePartInventoryPage;

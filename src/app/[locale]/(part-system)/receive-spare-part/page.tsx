'use client';

import React, { useState } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

interface SparePart {
  id: number;
  sparePartCode: string;
  sparePart: string;
  referenceName: string;
  description: string;
  brand: string;
  productionLine: string;
  warehouse: string;
  amount: number;
  unitPrice: number;
  expDate: string;
}

const ReceiveSparePartPage: React.FC = () => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([
    {
      id: 1,
      sparePartCode: '',
      sparePart: '',
      referenceName: '',
      description: '',
      brand: '',
      productionLine: '',
      warehouse: '',
      amount: 0,
      unitPrice: 0,
      expDate: '',
    },
  ]);
  const [poNo, setPoNo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [receivingDate, setReceivingDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSparePartChange = (index: number, field: string, value: any) => {
    const newSpareParts = [...spareParts];
    newSpareParts[index] = { ...newSpareParts[index], [field]: value };
    setSpareParts(newSpareParts);
  };

  const handleAddRow = () => {
    const newId = spareParts.length + 1;
    setSpareParts([
      ...spareParts,
      {
        id: newId,
        sparePartCode: '',
        sparePart: '',
        referenceName: '',
        description: '',
        brand: '',
        productionLine: '',
        warehouse: '',
        amount: 0,
        unitPrice: 0,
        expDate: '',
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    const newSpareParts = [...spareParts];
    newSpareParts.splice(index, 1);
    setSpareParts(newSpareParts);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!poNo.trim()) {
      newErrors.poNo = 'PO No. is required';
    }
    if (!receivingDate) {
      newErrors.receivingDate = 'Receiving Date is required';
    }
    spareParts.forEach((part, index) => {
      if (!part.sparePartCode.trim()) {
        newErrors[`sparePartCode_${index}`] = 'Spare Part Code is required';
      }
      if (!part.sparePart.trim()) {
        newErrors[`sparePart_${index}`] = 'Spare Part is required';
      }
      if (part.amount <= 0 || isNaN(part.amount)) {
        newErrors[`amount_${index}`] = 'Amount must be greater than 0';
      }
      if (part.unitPrice <= 0 || isNaN(part.unitPrice)) {
        newErrors[`unitPrice_${index}`] = 'Unit Price must be greater than 0';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving Spare Parts', {
        poNo,
        invoiceNo,
        receivingDate,
        spareParts,
      });
      // Simulate saving data
      setShowSuccessModal(true);
      // Reset form after successful save
      handleCancel();
      // Implement actual save logic here (e.g., API call)
    }
  };

  const handleCancel = () => {
    setPoNo('');
    setInvoiceNo('');
    setReceivingDate('');
    setSpareParts([
      {
        id: 1,
        sparePartCode: '',
        sparePart: '',
        referenceName: '',
        description: '',
        brand: '',
        productionLine: '',
        warehouse: '',
        amount: 0,
        unitPrice: 0,
        expDate: '',
      },
    ]);
    setErrors({});
  };

  return (
    <div className="h-screen overflow-auto mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
              Success!
            </h2>
            <p className="mb-4">Spare parts received successfully.</p>
            <button
              className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded"
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        Receive Spare Part
      </h1>

      {/* Form Inputs */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              PO No. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`border p-2 w-full rounded ${
                errors.poNo
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600`}
              value={poNo}
              onChange={(e) => setPoNo(e.target.value)}
            />
            {errors.poNo && (
              <p className="text-red-500 text-sm mt-1">{errors.poNo}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Invoice No.
            </label>
            <input
              type="text"
              className="border p-2 w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Receiving Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={`border p-2 w-full rounded ${
                errors.receivingDate
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-700'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600`}
              value={receivingDate}
              onChange={(e) => setReceivingDate(e.target.value)}
            />
            {errors.receivingDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.receivingDate}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Spare Parts Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
            Spare Parts
          </h2>
          <button
            className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
            onClick={handleAddRow}
          >
            <FaPlus className="mr-2" />
            Add Spare Part
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left font-semibold">
                  Spare Part Code *
                </th>
                <th className="p-3 text-left font-semibold">Spare Part *</th>
                <th className="p-3 text-left font-semibold">Reference Name</th>
                <th className="p-3 text-left font-semibold">Description</th>
                <th className="p-3 text-left font-semibold">Brand</th>
                <th className="p-3 text-left font-semibold">Production Line</th>
                <th className="p-3 text-left font-semibold">Warehouse</th>
                <th className="p-3 text-right font-semibold">Amount *</th>
                <th className="p-3 text-right font-semibold">Unit Price *</th>
                <th className="p-3 text-left font-semibold">Exp Date</th>
                <th className="p-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {spareParts.map((sparePart, index) => (
                <tr
                  key={sparePart.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <td className="p-2">
                    <input
                      type="text"
                      className={`border p-2 w-full rounded ${
                        errors[`sparePartCode_${index}`]
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600`}
                      value={sparePart.sparePartCode}
                      onChange={(e) =>
                        handleSparePartChange(
                          index,
                          'sparePartCode',
                          e.target.value
                        )
                      }
                    />
                    {errors[`sparePartCode_${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`sparePartCode_${index}`]}
                      </p>
                    )}
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className={`border p-2 w-full rounded ${
                        errors[`sparePart_${index}`]
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600`}
                      value={sparePart.sparePart}
                      onChange={(e) =>
                        handleSparePartChange(
                          index,
                          'sparePart',
                          e.target.value
                        )
                      }
                    />
                    {errors[`sparePart_${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`sparePart_${index}`]}
                      </p>
                    )}
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="border p-2 w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600"
                      value={sparePart.referenceName}
                      onChange={(e) =>
                        handleSparePartChange(
                          index,
                          'referenceName',
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="border p-2 w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600"
                      value={sparePart.description}
                      onChange={(e) =>
                        handleSparePartChange(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="border p-2 w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600"
                      value={sparePart.brand}
                      onChange={(e) =>
                        handleSparePartChange(index, 'brand', e.target.value)
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="border p-2 w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600"
                      value={sparePart.productionLine}
                      onChange={(e) =>
                        handleSparePartChange(
                          index,
                          'productionLine',
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      className="border p-2 w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600"
                      value={sparePart.warehouse}
                      onChange={(e) =>
                        handleSparePartChange(
                          index,
                          'warehouse',
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      min="0"
                      className={`border p-2 w-full rounded text-right ${
                        errors[`amount_${index}`]
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600`}
                      value={sparePart.amount}
                      onChange={(e) =>
                        handleSparePartChange(
                          index,
                          'amount',
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    {errors[`amount_${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`amount_${index}`]}
                      </p>
                    )}
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      min="0"
                      className={`border p-2 w-full rounded text-right ${
                        errors[`unitPrice_${index}`]
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600`}
                      value={sparePart.unitPrice}
                      onChange={(e) =>
                        handleSparePartChange(
                          index,
                          'unitPrice',
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    {errors[`unitPrice_${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`unitPrice_${index}`]}
                      </p>
                    )}
                  </td>
                  <td className="p-2">
                    <input
                      type="date"
                      className="border p-2 w-full rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-600"
                      value={sparePart.expDate}
                      onChange={(e) =>
                        handleSparePartChange(index, 'expDate', e.target.value)
                      }
                    />
                  </td>
                  <td className="p-2 text-center">
                    {spareParts.length > 1 && (
                      <button
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                        onClick={() => handleRemoveRow(index)}
                        title="Remove Spare Part"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-6 rounded flex items-center transition-colors duration-300"
          onClick={handleSave}
        >
          <FaSave className="mr-2" />
          Save
        </button>
        <button
          className="bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 text-white py-2 px-6 rounded flex items-center transition-colors duration-300"
          onClick={handleCancel}
        >
          <FaTimes className="mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReceiveSparePartPage;

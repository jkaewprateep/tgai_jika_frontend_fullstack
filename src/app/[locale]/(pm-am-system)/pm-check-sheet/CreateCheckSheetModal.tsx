import React from 'react';
import { useTranslations } from 'next-intl';

interface CreateCheckSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCheckSheet: () => void;
  newCheckSheet: {
    type: string;
    name: string;
    department: string;
    documentNo: string;
    revisionNo: string;
    validDate: string;
    image: File | null;
  };
  setNewCheckSheet: React.Dispatch<
    React.SetStateAction<{
      type: string;
      name: string;
      department: string;
      documentNo: string;
      revisionNo: string;
      validDate: string;
      image: File | null;
    }>
  >;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateCheckSheetModal: React.FC<CreateCheckSheetModalProps> = ({
  isOpen,
  onClose,
  onAddCheckSheet,
  newCheckSheet,
  setNewCheckSheet,
  handleInputChange,
  handleFileUpload,
}) => {
  const t = useTranslations('checksheet');

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center transition-opacity"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full transform transition-all duration-300 scale-95 opacity-100 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          {t('createCheckSheet')}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            {t('checkSheetType')}
          </label>
          <select
            name="type"
            value={newCheckSheet.type}
            onChange={(e) =>
              setNewCheckSheet({ ...newCheckSheet, type: e.target.value })
            }
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="PM">PM</option>
            <option value="AM">AM</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            {t('checkSheetName')}
          </label>
          <input
            type="text"
            name="name"
            value={newCheckSheet.name}
            onChange={handleInputChange}
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('checkSheetName')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              {t('documentNo')}
            </label>
            <input
              type="text"
              name="documentNo"
              value={newCheckSheet.documentNo}
              onChange={handleInputChange}
              className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('documentNo')}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              {t('revisionNo')}
            </label>
            <input
              type="text"
              name="revisionNo"
              value={newCheckSheet.revisionNo}
              onChange={handleInputChange}
              className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('revisionNo')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              {t('department')}
            </label>
            <input
              type="text"
              name="department"
              value={newCheckSheet.department}
              onChange={handleInputChange}
              className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('department')}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              {t('validDate')}
            </label>
            <input
              type="date"
              name="validDate"
              value={newCheckSheet.validDate}
              onChange={handleInputChange}
              className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            {t('image')}
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 w-full rounded"
            accept=".jpg, .jpeg, .png"
          />
          {newCheckSheet.image && (
            <img
              src={URL.createObjectURL(newCheckSheet.image)}
              alt="Preview"
              className="mt-2 rounded shadow w-32 h-32 object-cover"
            />
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {t('dragOrUpload')}
          </p>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-gray-500 dark:bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
            onClick={onClose}
          >
            {t('cancel')}
          </button>
          <button
            className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            onClick={onAddCheckSheet}
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCheckSheetModal;

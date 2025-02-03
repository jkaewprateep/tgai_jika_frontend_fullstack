import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface CreatePMAMPlanModalProps {
  onAddPMAMPlan: (newPlan: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CreatePMAMPlanModal: React.FC<CreatePMAMPlanModalProps> = ({
  onAddPMAMPlan,
  isOpen,
  onClose,
}) => {
  const t = useTranslations('checksheet');
  const [newPlan, setNewPlan] = useState({
    machineType: '',
    machineName: '',
    machineLocation: '',
    checkSheetName: '',
    frequency: 0,
    startDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (newPlan.frequency < 0) {
      alert(t('frequencyPositive'));
      return;
    }

    onAddPMAMPlan({
      ...newPlan,
      createdBy: 'SYSON1',
      dateCreated: new Date().toLocaleString(),
    });
    setNewPlan({
      machineType: '',
      machineName: '',
      machineLocation: '',
      checkSheetName: '',
      frequency: 0,
      startDate: '',
    });
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center transition-opacity"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full transform transition-all duration-300 scale-95 opacity-100 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          {t('createPMAMPlan')}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="machineType"
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('machineType')}
            value={newPlan.machineType}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="machineName"
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('machineName')}
            value={newPlan.machineName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="machineLocation"
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('machineLocation')}
            value={newPlan.machineLocation}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="checkSheetName"
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('checkSheetName')}
            value={newPlan.checkSheetName}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="frequency"
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('frequency')}
            value={newPlan.frequency}
            onChange={(e) =>
              setNewPlan({
                ...newPlan,
                frequency: parseInt(e.target.value, 10),
              })
            }
          />
          <input
            type="date"
            name="startDate"
            className="border dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPlan.startDate}
            onChange={handleInputChange}
          />
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
            onClick={handleSave}
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePMAMPlanModal;

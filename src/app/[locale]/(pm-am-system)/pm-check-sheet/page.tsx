'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import CreatePMAMPlanModal from './CreatePMAMPlanModal';
import CreateCheckSheetModal from './CreateCheckSheetModal';
import CheckSheetTable from './CheckSheetTable';
import PMAMPlanTable from './PMAMPlanTable';
import { initialCheckSheets, initialPMAMPlans } from './mockdata';
import { CheckSheet, PMAMPlan } from '@/types';

const CheckSheetPMAMPage: React.FC = () => {
  const t = useTranslations('checksheet');
  const [checkSheets, setCheckSheets] =
    useState<CheckSheet[]>(initialCheckSheets);
  const [newCheckSheet, setNewCheckSheet] = useState<{
    type: string;
    name: string;
    department: string;
    documentNo: string;
    revisionNo: string;
    validDate: string;
    image: File | null;
  }>({
    type: 'PM',
    name: '',
    department: '',
    documentNo: '',
    revisionNo: '',
    validDate: '',
    image: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [pmPlans, setPmPlans] = useState<PMAMPlan[]>(initialPMAMPlans);
  const [newPlan, setNewPlan] = useState({
    machineType: '',
    machineName: '',
    machineLocation: '',
    checkSheetName: '',
    frequency: 0,
    startDate: '',
  });

  const [activeTab, setActiveTab] = useState<'checkSheet' | 'pmamPlan'>(
    'checkSheet'
  );
  const [notification, setNotification] = useState<string | null>(null);

  const [isPMAMPlanModalOpen, setIsPMAMPlanModalOpen] = useState(false);
  const openPMAMPlanModal = () => setIsPMAMPlanModalOpen(true);
  const closePMAMPlanModal = () => setIsPMAMPlanModalOpen(false);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddCheckSheet = () => {
    if (newCheckSheet) {
      const newSheet: CheckSheet = {
        id: checkSheets.length + 1,
        name: newCheckSheet.name,
        qty: 10,
        documentNo: '-',
        revisionNo: 'A',
        department: 'ไม่ระบุ (None)',
        type: 'PM',
        isUsedSparePart: false,
        dateCreated: new Date().toLocaleString(),
        createdBy: 'SYSON1',
        dateUpdated: '',
        updatedBy: '',
      };
      setCheckSheets([...checkSheets, newSheet]);
      setNewCheckSheet({
        type: 'PM',
        name: '',
        department: '',
        documentNo: '',
        revisionNo: '',
        validDate: '',
        image: null,
      });
      showNotification(t('checkSheetAdded'));
    }
  };

  const handleDeleteCheckSheet = (id: number) => {
    if (confirm(t('confirmDeleteCheckSheet'))) {
      setCheckSheets(checkSheets.filter((sheet) => sheet.id !== id));
      showNotification(t('checkSheetDeleted'));
    }
  };

  const handleAddPMAMPlan = () => {
    if (newPlan.machineType && newPlan.machineName && newPlan.checkSheetName) {
      const newPlanToAdd: PMAMPlan = {
        id: pmPlans.length + 1,
        ...newPlan,
        createdBy: 'SYSON1',
        dateCreated: new Date().toLocaleString(),
      };
      setPmPlans([...pmPlans, newPlanToAdd]);
      setNewPlan({
        machineType: '',
        machineName: '',
        machineLocation: '',
        checkSheetName: '',
        frequency: 0,
        startDate: '',
      });
      showNotification(t('pmamPlanAdded'));
    }
  };
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCheckSheet((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewCheckSheet((prev) => ({ ...prev, image: file }));
  };

  const handleDeletePMAMPlan = (id: number) => {
    if (confirm(t('confirmDeletePMAMPlan'))) {
      setPmPlans(pmPlans.filter((plan) => plan.id !== id));
      showNotification(t('pmamPlanDeleted'));
    }
  };
  return (
    <div className="mx-auto p-4 h-screen overflow-auto bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 dark:bg-green-700 text-white py-2 px-4 rounded transition-opacity">
          {notification}
        </div>
      )}

      {/* Modal */}
      <CreateCheckSheetModal
        isOpen={showModal}
        onClose={closeModal}
        onAddCheckSheet={handleAddCheckSheet}
        newCheckSheet={newCheckSheet}
        setNewCheckSheet={setNewCheckSheet}
        handleInputChange={handleInputChange}
        handleFileUpload={handleFileUpload}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {t('createPlan')}
        </h1>
        <button className="bg-red-500 dark:bg-red-600 text-white py-1 px-3 rounded">
          {t('instruction')}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 transition-all duration-200 ${
              activeTab === 'checkSheet'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('checkSheet')}
          >
            {t('createCheckSheet')}
          </button>
          <button
            className={`py-2 px-4 transition-all duration-200 ${
              activeTab === 'pmamPlan'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('pmamPlan')}
          >
            {t('createPMAMPlan')}
          </button>
        </div>
      </div>

      {/* Check Sheet Section */}
      {activeTab === 'checkSheet' && (
        <>
          <button
            className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded mb-4"
            onClick={openModal}
          >
            + {t('createCheckSheet')}
          </button>

          {/* Check Sheet Table */}
          <CheckSheetTable
            checkSheets={checkSheets}
            onDeleteCheckSheet={handleDeleteCheckSheet}
          />
        </>
      )}

      {/* PM/AM Plan Section */}
      {activeTab === 'pmamPlan' && (
        <>
          <button
            className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded mb-4"
            onClick={openPMAMPlanModal}
          >
            + {t('createPMAMPlan')}
          </button>

          {/* PM/AM Plan Modal */}
          <CreatePMAMPlanModal
            onAddPMAMPlan={handleAddPMAMPlan}
            isOpen={isPMAMPlanModalOpen}
            onClose={closePMAMPlanModal}
          />

          {/* PM/AM Plan Table */}
          <PMAMPlanTable
            pmPlans={pmPlans}
            onDeletePMAMPlan={handleDeletePMAMPlan}
          />
        </>
      )}
    </div>
  );
};

export default CheckSheetPMAMPage;

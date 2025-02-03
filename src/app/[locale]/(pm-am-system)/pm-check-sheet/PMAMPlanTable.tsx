import React from 'react';
import { useTranslations } from 'next-intl';

interface PMAMPlan {
  id: number;
  machineType: string;
  machineName: string;
  machineLocation: string;
  checkSheetName: string;
  frequency: number;
  startDate: string;
  createdBy: string;
  dateCreated: string;
}

interface PMAMPlanTableProps {
  pmPlans: PMAMPlan[];
  onDeletePMAMPlan: (id: number) => void;
}

const PMAMPlanTable: React.FC<PMAMPlanTableProps> = ({
  pmPlans,
  onDeletePMAMPlan,
}) => {
  const t = useTranslations('checksheet');

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          <tr className="border-b dark:border-gray-600">
            <th className="p-2">{t('machineType')}</th>
            <th className="p-2">{t('machineName')}</th>
            <th className="p-2">{t('machineLocation')}</th>
            <th className="p-2">{t('checkSheetName')}</th>
            <th className="p-2">{t('frequency')}</th>
            <th className="p-2">{t('startDate')}</th>
            <th className="p-2">{t('createdBy')}</th>
            <th className="p-2">{t('dateCreated')}</th>
            <th className="p-2">{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {pmPlans.map((plan) => (
            <tr
              key={plan.id}
              className="border-b dark:border-gray-700 text-center"
            >
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {plan.machineType}
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {plan.machineName}
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {plan.machineLocation}
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {plan.checkSheetName}
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {plan.frequency} Days
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {plan.startDate}
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {plan.createdBy}
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {plan.dateCreated}
              </td>
              <td className="p-2">
                <button className="bg-blue-500 dark:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                  {t('edit')}
                </button>
                <button
                  className="bg-red-500 dark:bg-red-600 text-white py-1 px-2 rounded"
                  onClick={() => onDeletePMAMPlan(plan.id)}
                >
                  {t('delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PMAMPlanTable;

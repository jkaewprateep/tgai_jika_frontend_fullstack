import React from 'react';
import { useTranslations } from 'next-intl';

interface CheckSheet {
  id: number;
  name: string;
  qty: number;
  documentNo: string;
  revisionNo: string;
  department: string;
  type: string;
  isUsedSparePart: boolean;
  dateCreated: string;
  createdBy: string;
  dateUpdated: string;
  updatedBy: string;
}

interface CheckSheetTableProps {
  checkSheets: CheckSheet[];
  onDeleteCheckSheet: (id: number) => void;
}

const CheckSheetTable: React.FC<CheckSheetTableProps> = ({
  checkSheets,
  onDeleteCheckSheet,
}) => {
  const t = useTranslations('checksheet');

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          <tr className="border-b dark:border-gray-600">
            <th className="p-2 text-center">{t('view')}</th>
            <th className="p-2 text-left">{t('checkSheetName')}</th>
            <th className="p-2 text-center">Qty</th>
            <th className="p-2 text-center">{t('documentNo')}</th>
            <th className="p-2 text-center">{t('revisionNo')}</th>
            <th className="p-2 text-center">{t('department')}</th>
            <th className="p-2 text-center">{t('checkSheetType')}</th>
            <th className="p-2 text-center">{t('dateCreated')}</th>
            <th className="p-2 text-center">{t('createdBy')}</th>
            <th className="p-2 text-center">{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {checkSheets.map((sheet) => (
            <tr key={sheet.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  className="text-blue-500 dark:text-blue-400"
                />
              </td>
              <td className="p-2 text-gray-900 dark:text-gray-100">
                {sheet.name}
              </td>
              <td className="p-2 text-center">
                <a
                  href="#"
                  className="text-blue-500 dark:text-blue-400 underline"
                >
                  {sheet.qty} {t('items')}
                </a>
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-gray-100">
                {sheet.documentNo}
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-gray-100">
                {sheet.revisionNo}
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-gray-100">
                {sheet.department}
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-gray-100">
                {sheet.type}
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-gray-100">
                {sheet.dateCreated}
              </td>
              <td className="p-2 text-center text-gray-900 dark:text-gray-100">
                {sheet.createdBy}
              </td>
              <td className="p-2 text-center">
                <button className="bg-blue-500 dark:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                  {t('edit')}
                </button>
                <button
                  className="bg-red-500 dark:bg-red-600 text-white py-1 px-2 rounded"
                  onClick={() => onDeleteCheckSheet(sheet.id)}
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

export default CheckSheetTable;

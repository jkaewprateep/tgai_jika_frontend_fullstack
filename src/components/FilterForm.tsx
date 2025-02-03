const FilterForm: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <form className="flex justify-between">
        {/* ชื่อบริษัท */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            ชื่อบริษัท:
          </label>
          <select className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <option value="system">System Stone</option>
          </select>
        </div>

        {/* วันที่กำหนด */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            วันที่กำหนด:
          </label>
          <input
            type="date"
            className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* QR Code */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            QR Code:
          </label>
          <select className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <option value="total">total</option>
          </select>
        </div>

        {/* ประเภทเครื่องจักร */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            ประเภทเครื่องจักร:
          </label>
          <select className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <option value="total">total</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Location:
          </label>
          <select className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <option value="total">total</option>
          </select>
        </div>

        {/* ผู้รับผิดชอบ */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            ผู้รับผิดชอบ:
          </label>
          <select className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <option value="total">total</option>
          </select>
        </div>

        {/* ประเภทใบงาน */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            ประเภทใบงาน:
          </label>
          <select className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <option value="total">total</option>
          </select>
        </div>

        {/* สถานะ */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            สถานะ:
          </label>
          <select className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <option value="total">total</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;

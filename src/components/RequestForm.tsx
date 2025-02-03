// components/RequestForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  FaFire,
  FaBarcode,
  FaImage,
  FaHardHat,
  FaCheckCircle,
} from 'react-icons/fa';

interface RepairData {
  repairNo: string;
  dateRequested: string;
  unsettledDays: number;
  internalSN: string;
  device: string;
  problem: string;
  repairType: string;
  lastComment: string;
  reportedBy: string;
  technician: string;
  machineStatus: string;
}

interface RequestFormProps {
  onSubmit: (newData: RepairData) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSubmit }) => {
  // Form states
  const [problemDescription, setProblemDescription] = useState('');
  const [deviceOrQRCode, setDeviceOrQRCode] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('Normal');
  const [productLotNo, setProductLotNo] = useState('');
  const [isEngineer, setIsEngineer] = useState(true);
  const [isSafetyRelated, setIsSafetyRelated] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Focus trap
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  // Function to generate a new repair number
  const generateRepairNo = () => {
    // Generate a random repair number for demonstration
    return (
      'R' +
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')
    );
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!problemDescription.trim()) {
      newErrors.problemDescription = 'Problem description is required.';
    }
    if (!deviceOrQRCode.trim()) {
      newErrors.deviceOrQRCode = 'Device or QR Code is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newRepairNo = generateRepairNo();
    const newRepairData: RepairData = {
      repairNo: newRepairNo,
      dateRequested: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      unsettledDays: 0,
      internalSN: deviceOrQRCode,
      device: deviceOrQRCode,
      problem: problemDescription,
      repairType: isEngineer ? 'Engineer' : 'Self Repair',
      lastComment: '',
      reportedBy: 'Current User', // Replace with actual user
      technician: '', // Can be assigned later
      machineStatus: 'Stopped', // Default value
    };
    onSubmit(newRepairData);
    // Reset form inputs
    setProblemDescription('');
    setDeviceOrQRCode('');
    setUrgencyLevel('Normal');
    setProductLotNo('');
    setImages([]);
    setIsEngineer(true);
    setIsSafetyRelated(false);
    setErrors({});
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Request Repair
      </h2>
      <div className="space-y-6 md:space-y-8">
        {/* Problem Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Describe the problem *"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            ref={firstInputRef}
            className={`w-full border ${
              errors.problemDescription
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700`}
          />
          {errors.problemDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.problemDescription}
            </p>
          )}
        </div>

        {/* Search by Device */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Device/ Machine Name or QR Code *"
            value={deviceOrQRCode}
            onChange={(e) => setDeviceOrQRCode(e.target.value)}
            className={`w-full border ${
              errors.deviceOrQRCode
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700`}
          />
          <div className="absolute right-4 top-3">
            <FaBarcode className="text-blue-500 text-2xl" />
          </div>
          {errors.deviceOrQRCode && (
            <p className="text-red-500 text-sm mt-1">{errors.deviceOrQRCode}</p>
          )}
        </div>

        {/* Add Image(s) */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <FaImage className="text-xl text-green-600" />
            <label className="cursor-pointer text-lg">
              Add Image(s)
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Display Uploaded Files */}
        <div className="mt-4 space-y-4">
          {images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Uploaded Images:</h3>
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {images.map((image, index) => (
                  <li key={index}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Type Repair */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center space-x-2">
            <FaHardHat className="text-2xl text-yellow-500" />
            <span className="text-lg">Type of Repair</span>
          </div>
          <div className="flex gap-4">
            <button
              className={`px-6 py-3 rounded-lg ${
                isEngineer
                  ? 'bg-blue-500 dark:bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              } hover:bg-blue-600 dark:hover:bg-blue-700 transition-all`}
              onClick={() => setIsEngineer(true)}
            >
              Engineer
            </button>
            <button
              className={`px-6 py-3 rounded-lg ${
                !isEngineer
                  ? 'bg-blue-500 dark:bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              } hover:bg-blue-600 dark:hover:bg-blue-700 transition-all`}
              onClick={() => setIsEngineer(false)}
            >
              Self Repair
            </button>
          </div>
        </div>

        {/* Related to Safety */}
        <div className="flex items-center space-x-3">
          <FaCheckCircle className="text-2xl text-red-600" />
          <span className="text-lg">Related to Safety</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isSafetyRelated}
              onChange={() => setIsSafetyRelated(!isSafetyRelated)}
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-green-500 transition-all"></div>
            <span className="ml-3 text-lg">
              {isSafetyRelated ? 'Yes' : 'No'}
            </span>
          </label>
        </div>

        {/* Urgency Level */}
        <div className="flex items-center space-x-3">
          <FaFire className="text-2xl text-red-500" />
          <span className="text-lg">Urgency Level</span>
          <select
            value={urgencyLevel}
            onChange={(e) => setUrgencyLevel(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
        </div>

        {/* Product Lot No. */}
        <div className="relative">
          <input
            type="text"
            placeholder="Product Lot No."
            value={productLotNo}
            onChange={(e) => setProductLotNo(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>

        {/* Confirm Button */}
        <div className="mt-8">
          <button
            className="bg-green-500 dark:bg-green-600 text-white px-6 py-3 rounded-lg w-full md:w-auto hover:bg-green-600 dark:hover:bg-green-700 transition-all"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;

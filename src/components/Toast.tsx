// components/Toast.tsx
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md flex items-center shadow-lg z-50">
      <FaCheckCircle className="mr-2" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;

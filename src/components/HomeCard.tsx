import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faUtensils } from '@fortawesome/free-solid-svg-icons';

interface HomeCardProps {
  value: number;
  icon: 'home' | 'car' | 'utensils';
}

const HomeCard: React.FC<HomeCardProps> = ({ value, icon }) => {
  // เลือกไอคอนที่ต้องการแสดง
  const renderIcon = () => {
    switch (icon) {
      case 'home':
        return (
          <FontAwesomeIcon
            icon={faHome}
            className="text-2xl sm:text-3xl mt-3 relative"
          />
        );
      case 'car':
        return (
          <FontAwesomeIcon
            icon={faCar}
            className="text-2xl sm:text-3xl mt-3 relative"
          />
        );
      case 'utensils':
        return (
          <FontAwesomeIcon
            icon={faUtensils}
            className="text-2xl sm:text-3xl mt-3 relative"
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="w-full bg-green-700 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* เพิ่มเลเยอร์โปร่งแสงและแสงสะท้อน */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl opacity-20"></div>
      <div className="absolute inset-0 bg-white/5 rounded-full transform scale-150 opacity-50 blur-lg"></div>

      {/* เพิ่มความมีมิติเข้มขึ้น */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold relative"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {Number.isInteger(value) ? value : value.toFixed(2)}
      </motion.p>
      <p className="text-xs sm:text-sm relative">
        KgCo<sub>2</sub>
      </p>
      {renderIcon()}
    </motion.div>
  );
};

export default HomeCard;

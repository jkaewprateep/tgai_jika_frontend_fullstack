import React from 'react';

interface RecommendationCardProps {
  randomTip: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  randomTip,
}) => {
  return (
    <div className="p-4 rounded-xl mt-4">
      <div className="bg-green-100 p-4 rounded-xl shadow-md text-center opacity-95">
        <h3 className="text-lg font-semibold text-gray-800">คำแนะนำ</h3>
        <p className="text-sm text-gray-600">{randomTip}</p>
      </div>
    </div>
  );
};

export default RecommendationCard;

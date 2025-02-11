import React from 'react';

const PrayerReadings: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <img src="/soon.png" alt="Coming Soon" className="w-64 h-auto mb-6" />
      <h1 className="text-3xl font-semibold text-center">Coming Soon</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">We're working hard to bring you this page. Stay tuned!</p>
    </div>
  );
};

export default PrayerReadings;

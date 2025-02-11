import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ThemeContext } from '../context/ThemeContext';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTafsir, setShowTafsir] = useState(() => {
    const storedShowTafsir = localStorage.getItem('showTafsir');
    return storedShowTafsir === 'true' ? true : false;
  });

  useEffect(() => {
    localStorage.setItem('showTafsir', String(showTafsir));
  }, [showTafsir]);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const toggleTafsir = () => {
    setShowTafsir(!showTafsir);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">Setelan</h1>
      </div>

      <div className="container mx-auto mt-6 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">Mode gelap</label>
            <button
              onClick={toggleTheme}
              className={`ml-4 rounded-full w-12 h-6 transition-colors duration-200 focus:outline-none ${
                theme === 'dark' ? 'bg-[#1b76f5]' : 'bg-gray-400'
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${
                  theme === 'dark' ? 'translate-x-6 bg-gray-800' : 'translate-x-0 bg-white'
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">Tampilkan terjemah</label>
            <button
              onClick={toggleTranslation}
              className={`ml-4 rounded-full w-12 h-6 transition-colors duration-200 focus:outline-none ${
                showTranslation ? 'bg-[#1b76f5]' : 'bg-gray-400'
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${
                  showTranslation ? 'translate-x-6 bg-gray-800' : 'translate-x-0 bg-white'
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">Tampilkan tafsir</label>
            <button
              onClick={toggleTafsir}
              className={`ml-4 rounded-full w-12 h-6 transition-colors duration-200 focus:outline-none ${
                showTafsir ? 'bg-[#1b76f5]' : 'bg-gray-400'
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${
                  showTafsir ? 'translate-x-6 bg-gray-800' : 'translate-x-0 bg-white'
                }`}
              ></span>
            </button>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          <p>2025 © MyQuran Online</p>
          <p>
            Made with ❤️ by <a href="https://www.instagram.com/angga.x0" target="_blank" rel="noopener noreferrer" className="text-[#1b76f5] hover:underline">Angga Pratama</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

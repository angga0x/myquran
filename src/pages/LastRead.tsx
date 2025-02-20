import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { LastRead } from '../types/quran';

const LastReadPage: React.FC = () => {
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLastRead = localStorage.getItem('lastRead');
    if (storedLastRead) {
      setLastRead(JSON.parse(storedLastRead));
    }
  }, []);

  if (!lastRead) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center shadow-sm">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">Terakhir Dibaca</h1>
        </div>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 dark:text-gray-400">Belum ada ayat yang dibaca terakhir.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">Terakhir Dibaca</h1>
      </div>

      <div className="container mx-auto mt-6 px-4">
        <h2 className="text-gray-700 dark:text-gray-300 font-semibold mb-4">Ayat terakhir dibaca:</h2>
        <Link to={`/surah/${lastRead.surahNumber}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between transition-colors duration-300 hover:shadow-lg">
          <div>
            <p className="text-gray-600 dark:text-gray-300">Ayat ke {lastRead.ayahNumber}</p>
          </div>
          <div>
            <p className="font-arabic text-3xl text-gray-800 dark:text-gray-200">{lastRead.surahName}</p>
            <p className="text-gray-500 dark:text-gray-400">{lastRead.surahNameLatin}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LastReadPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getAsmaulHusna } from '../services/asmaulHusnaApi';

interface AsmaulHusnaItem {
  index: string;
  latin: string;
  arab: string;
  terjemahan_id: string;
  terjemahan_en: string;
}

const AsmaulHusna: React.FC = () => {
  const [asmaulHusna, setAsmaulHusna] = useState<AsmaulHusnaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAsmaulHusna = async () => {
      try {
        const data = await getAsmaulHusna();
        setAsmaulHusna(data);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchAsmaulHusna();
  }, []);

  const filteredAsmaulHusna = asmaulHusna ? asmaulHusna.filter(item =>
    item.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.terjemahan_id.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading Asmaul Husna...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">Asmaul Husna</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari Asmaul Husna..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b76f5] focus:border-transparent transition-colors duration-300"
          />
        </div>
      </div>

      {/* Asmaul Husna List */}
      <div className="px-4 space-y-4 mt-4">
        {filteredAsmaulHusna.map((item) => (
          <div
            key={item.index}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm transition-colors duration-300"
          >
            <div className="flex flex-col items-center">
              <span className="text-gray-600 dark:text-gray-300 font-semibold self-start">{item.index}.</span>
              <p className="font-arabic text-3xl text-gray-800 dark:text-gray-200 text-center mb-3" dir="rtl">{item.arab}</p>
              <p className="text-gray-500 dark:text-gray-400 text-center font-bold">{item.latin}</p>
              <p className="text-gray-500 dark:text-gray-400 text-center italic">{item.terjemahan_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsmaulHusna;

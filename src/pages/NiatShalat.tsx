import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getNiatShalat } from '../services/niatShalatApi';

interface NiatShalatItem {
  id: number;
  name: string;
  arabic: string;
  latin: string;
  translation: string;
}

const NiatShalat: React.FC = () => {
  const [niatShalat, setNiatShalat] = useState<NiatShalatItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [expandedNiat, setExpandedNiat] = useState<number | null>(null);

  useEffect(() => {
    const fetchNiatShalat = async () => {
      try {
        const data = await getNiatShalat();
        setNiatShalat(data);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchNiatShalat();
  }, []);

  const filteredNiatShalat = niatShalat ? niatShalat.filter((item: NiatShalatItem) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.translation?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const toggleNiat = (index: number) => {
    setExpandedNiat(expandedNiat === index ? null : index);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading Niat Shalat...</div>;
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
        <h1 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">Niat Shalat</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari Niat Shalat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b76f5] focus:border-transparent transition-colors duration-300"
          />
        </div>
      </div>

      {/* Niat Shalat List */}
      <div className="px-4 space-y-3 mt-4">
        {niatShalat && filteredNiatShalat.map((item, index) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm transition-colors duration-300"
          >
            <button
              onClick={() => toggleNiat(index)}
              className="flex justify-between items-center w-full p-4"
            >
              <h3 className="text-base font-normal text-gray-700 dark:text-gray-300">{item.name}</h3>
              <svg
                className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${expandedNiat === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedNiat === index && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                <p className="font-arabic text-2xl text-gray-800 dark:text-gray-200 text-right mb-4" dir="rtl">{item.arabic}</p>
                <p className="text-gray-600 dark:text-gray-300 italic text-sm mt-2 mb-2">{item.latin}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm"><strong>Terjemahan:</strong> {item.translation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NiatShalat;

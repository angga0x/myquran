import React, { useEffect, useState } from 'react';
import { getSurahs } from '../services/quranApi';
import { Surah } from '../types/quran';
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon, ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ReadQuran: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const data = await getSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    const savedFavorites = localStorage.getItem('favoriteSurahs');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    fetchSurahs();
  }, []);

  const toggleFavorite = (surahNumber: number) => {
    const newFavorites = favorites.includes(surahNumber)
      ? favorites.filter(num => num !== surahNumber)
      : [...favorites, surahNumber];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteSurahs', JSON.stringify(newFavorites));
  };

  const filteredSurahs = surahs.filter(surah => 
    surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arti.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">Daftar Surah</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b76f5] focus:border-transparent transition-colors duration-300"
          />
        </div>
      </div>

      {/* Surah List */}
      <div className="px-4 space-y-3">
        {filteredSurahs.map((surah) => (
          
          <div
            key={surah.nomor}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm transition-colors duration-300"
          >
            <Link to={`/surah/${surah.nomor}`} className="block">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold transition-colors duration-300">
                  {surah.nomor}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">{surah.namaLatin}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    {surah.arti} • {surah.jumlahAyat} Ayat
                  </p>
                </div>
              </div>
              
            </div>
            </Link>
            <div className="flex justify-end">
              <div className="flex items-center space-x-4">
                <p className="font-arabic text-2xl text-gray-800 dark:text-gray-200 transition-colors duration-300">{surah.nama}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(surah.nomor);
                  }}
                  className="p-2"
                >
                  {favorites.includes(surah.nomor) ? (
                    <HeartSolidIcon className="w-6 h-6 text-[#1b76f5]" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadQuran;

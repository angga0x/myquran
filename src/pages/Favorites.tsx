import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Surah } from '../types/quran';
import { getSurahs } from '../services/quranApi';
import { ThemeContext } from '../context/ThemeContext';

const FavoritesPage: React.FC = () => {
  const [favoriteSurahs, setFavoriteSurahs] = useState<Surah[]>([]);
  const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);


  useEffect(() => {
    const fetchFavoriteSurahs = async () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteSurahs') || '[]') as number[];
      if (favorites.length > 0) {
        try {
          const allSurahs = await getSurahs();
          const filteredSurahs = allSurahs.filter(surah => favorites.includes(surah.nomor));
          setFavoriteSurahs(filteredSurahs);
        } catch (error) {
          console.error('Error fetching surahs:', error);
        }
      }
    };

    fetchFavoriteSurahs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl font-semibold ml-2 text-gray-800 dark:text-gray-200">Surah Favorit</h1>
      </div>

      <div className="container mx-auto mt-6 px-4">
        <h2 className="text-gray-700 dark:text-gray-300 font-semibold mb-4">Surah favorit kamu:</h2>
        {favoriteSurahs.length > 0 ? (
          <div className="space-y-4">
            {favoriteSurahs.map((surah) => (
              <Link
                to={`/surah/${surah.nomor}`}
                key={surah.nomor}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between transition-colors duration-300"
              >
                <div>
                  <p className="text-gray-600 dark:text-gray-300">{surah.nomor}</p>
                </div>
                <div>
                  <p className="font-arabic text-3xl text-gray-800 dark:text-gray-200">{surah.nama}</p>
                  <p className="text-gray-500 dark:text-gray-400">{surah.namaLatin}</p>
                  <p className="text-gray-500 dark:text-gray-400">({surah.arti}: {surah.jumlahAyat} Ayat)</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 dark:text-gray-400">Belum ada surah yang ditambahkan ke favorit.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

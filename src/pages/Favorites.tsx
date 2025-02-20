import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Surah } from '../types/quran';
import { getSurahs } from '../services/quranApi';

const FavoritesPage: React.FC = () => {
  const [favoriteSurahs, setFavoriteSurahs] = useState<Surah[]>([]);
  const navigate = useNavigate();

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
          <i className="fas fa-arrow-left w-6 h-6 text-gray-600 dark:text-gray-400"></i>
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
                <div className="text-center">
                  <p className="font-arabic text-3xl text-gray-800 dark:text-gray-200">{surah.nama}</p>
                  <p className="text-gray-500 dark:text-gray-400">{surah.namaLatin}</p>
                  <p className="text-gray-500 dark:text-gray-400">({surah.arti}: {surah.jumlahAyat} Ayat)</p>
                </div>
                <i className="fas fa-heart text-red-500"></i>
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

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSurahAyahs } from '../services/quranApi';
import { AyahResponse } from '../types/quran';
import { HeartIcon, ArrowLeftIcon, EllipsisVerticalIcon, PlayIcon, PauseIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from '../context/ThemeContext';
import { getTafsir } from '../services/tafsirApi';

interface Tafsir {
  teks: string;
}

const SurahDetail: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const [surahData, setSurahData] = useState<AyahResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastReadAyah, setLastReadAyah] = useState<number | null>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showTafsir, setShowTafsir] = useState(() => {
    const storedShowTafsir = localStorage.getItem('showTafsir');
    return storedShowTafsir === 'true' ? true : false;
  });
  const [tafsir, setTafsir] = useState<(Tafsir | null)[]>([]);
  const currentAyahRef = useRef<number | null>(null);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSurahData = async () => {
      if (!number) return;
      try {
        const data = await getSurahAyahs(parseInt(number));
        setSurahData(data);
        const favorites = JSON.parse(localStorage.getItem('favoriteSurahs') || '[]');
        setIsFavorite(favorites.includes(parseInt(number)));
        const lastRead = localStorage.getItem('lastRead');
        if (lastRead) {
          const lastReadParsed = JSON.parse(lastRead);
          if (lastReadParsed.surahNumber === parseInt(number)) {
            setLastReadAyah(lastReadParsed.ayahNumber);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahData();
  }, [number]);

  useEffect(() => {
    const fetchTafsirData = async () => {
      if (!number || !showTafsir || !surahData) return;
      try {
        const tafsirData = await getTafsir(parseInt(number));
        setTafsir(tafsirData);
      } catch (error) {
        console.error('Error fetching tafsir:', error);
        setTafsir(surahData?.ayat.map(() => null) || []);
      }
    };

    fetchTafsirData();
  }, [number, showTafsir, surahData]);

  const toggleFavorite = () => {
    if (!surahData) return;
    const favorites = JSON.parse(localStorage.getItem('favoriteSurahs') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((num: number) => num !== surahData.nomor)
      : [...favorites, surahData.nomor];
    
    localStorage.setItem('favoriteSurahs', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const saveLastRead = (ayahNumber: number) => {
    if (!surahData) return;
    const lastRead = {
      surahNumber: surahData.nomor,
      ayahNumber,
      timestamp: Date.now(),
      surahName: surahData.nama,
      surahNameLatin: surahData.namaLatin
    };
    localStorage.setItem('lastRead', JSON.stringify(lastRead));
    setLastReadAyah(ayahNumber);
  };

  const handlePlayPause = (ayah: { nomorAyat: number, audio: { '01': string; }; }) => {
    if (audio) {
      audio.pause();
    }

    if (currentAyahRef.current === ayah.nomorAyat) {
      // If the same ayah is clicked, toggle play/pause
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        audio.play();
      }
      return;
    }

    // If a different ayah is clicked, stop the previous audio and play the new one
    const newAudio = new Audio(ayah.audio['01']);
    setAudio(newAudio);
    currentAyahRef.current = ayah.nomorAyat;
    setIsPlaying(true);
    newAudio.play();

    newAudio.addEventListener('ended', () => {
      setIsPlaying(false);
      currentAyahRef.current = null;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleTafsir = () => {
    setShowTafsir(!showTafsir);
    localStorage.setItem('showTafsir', String(!showTafsir));
  };

  const handleBackNavigation = () => {
    if (audio && isPlaying) {
      audio.pause();
      setAudio(null);
      setIsPlaying(false);
      currentAyahRef.current = null;
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <button onClick={handleBackNavigation} className="p-2">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-semibold ml-2">{surahData?.namaLatin}</h1>
        </div>
        <div className="flex items-center space-x-2 relative">
          <button onClick={toggleFavorite} className="p-2">
            {isFavorite ? (
              <HeartSolidIcon className="w-6 h-6 text-[#1b76f5]" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-400 dark:text-gray-600" />
            )}
          </button>
          <button onClick={toggleMenu} className="p-2">
            <EllipsisVerticalIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-10 right-0 bg-white dark:bg-gray-700 shadow-md rounded-md p-2 w-48">
              <button
                onClick={toggleTheme}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                {theme === 'light' ? 'Aktifkan Mode Gelap' : 'Aktifkan Mode Terang'}
              </button>
              <button
                onClick={handleToggleTafsir}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                {showTafsir ? 'Sembunyikan Tafsir' : 'Tampilkan Tafsir'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pt-14">
        {/* Surah Header */}
        <div className="bg-gradient-to-r from-[#1b76f5] to-[#42a5f5] text-white py-8 px-4 text-center rounded-2xl mx-4 mt-4">
          <h2 className="text-4xl font-arabic mb-2">{surahData?.nama}</h2>
          <p className="text-lg mb-1">{surahData?.namaLatin}</p>
          <p className="text-sm opacity-90">
            ({surahData?.arti}: {surahData?.jumlahAyat} Ayat)
          </p>
        </div>

        {/* Ayahs */}
        <div className="px-4 py-6 space-y-8">
          {surahData?.ayat.map((ayah, index) => (
            <div key={ayah.nomorAyat} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm transition-colors duration-300">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-2 mb-4">
                <span className="text-gray-600 dark:text-gray-300 font-medium">{ayah.nomorAyat}</span>
                <div className="flex space-x-2">
                  <button 
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                    onClick={() => handlePlayPause(ayah)}
                  >
                    {currentAyahRef.current === ayah.nomorAyat && isPlaying ? (
                      <PauseIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <PlayIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                    onClick={() => saveLastRead(ayah.nomorAyat)}
                  >
                    {lastReadAyah === ayah.nomorAyat ? (
                      <BookmarkSolidIcon className="w-5 h-5 text-[#1b76f5]" />
                    ) : (
                      <BookmarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-right font-arabic text-3xl leading-[2.5] mb-6" dir="rtl">
                {ayah.teksArab}
              </p>
              <div className="space-y-2">
                {showTranslation && (
                  <p className="text-gray-600 dark:text-gray-300 font-italic">
                    {ayah.teksIndonesia}
                  </p>
                )}
                {showTafsir && tafsir[index] && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Tafsir:</h4>
                    <p className="text-gray-600 dark:text-gray-300">{tafsir[index]?.teks}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation between surahs */}
        {surahData && (
          <div className="fixed bottom-16 left-0 right-0 flex justify-around items-center px-4 py-3 transition-colors duration-300">
            {surahData.suratSebelumnya && (
              <Link
                to={`/surah/${surahData.suratSebelumnya.nomor}`}
                className="bg-[#1b76f5] hover:bg-[#42a5f5] text-white rounded-full px-4 py-2 flex items-center"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                <span>{surahData.suratSebelumnya.namaLatin}</span>
              </Link>
            )}
            {surahData.suratSelanjutnya && (
              <Link
                to={`/surah/${surahData.suratSelanjutnya.nomor}`}
                className="bg-[#1b76f5] hover:bg-[#42a5f5] text-white rounded-full px-4 py-2 flex items-center"
              >
                <span>{surahData.suratSelanjutnya.namaLatin}</span>
                <ArrowLeftIcon className="w-5 h-5 ml-2 transform rotate-180" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahDetail;

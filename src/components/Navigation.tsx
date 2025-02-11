import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, HeartIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolidIcon, BookOpenIcon as BookOpenSolidIcon, HeartIcon as HeartSolidIcon, Cog6ToothIcon as Cog6ToothSolidIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from '../context/ThemeContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-around py-3">
        <Link to="/" className={`flex flex-col items-center transition-colors duration-300 ${isActive('/') ? 'text-[#1b76f5]' : 'text-gray-600 dark:text-gray-400'}`}>
          {isActive('/') ? <HomeSolidIcon className="w-6 h-6" /> : <HomeIcon className="w-6 h-6" />}
          <span className="text-xs">Beranda</span>
        </Link>
        <Link to="/last-read" className={`flex flex-col items-center transition-colors duration-300 ${isActive('/last-read') ? 'text-[#1b76f5]' : 'text-gray-600 dark:text-gray-400'}`}>
          {isActive('/last-read') ? <BookOpenSolidIcon className="w-6 h-6" /> : <BookOpenIcon className="w-6 h-6" />}
          <span className="text-xs">Terakhir Baca</span>
        </Link>
        <Link to="/favorites" className={`flex flex-col items-center transition-colors duration-300 ${isActive('/favorites') ? 'text-[#1b76f5]' : 'text-gray-600 dark:text-gray-400'}`}>
          {isActive('/favorites') ? <HeartSolidIcon className="w-6 h-6" /> : <HeartIcon className="w-6 h-6" />}
          <span className="text-xs">Favorit</span>
        </Link>
        <Link to="/settings" className={`flex flex-col items-center transition-colors duration-300 ${isActive('/settings') ? 'text-[#1b76f5]' : 'text-gray-600 dark:text-gray-400'}`}>
          {isActive('/settings') ? <Cog6ToothSolidIcon className="w-6 h-6" /> : <Cog6ToothIcon className="w-6 h-6" />}
          <span className="text-xs">Setelan</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;

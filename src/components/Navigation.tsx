import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, HeartIcon, Cog6ToothIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolidIcon, BookOpenIcon as BookOpenSolidIcon, HeartIcon as HeartSolidIcon, Cog6ToothIcon as Cog6ToothSolidIcon } from '@heroicons/react/24/solid';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-around py-3 items-center">
        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Menu Items */}
        <div className={`sm:flex sm:space-x-6 items-center ${isMobileMenuOpen ? 'flex flex-col absolute bottom-16 left-0 right-0 bg-white dark:bg-gray-800 py-4' : 'hidden'}`}>
          <Link to="/" className={`flex flex-col items-center transition-colors duration-300 ${isActive('/') ? 'text-[#1b76f5]' : 'text-gray-600 dark:text-gray-400'} px-3`}>
            {isActive('/') ? <HomeSolidIcon className="w-6 h-6" /> : <HomeIcon className="w-6 h-6" />}
            <span className="text-xs">Beranda</span>
          </Link>
          <Link to="/last-read" className={`flex flex-col items-center transition-colors duration-300 ${isActive('/last-read') ? 'text-[#1b76f5]' : 'text-gray-600 dark:text-gray-400'} px-3`}>
            {isActive('/last-read') ? <BookOpenSolidIcon className="w-6 h-6" /> : <BookOpenIcon className="w-6 h-6" />}
            <span className="text-xs">Terakhir Baca</span>
          </Link>
          <Link to="/favorites" className={`flex flex-col items-center transition-colors duration-300 ${isActive('/favorites') ? 'text-[#1b76f5]' : 'text-gray-600 dark:text-gray-400'} px-3`}>
            {isActive('/favorites') ? <HeartSolidIcon className="w-6 h-6" /> : <HeartIcon className="w-6 h-6" />}
            <span className="text-xs">Favorit</span>
          </Link>
          <Link to="/settings" className={`flex flex-col items-center transition-colors duration-300 ${isActive('/settings') ? 'text-[#1b76f5]' : 'text-gray-600 dark:text-gray-400'} px-3`}>
            {isActive('/settings') ? <Cog6ToothSolidIcon className="w-6 h-6" /> : <Cog6ToothIcon className="w-6 h-6" />}
            <span className="text-xs">Setelan</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

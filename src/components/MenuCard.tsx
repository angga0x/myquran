import React from 'react';
import { Link } from 'react-router-dom';

interface MenuCardProps {
  title: string;
  icon: string;
  to: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ title, icon, to }) => {
  return (
    <Link to={to} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center">
      <img src={icon} alt={title} className="w-16 h-16 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">{title}</h3>
    </Link>
  );
};

export default MenuCard;

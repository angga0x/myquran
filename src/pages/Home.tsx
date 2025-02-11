import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  title: string;
  icon: string;
  to: string;
}

const Home: React.FC = () => {
  const menuItems: MenuItem[] = [
    { title: 'Baca Quran', icon: '/quran.png', to: '/read-quran' },
    { title: 'Juz Amma', icon: '/soon.png', to: '/juz-amma' },
    { title: 'Asmaul Husna', icon: '/asmaul.png', to: '/asmaul-husna' },
    { title: "Do'a Harian", icon: '/pray.png', to: '/daily-dua' },
    { title: 'Wirid', icon: '/soon.png', to: '/wirid' },
    { title: "Do'a Tahlil", icon: '/soon.png', to: '/tahlil' },
    { title: 'Niat Shalat', icon: '/sujud.png', to: '/niat-shalat' },
    { title: 'Bacaan Sholat', icon: '/soon.png', to: '/prayer-readings' },
    { title: 'Sunnah Rasulullah', icon: '/soon.png', to: '/sunnah' }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 pb-32">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        MyQuran-Online
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 aspect-square"
          >
            <img src={item.icon} alt={item.title} className="w-12 h-12 mb-3" />
            <h3 className="text-md font-semibold text-center text-gray-700 dark:text-gray-300">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

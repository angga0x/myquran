
import { Link } from 'react-router-dom';

interface MenuItem {
  title: string;
  icon: string;
  to: string;
}

const Home: React.FC = () => {
  const menuItems: MenuItem[] = [
    { title: 'Baca Quran', icon: 'fas fa-quran', to: '/read-quran' },
    { title: 'Juz Amma', icon: 'fas fa-list', to: '/juz-amma' },
    { title: 'Asmaul Husna', icon: 'fas fa-mosque', to: '/asmaul-husna' },
    { title: "Do'a Harian", icon: 'fas fa-praying-hands', to: '/daily-dua' },
    { title: 'Wirid', icon: 'fas fa-running', to: '/wirid' },
    { title: "Do'a Tahlil", icon: 'fas fa-tachometer-alt', to: '/tahlil' },
    { title: 'Niat Shalat', icon: 'fas fa-hands-helping', to: '/niat-shalat' },
    { title: 'Bacaan Sholat', icon: 'fas fa-book-reader', to: '/prayer-readings' },
    { title: 'Sunnah Rasulullah', icon: 'fas fa-sun', to: '/sunnah' }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 pb-32">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        MyQuran-Online
      </h1>
      <img src="/quran.png" alt="Quran" className="w-32 h-32 mx-auto mb-8" />

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 aspect-square"
          >
            <div className="text-blue-500 dark:text-blue-300" style={{ fontSize: '48px' }}>
              <i className={item.icon}></i>
            </div>
            <h3 className="text-md font-semibold text-center text-gray-700 dark:text-gray-300">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

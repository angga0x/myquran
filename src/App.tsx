import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ReadQuran from './pages/ReadQuran';
import SurahDetail from './pages/SurahDetail';
import LastReadPage from './pages/LastRead';
import FavoritesPage from './pages/Favorites';
import SettingsPage from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import AsmaulHusna from './pages/AsmaulHusna';
import DailyDua from './pages/DailyDua';
import NiatShalat from './pages/NiatShalat';
import JuzAmma from './pages/JuzAmma';
import Wirid from './pages/Wirid';
import Tahlil from './pages/Tahlil';
import ProphetStories from './pages/ProphetStories';
import PrayerReadings from './pages/PrayerReadings';
import Sunnah from './pages/Sunnah';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavigation = location.pathname.startsWith('/surah/');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read-quran" element={<ReadQuran />} />
        <Route path="/surah/:number" element={<SurahDetail />} />
        <Route path="/last-read" element={<LastReadPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/asmaul-husna" element={<AsmaulHusna />} />
        <Route path="/daily-dua" element={<DailyDua />} />
        <Route path="/niat-shalat" element={<NiatShalat />} />
        <Route path="/juz-amma" element={<JuzAmma />} />
        <Route path="/wirid" element={<Wirid />} />
        <Route path="/tahlil" element={<Tahlil />} />
        <Route path="/prophet-stories" element={<ProphetStories />} />
        <Route path="/prayer-readings" element={<PrayerReadings />} />
        <Route path="/sunnah" element={<Sunnah />} />
        {/* Add more routes as needed */}
      </Routes>
      {!hideNavigation && <Navigation />}
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { AppProvider } from './context/AppContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 transition-colors duration-500 dark:bg-slate-950">
        <Navbar />
        <main className="flex-1 px-4 pb-16 pt-24 sm:px-8 lg:px-16">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </AppProvider>
);

export default App;


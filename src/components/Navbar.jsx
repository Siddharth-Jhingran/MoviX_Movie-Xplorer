import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu,
  FiSearch,
  FiSun,
  FiMoon,
  FiHeart,
  FiLogIn,
  FiUserPlus,
  FiX,
} from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const navVariants = {
  hidden: { y: -32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    darkMode,
    setDarkMode,
    searchTerm,
    setSearchTerm,
    user,
    logout,
  } = useAppContext();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (location.pathname !== '/search') {
      navigate('/search');
    }
    setMenuOpen(false);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    if (location.pathname !== '/search') {
      navigate('/search');
    }
    setSearchTerm(value);
  };

  const handleToggleTheme = () => setDarkMode((prev) => !prev);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-3 text-left"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/80 text-lg font-bold text-white shadow-lg shadow-indigo-500/40">
            MX
          </span>
          <div>
            <p className="text-lg font-semibold text-white">MoviX</p>
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-300">Movie Explorer</p>
          </div>
        </button>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 shadow-lg shadow-slate-950/40 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/40 md:flex md:w-1/2"
        >
          <FiSearch className="text-lg text-slate-400" />
          <input
            type="search"
            placeholder="Search for movies, shows, or people..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border-none bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="hidden rounded-full bg-indigo-500/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-500 md:block"
          >
            Search
          </button>
        </form>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={handleToggleTheme}
            className="h-11 w-11 rounded-full border border-slate-700/80 bg-slate-900/90 text-slate-200 transition hover:border-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {darkMode ? <FiSun className="mx-auto text-lg" /> : <FiMoon className="mx-auto text-lg" />}
          </button>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-full border border-slate-700/80 px-4 py-2 text-sm font-medium transition hover:border-indigo-500 hover:text-white ${
                isActive ? 'bg-indigo-500/20 text-indigo-200' : 'text-slate-200'
              }`
            }
          >
            <FiHeart />
            Favorites
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-slate-200 lg:block">Hi, {user?.name ?? 'Explorer'}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-slate-700/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-rose-500 hover:text-rose-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full border border-slate-700/80 px-4 py-2 text-sm font-semibold transition hover:border-indigo-500 hover:text-white ${
                    isActive ? 'bg-indigo-500/20 text-indigo-200' : 'text-slate-200'
                  }`
                }
              >
                <FiLogIn />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full border border-indigo-500/70 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-100 shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500/30 hover:text-white ${
                    isActive ? 'bg-indigo-500/40 text-white' : ''
                  }`
                }
              >
                <FiUserPlus />
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/80 text-white shadow-md shadow-slate-950/30 transition hover:border-indigo-500 hover:text-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={menuOpen ? 'open' : 'closed'}
        variants={{
          open: { height: 'auto', opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        className="overflow-hidden border-t border-slate-800/70 bg-slate-950/95 md:hidden"
      >
        <div className="space-y-6 px-4 pb-8 pt-6">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 shadow-inner shadow-slate-950/30"
          >
            <FiSearch className="text-lg text-slate-400" />
            <input
              type="search"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full border-none bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </form>

          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-200">
            <button
              type="button"
              onClick={() => handleNavigate('/')}
              className="rounded-2xl border border-transparent bg-slate-900/60 px-4 py-3 text-left transition hover:border-indigo-500 hover:text-white"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/favorites')}
              className="rounded-2xl border border-transparent bg-slate-900/60 px-4 py-3 text-left transition hover:border-indigo-500 hover:text-white"
            >
              Favorites
            </button>
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="rounded-2xl border border-transparent bg-slate-900/60 px-4 py-3 text-left transition hover:border-rose-500 hover:text-rose-200"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleNavigate('/login')}
                  className="rounded-2xl border border-transparent bg-slate-900/60 px-4 py-3 text-left transition hover:border-indigo-500 hover:text-white"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('/register')}
                  className="rounded-2xl border border-transparent bg-slate-900/60 px-4 py-3 text-left transition hover:border-indigo-500 hover:text-white"
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>

          <button
            type="button"
            onClick={handleToggleTheme}
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-500 hover:text-white"
          >
            {darkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            Toggle Theme
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;


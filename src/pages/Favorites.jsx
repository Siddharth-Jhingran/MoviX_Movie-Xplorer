import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiFilm } from 'react-icons/fi';
import MovieGrid from '../components/MovieGrid';
import { useAppContext } from '../context/AppContext';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useAppContext();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-12 pb-12"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Your Favorites</h1>
        <p className="max-w-2xl text-base text-slate-300">
          A curated list of the movies you love. These picks are synced locally so you can revisit them anytime.
        </p>
      </div>

      {favorites.length ? (
        <MovieGrid
          movies={favorites}
          onSelect={(movie) => {
            navigate(`/movie/${movie.id ?? movie._id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 rounded-[32px] border border-slate-800/80 bg-slate-950/60 px-10 py-20 text-center text-slate-300 shadow-xl shadow-slate-950/50"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200"
          >
            <FiFilm className="text-3xl" />
          </motion.div>
          <h2 className="text-xl font-semibold text-white">No favorites yet</h2>
          <p className="max-w-md text-sm text-slate-400">
            Tap the heart icon on a movie to save it to this personal reel. Your selections will appear here instantly.
          </p>
          <motion.button
            type="button"
            onClick={() => navigate('/')}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-indigo-500/70 bg-indigo-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100 transition hover:bg-indigo-500/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Explore Movies
          </motion.button>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Favorites;


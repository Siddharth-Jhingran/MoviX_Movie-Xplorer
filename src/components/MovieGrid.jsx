import { AnimatePresence, motion } from 'framer-motion';
import MovieCard from './MovieCard';

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const MovieGrid = ({ movies = [], onSelect, onToggleFavorite, isFavorite }) => {
  if (!movies.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-slate-800/80 bg-slate-900/60 px-6 py-20 text-center text-slate-300 shadow-lg shadow-slate-950/50"
      >
        Nothing to show yet. Try exploring more movies!
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={movies.map((movie) => movie.id ?? movie._id).join('-')}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        variants={gridVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id ?? movie._id}
            movie={movie}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite?.(movie.id ?? movie._id)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieGrid;


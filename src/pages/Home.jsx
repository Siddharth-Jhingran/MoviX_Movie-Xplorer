import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPlay } from 'react-icons/fi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import MovieGrid from '../components/MovieGrid';
import { useAppContext } from '../context/AppContext';

const heroVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const marqueeVariants = {
  animate: {
    x: ['0%', '-50%'],
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      duration: 30,
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const { trendingMovies, loading, errors, toggleFavorite, isFavorite } = useAppContext();

  const heroMovie = useMemo(() => trendingMovies?.[0], [trendingMovies]);
  const remainingMovies = useMemo(() => trendingMovies.slice(1), [trendingMovies]);

  const handleViewDetails = (movie) => {
    navigate(`/movie/${movie.id ?? movie._id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16 pb-10 pt-6"
    >
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-950/80 shadow-2xl shadow-slate-950"
      >
        <div className="absolute inset-0 -z-10 opacity-80">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: heroMovie
                ? `linear-gradient(120deg, rgba(11,15,25,0.95) 0%, rgba(11,15,25,0.6) 40%, rgba(11,15,25,0.85) 100%), url(${heroMovie?.backdrop_path ?? heroMovie?.poster_path ?? heroMovie?.image})`
                : 'linear-gradient(120deg, #0f172a, #1e1b4b)',
            }}
          />
        </div>

        <div className="relative grid gap-12 px-6 py-16 md:grid-cols-[minmax(0,1fr),minmax(0,400px)] md:px-12 md:py-20">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-indigo-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.5em] text-indigo-200">
              Trending
            </p>
            <h1 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              {heroMovie?.title ?? heroMovie?.name ?? 'Discover Your Next Favorite Movie'}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-200">
              {heroMovie?.overview ??
                'Dive into a curated collection of trending stories from Hollywood and beyond. Browse, search, and save your must-watch films with MoviX.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                type="button"
                disabled={!heroMovie}
                onClick={() => heroMovie && handleViewDetails(heroMovie)}
                whileTap={{ scale: heroMovie ? 0.95 : 1 }}
                className="inline-flex items-center gap-3 rounded-full border border-indigo-500/80 bg-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-xl shadow-indigo-500/40 transition hover:bg-indigo-500/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800"
              >
                <FiPlay className="text-lg" />
                Watch Details
              </motion.button>
              <motion.button
                type="button"
                onClick={() => navigate('/search')}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 rounded-full border border-slate-200/10 bg-slate-900/60 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-100 transition hover:border-indigo-500/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
              >
                Explore Library
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/60"
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Now Streaming</p>
              <div className="relative h-72 overflow-hidden rounded-3xl border border-slate-800/80">
                <motion.img
                  src={
                    heroMovie?.poster_path ??
                    heroMovie?.image ??
                    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80'
                  }
                  alt={heroMovie?.title ?? 'Hero poster'}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">IMDb Rating</p>
                <p className="text-4xl font-black text-white">
                  {heroMovie?.vote_average ? Number(heroMovie.vote_average).toFixed(1) : 'NR'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative border-t border-slate-800/80 bg-slate-950/60 py-6">
          <motion.div
            variants={marqueeVariants}
            animate="animate"
            className="flex min-w-full gap-10 whitespace-nowrap text-sm uppercase tracking-[0.6em] text-slate-600"
          >
            {['Cinema', 'Drama', 'Sci-Fi', 'Adventure', 'Thriller', 'Romance', 'Animations', 'Blockbusters'].map(
              (label) => (
                <span key={label}>{label}</span>
              ),
            )}
          </motion.div>
        </div>
      </motion.div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Trending Now</h2>
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="text-sm font-medium text-indigo-300 transition hover:text-white"
          >
            View All
          </button>
        </div>

        {loading.trending ? (
          <Loader items={10} />
        ) : errors.trending ? (
          <ErrorMessage message={errors.trending} />
        ) : (
          <>
            <motion.div
              className="no-scrollbar flex gap-6 overflow-x-auto pb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {trendingMovies.slice(0, 10).map((movie) => (
                <motion.button
                  key={movie.id ?? movie._id}
                  type="button"
                  onClick={() => handleViewDetails(movie)}
                  whileHover={{ y: -6 }}
                  className="min-w-[220px] overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/70 text-left shadow-lg shadow-slate-950/40 transition hover:border-indigo-500/60"
                >
                  <img
                    src={
                      movie?.poster_path ??
                      movie?.image ??
                      'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={movie?.title ?? movie?.name}
                    className="h-64 w-full object-cover"
                  />
                  <div className="space-y-2 px-4 py-3">
                    <p className="text-sm font-semibold text-white">{movie?.title ?? movie?.name}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {movie?.release_date ? new Date(movie.release_date).getFullYear() : 'Coming Soon'}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {remainingMovies.length ? (
              <MovieGrid
                movies={remainingMovies}
                onSelect={handleViewDetails}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            ) : null}
          </>
        )}
      </div>
    </motion.section>
  );
};

export default Home;


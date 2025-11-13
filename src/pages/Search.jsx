import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import MovieGrid from '../components/MovieGrid';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { useAppContext } from '../context/AppContext';

const Search = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, searchMovies, searchResults, loading, errors, toggleFavorite, isFavorite } =
    useAppContext();
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebouncedValue(searchTerm, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    searchMovies(debouncedQuery, page);
  }, [debouncedQuery, page, searchMovies]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-12 pb-10"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Search Movies</h1>
        <p className="max-w-2xl text-base text-slate-300">
          Type to discover trending titles, hidden gems, and everything in between. Results update automatically with a
          subtle delay to keep things smooth.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40 sm:flex-row sm:items-center"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="flex-1 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Search Query
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for a movie title..."
            className="mt-2 w-full rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-base font-medium text-slate-100 shadow-inner shadow-slate-950/40 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </label>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 shadow-inner shadow-slate-950/40">
          Showing {searchResults.length} result{searchResults.length === 1 ? '' : 's'}
        </div>
      </motion.form>

      {loading.search ? (
        <Loader items={10} />
      ) : errors.search ? (
        <ErrorMessage message={errors.search} />
      ) : (
        <>
          <MovieGrid
            movies={searchResults}
            onSelect={(movie) => {
              navigate(`/movie/${movie.id ?? movie._id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
          {searchResults.length >= 20 ? (
            <div className="flex justify-center">
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handleLoadMore}
                className="rounded-full border border-indigo-500/70 bg-indigo-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100 shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Load More
              </motion.button>
            </div>
          ) : null}
        </>
      )}
    </motion.section>
  );
};

export default Search;


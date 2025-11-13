import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiClock, FiStar, FiTag } from 'react-icons/fi';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const MovieDetail = ({ movie, onToggleFavorite, isFavorite, onPlayTrailer }) => {
  if (!movie) return null;

  const backdropUrl =
    movie?.backdrop_path ??
    movie?.backdrop ??
    movie?.poster_path ??
    'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80';

  const posterUrl =
    movie?.poster_path ??
    movie?.poster ??
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';

  const title = movie?.title ?? movie?.name ?? 'Untitled';
  const rating = movie?.vote_average ?? movie?.rating;
  const runtime = movie?.runtime ? `${movie.runtime} min` : null;
  const genres = movie?.genres ?? [];
  const overview = movie?.overview ?? 'No overview available yet.';
  const tagline = movie?.tagline;

  const movieId = movie?.id ?? movie?._id;

  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 shadow-2xl shadow-slate-950">
      <motion.div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.95) 70%), url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
      />

      <div className="relative grid gap-10 px-6 py-10 md:grid-cols-[minmax(0,320px),1fr] md:px-10 md:py-14">
        <motion.div
          className="overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 shadow-2xl shadow-slate-950/60"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <img src={posterUrl} alt={`${title} poster`} className="w-full object-cover" />
        </motion.div>

        <motion.div variants={contentVariants} initial="hidden" animate="visible" className="space-y-6">
          {tagline ? <p className="text-sm uppercase tracking-[0.4em] text-indigo-300">{tagline}</p> : null}
          <h1 className="text-4xl font-bold text-white md:text-5xl">{title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-4 py-2 font-semibold text-amber-200">
              <FiStar />
              {rating ? Number(rating).toFixed(1) : 'NR'}
            </span>
            {runtime ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2">
                <FiClock />
                {runtime}
              </span>
            ) : null}
            {movie?.release_date ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2">
                {new Date(movie.release_date).toLocaleDateString()}
              </span>
            ) : null}
          </div>

          {genres?.length ? (
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-200">
              <FiTag className="text-slate-400" />
              {genres.map((genre) => (
                <span
                  key={genre?.id ?? genre}
                  className="rounded-full border border-slate-800/80 bg-slate-900/70 px-3 py-1 text-xs uppercase tracking-wide text-slate-300"
                >
                  {genre?.name ?? genre}
                </span>
              ))}
            </div>
          ) : null}

          <p className="max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">{overview}</p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              type="button"
              onClick={() => onToggleFavorite?.(movie)}
              whileTap={{ scale: 0.94 }}
              className="inline-flex items-center gap-3 rounded-full border border-rose-500/60 bg-rose-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-rose-100 shadow-lg shadow-rose-500/20 transition hover:bg-rose-500/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
            >
              {isFavorite?.(movieId) ? <FaHeart /> : <FaRegHeart />}
              {isFavorite?.(movieId) ? 'Remove from Favorites' : 'Add to Favorites'}
            </motion.button>
            <motion.button
              type="button"
              onClick={onPlayTrailer}
              whileTap={{ scale: 0.94 }}
              className="inline-flex items-center gap-3 rounded-full border border-indigo-500/70 bg-indigo-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-indigo-100 shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200"
            >
              Watch Trailer
            </motion.button>
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default MovieDetail;


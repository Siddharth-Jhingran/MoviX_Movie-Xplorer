import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const MovieCard = ({ movie, onSelect, onToggleFavorite, isFavorite }) => {
  const posterUrl =
    movie?.poster_path ??
    movie?.poster ??
    movie?.image ??
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=600&q=80';

  const title = movie?.title ?? movie?.name ?? 'Untitled';
  const rating = movie?.vote_average ?? movie?.rating;
  const releaseDate = movie?.release_date ?? movie?.first_air_date;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 shadow-xl shadow-slate-950/40 ring-slate-500/30 transition"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={posterUrl}
          alt={title}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
          whileHover={{ scale: 1.05 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 transition duration-300 group-hover:opacity-60" />
        <motion.button
          type="button"
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-pink-400 shadow-lg shadow-pink-500/20 transition hover:bg-slate-900 hover:text-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
          onClick={() => onToggleFavorite?.(movie)}
          whileTap={{ scale: 0.9 }}
        >
          {isFavorite ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <header className="space-y-2">
          <h3 className="line-clamp-2 text-lg font-semibold text-white drop-shadow-sm">{title}</h3>
          <p className="text-sm text-slate-400">
            {releaseDate ? new Date(releaseDate).getFullYear() : 'Release date TBA'}
          </p>
        </header>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 text-sm font-medium text-amber-300 shadow-inner shadow-amber-500/10">
            <FiStar className="text-base" />
            <span>{rating ? rating.toFixed(1) : 'NR'}</span>
          </div>
          <motion.button
            type="button"
            className="rounded-full bg-indigo-500/80 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            onClick={() => onSelect?.(movie)}
            whileTap={{ scale: 0.94 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default MovieCard;


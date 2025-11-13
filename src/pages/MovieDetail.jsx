import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';
import MovieDetailHero from '../components/MovieDetail';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { useAppContext } from '../context/AppContext';

const MovieDetail = () => {
  const { id } = useParams();

  const {
    fetchMovieDetails,
    fetchComments,
    addComment,
    deleteComment,
    toggleFavorite,
    isFavorite,
    selectedMovie,
    comments,
    loading,
    errors,
    user,
  } = useAppContext();

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  useEffect(() => {
    fetchMovieDetails(id);
    fetchComments(id);
  }, [fetchComments, fetchMovieDetails, id]);

  const trailerUrl = useMemo(() => {
    if (!selectedMovie) return null;
    return (
      selectedMovie?.trailer_url ??
      selectedMovie?.trailerUrl ??
      selectedMovie?.trailer ??
      selectedMovie?.videos?.results?.find((video) => video.type === 'Trailer')?.key
    );
  }, [selectedMovie]);

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!commentValue.trim()) return;
    try {
      await addComment({ movieId: id, text: commentValue });
      setCommentValue('');
    } catch (_error) {
      // handled via context error state
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
    } catch (_error) {
      // handled via context error state
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-12 pb-16"
    >
      {loading.detail ? (
        <Loader items={6} />
      ) : errors.detail ? (
        <ErrorMessage message={errors.detail} onRetry={() => fetchMovieDetails(id)} />
      ) : (
        <MovieDetailHero
          movie={selectedMovie}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          onPlayTrailer={() => setIsTrailerOpen(true)}
        />
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 shadow-lg shadow-slate-950/40"
        >
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Comments</h2>
              <p className="text-sm text-slate-400">
                Share your thoughts about {selectedMovie?.title ?? selectedMovie?.name ?? 'this movie'}.
              </p>
            </div>
            <span className="rounded-full bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </span>
          </header>

          <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
              value={commentValue}
              onChange={(event) => setCommentValue(event.target.value)}
              placeholder={user ? 'Leave a thoughtful review...' : 'Login to add a comment.'}
              disabled={!user}
              className="min-h-[120px] w-full resize-y rounded-3xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-70"
            />
            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={!user || !commentValue.trim()}
                whileTap={{ scale: user ? 0.95 : 1 }}
                className="rounded-full bg-indigo-500/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                Post Comment
              </motion.button>
            </div>
          </form>

          {loading.comments ? (
            <div className="text-sm text-slate-400">Loading comments...</div>
          ) : errors.comments ? (
            <ErrorMessage message={errors.comments} onRetry={() => fetchComments(id)} />
          ) : comments.length ? (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <motion.li
                  key={comment.id ?? comment._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{comment?.author ?? 'Anonymous Fan'}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                        {comment?.created_at
                          ? new Date(comment.created_at).toLocaleString()
                          : new Date().toLocaleString()}
                      </p>
                    </div>
                    {user ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment.id ?? comment._id)}
                        className="rounded-full p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                      >
                        <FiTrash2 />
                      </button>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">{comment?.text ?? comment?.content}</p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-10 text-center text-slate-400"
            >
              No comments yet. Be the first to share your impressions!
            </motion.div>
          )}
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 text-sm text-slate-300 shadow-lg shadow-slate-950/40"
        >
          <h3 className="text-lg font-semibold text-white">Movie Facts</h3>
          <ul className="space-y-3 text-slate-400">
            {selectedMovie?.status ? (
              <li>
                <span className="font-semibold text-slate-200">Status:</span> {selectedMovie.status}
              </li>
            ) : null}
            {selectedMovie?.budget ? (
              <li>
                <span className="font-semibold text-slate-200">Budget:</span> $
                {Number(selectedMovie.budget).toLocaleString()}
              </li>
            ) : null}
            {selectedMovie?.revenue ? (
              <li>
                <span className="font-semibold text-slate-200">Revenue:</span> $
                {Number(selectedMovie.revenue).toLocaleString()}
              </li>
            ) : null}
            {selectedMovie?.production_companies?.length ? (
              <li>
                <span className="font-semibold text-slate-200">Studios:</span>{' '}
                {selectedMovie.production_companies.map((company) => company.name).join(', ')}
              </li>
            ) : null}
          </ul>
        </motion.aside>
      </div>

      <Modal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} title="Official Trailer">
        {trailerUrl ? (
          <div className="aspect-video w-full overflow-hidden rounded-2xl">
            {trailerUrl.startsWith('http') ? (
              <iframe
                src={trailerUrl}
                className="h-full w-full"
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${trailerUrl}`}
                className="h-full w-full"
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-300">Trailer not available. Check back soon!</p>
        )}
      </Modal>
    </motion.section>
  );
};

export default MovieDetail;


import { motion } from 'framer-motion';

const skeletonContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skeletonItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Loader = ({ items = 12 }) => (
  <motion.div
    variants={skeletonContainer}
    initial="hidden"
    animate="show"
    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
  >
    {Array.from({ length: items }).map((_, index) => (
      <motion.div
        key={index}
        variants={skeletonItem}
        className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-950/40"
      >
        <div className="animate-pulse space-y-4 p-4">
          <div className="h-48 w-full rounded-xl bg-slate-800 sm:h-60" />
          <div className="h-4 w-3/4 rounded bg-slate-800" />
          <div className="h-4 w-1/2 rounded bg-slate-800" />
          <div className="h-10 rounded-lg bg-slate-800" />
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default Loader;


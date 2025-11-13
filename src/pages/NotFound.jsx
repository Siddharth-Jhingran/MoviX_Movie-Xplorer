import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCompass } from 'react-icons/fi';

const NotFound = () => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex min-h-[60vh] flex-col items-center justify-center gap-8 rounded-[32px] border border-slate-800/80 bg-slate-950/80 px-10 py-16 text-center text-slate-200 shadow-2xl shadow-slate-950"
  >
    <motion.div
      animate={{ rotate: [0, 6, -6, 0] }}
      transition={{ repeat: Infinity, duration: 8 }}
      className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-indigo-500/50 bg-indigo-500/20 text-indigo-200"
    >
      <FiCompass className="text-4xl" />
    </motion.div>
    <div className="space-y-2">
      <h1 className="text-4xl font-bold text-white">404 — Lost in Space</h1>
      <p className="text-sm text-slate-400">The movie you’re looking for has slipped into another dimension.</p>
    </div>
    <Link
      to="/"
      className="rounded-full border border-indigo-500/70 bg-indigo-500/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-100 transition hover:bg-indigo-500/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
    >
      Back to Home
    </Link>
  </motion.section>
);

export default NotFound;


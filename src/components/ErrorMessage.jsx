import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-red-500/30 bg-red-900/20 px-6 py-8 text-center text-red-200 shadow-lg shadow-red-500/10"
  >
    <FiAlertTriangle className="text-4xl text-red-400" />
    <p className="text-base font-medium leading-relaxed">{message}</p>
    {onRetry ? (
      <button
        onClick={onRetry}
        className="rounded-full bg-red-500/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        type="button"
      >
        Try Again
      </button>
    ) : null}
  </motion.div>
);

export default ErrorMessage;


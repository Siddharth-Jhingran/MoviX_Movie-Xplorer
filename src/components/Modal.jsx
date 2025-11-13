import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.9, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 24,
      stiffness: 320,
    },
  },
  exit: { opacity: 0, scale: 0.9, y: -24 },
};

const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdrop}
        onClick={onClose}
      >
        <motion.div
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-slate-950"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              <FiX className="text-xl" />
            </button>
          </header>
          <div className="max-h-[70vh] overflow-y-auto bg-slate-900/80 px-6 py-6">{children}</div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export default Modal;


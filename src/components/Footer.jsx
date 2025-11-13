import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-12 text-slate-400 shadow-2xl shadow-slate-950/60 backdrop-blur-xl sm:px-8"
  >
    <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-lg font-semibold text-white">MoviX</p>
        <p className="text-sm text-slate-500">Discover, track, and fall in love with cinema all over again.</p>
      </div>

      <div className="flex items-center gap-4">
        <motion.a
          href="https://github.com/siddharth-jhingran"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -4 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/80 text-slate-300 transition hover:border-indigo-500 hover:text-white"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -4 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/80 text-slate-300 transition hover:border-indigo-500 hover:text-white"
        >
          <FaTwitter />
        </motion.a>
        <motion.a
          href="https://www.instagram.com/sid_jhingran?igsh=MTdmbHJhMGIzOGRkcQ=="
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -4 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/80 text-slate-300 transition hover:border-indigo-500 hover:text-white"
        >
          <FaInstagram />
        </motion.a>
      </div>
    </div>

    <p className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-slate-600">
      © {new Date().getFullYear()} MoviX Studios. All rights reserved.
    </p>
  </motion.footer>
);

export default Footer;


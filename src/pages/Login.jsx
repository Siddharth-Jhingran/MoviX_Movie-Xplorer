import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, errors } = useAppContext();
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ success: false, message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(formValues);
      setStatus({ success: true, message: 'Welcome back! Redirecting…' });
      setTimeout(() => navigate('/'), 1200);
    } catch (_error) {
      setStatus({ success: false, message: '' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[70vh] items-center justify-center pb-16"
    >
      <motion.div
        initial={{ rotateY: 15, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-950/80 shadow-2xl shadow-slate-950/60"
      >
        <div className="relative grid md:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 p-10 md:flex md:flex-col md:gap-4 md:justify-end">
            <p className="text-sm uppercase tracking-[0.4em] text-indigo-200">Welcome Back</p>
            <h2 className="text-3xl font-bold text-white">Sign in to MoviX</h2>
            <p className="text-sm text-slate-100">
              Pick up right where you left off, continue the stories you love, and keep your favorites synced.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-8 py-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/80 text-white shadow-lg shadow-indigo-500/40">
                <FiLogIn className="text-xl" />
              </span>
              <h1 className="text-2xl font-semibold text-white">Log In</h1>
              <p className="text-sm text-slate-400">Welcome back, explorer!</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">
                Email
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </label>

              <label className="block text-sm font-medium text-slate-300">
                Password
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading.auth}
              whileTap={{ scale: loading.auth ? 1 : 0.95 }}
              className="w-full rounded-full bg-indigo-500/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {loading.auth ? 'Signing In…' : 'Login'}
            </motion.button>

            <AnimatePresence>
              {errors.auth ? (
                <motion.p
                  key="auth-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                >
                  {errors.auth}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {status.success ? (
                <motion.p
                  key="auth-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                >
                  {status.message}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <p className="text-center text-sm text-slate-400">
              New to MoviX?{' '}
              <Link to="/register" className="font-semibold text-indigo-300 transition hover:text-white">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Login;


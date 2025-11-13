import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, login, loading, errors } = useAppContext();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState({ success: false, message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      setStatus({ success: false, message: 'Passwords do not match.' });
      return;
    }
    try {
      await register({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      });
      setStatus({ success: true, message: 'Account created successfully! Logging you in…' });
      await login({ email: formValues.email, password: formValues.password });
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
        initial={{ rotateY: -15, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-950/80 shadow-2xl shadow-slate-950/60"
      >
        <div className="relative grid md:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-6 px-8 py-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/80 text-white shadow-lg shadow-emerald-500/40">
                <FiUserPlus className="text-xl" />
              </span>
              <h1 className="text-2xl font-semibold text-white">Create Account</h1>
              <p className="text-sm text-slate-400">Start building your cinematic universe.</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">
                Name
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </label>

              <label className="block text-sm font-medium text-slate-300">
                Email
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
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
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </label>

              <label className="block text-sm font-medium text-slate-300">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading.auth}
              whileTap={{ scale: loading.auth ? 1 : 0.95 }}
              className="w-full rounded-full bg-emerald-500/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {loading.auth ? 'Creating Account…' : 'Sign Up'}
            </motion.button>

            <AnimatePresence>
              {status.message ? (
                <motion.p
                  key={status.message}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`rounded-3xl px-4 py-3 text-sm ${
                    status.success
                      ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-200'
                      : 'border border-rose-500/20 bg-rose-500/10 text-rose-200'
                  }`}
                >
                  {status.message}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {errors.auth ? (
                <motion.p
                  key="register-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                >
                  {errors.auth}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-emerald-300 transition hover:text-white">
                Log in
              </Link>
            </p>
          </form>

          <div className="hidden flex-col justify-between bg-gradient-to-br from-emerald-500/30 via-sky-500/20 to-indigo-500/30 px-10 py-12 text-white md:flex">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">Exclusive Access</p>
              <h2 className="text-3xl font-bold leading-tight">
                Track your favorites, sync comments, and unlock tailored recommendations.
              </h2>
            </div>
            <div className="space-y-3 text-sm text-emerald-100">
              <p>✓ Personalized favorites collection</p>
              <p>✓ Comment and interact with other fans</p>
              <p>✓ Seamless experience across devices</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Register;


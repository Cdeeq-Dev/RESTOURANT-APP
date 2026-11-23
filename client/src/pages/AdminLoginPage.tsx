import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, LockKeyhole, LogIn, Mail, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface LoginErrors {
  email?: string;
  password?: string;
}

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isInitializing } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setServerError(null);
  }, [email, password]);

  if (!isInitializing && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const validate = (): boolean => {
    const nextErrors: LoginErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ email: email.trim(), password });
      navigate('/admin', { replace: true });
    } catch (error) {
      const err = error as Error & { fieldErrors?: Record<string, string[]> };
      if (err.fieldErrors) {
        setErrors({
          email: err.fieldErrors.email?.[0],
          password: err.fieldErrors.password?.[0],
        });
      }
      setServerError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none -z-20" />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-6 shadow-lg shadow-amber-500/10">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="text-center mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400/90 mb-2">
              Grand Horizon Hotel
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
              Admin Sign In
            </h1>
            <p className="text-sm text-slate-300/90 font-light leading-relaxed">
              Access the secure admin area to manage restaurant operations.
            </p>
          </div>

          {serverError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-200">Sign-in failed</p>
                <p className="text-xs text-rose-300/90 mt-0.5">{serverError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="admin@restaurant.local"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/90 border ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/20'
                  } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-400 font-medium mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <LockKeyhole className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/90 border ${
                    errors.password
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/20'
                  } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {errors.password && <p className="text-xs text-rose-400 font-medium mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isInitializing}
              className="w-full glass-btn-primary py-3.5 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">Authorized staff only</span>
            <Link to="/" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

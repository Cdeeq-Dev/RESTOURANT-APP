import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Shield, UserCircle2 } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminPlaceholderPage: React.FC = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden px-4 py-12">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none -z-20" />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
                <LayoutDashboard className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400/90 mb-2">
                  Admin Area
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                  Admin Portal
                </h1>
                <p className="text-sm text-slate-300/90 font-light leading-relaxed max-w-xl">
                  Authentication is active. This is a secure placeholder page for the upcoming admin dashboard.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="glass-btn-secondary px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer self-start"
            >
              <LogOut className="w-4 h-4 text-amber-400" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel-subtle rounded-2xl p-5">
              <div className="flex items-center gap-2 text-amber-300 mb-3">
                <UserCircle2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Signed-in Admin</span>
              </div>
              <p className="text-white font-semibold text-lg leading-tight">{admin?.name ?? 'Admin User'}</p>
              <p className="text-slate-300 text-sm mt-1 break-all">{admin?.email ?? '—'}</p>
            </div>

            <div className="glass-panel-subtle rounded-2xl p-5">
              <div className="flex items-center gap-2 text-amber-300 mb-3">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Access Role</span>
              </div>
              <p className="text-white font-semibold text-lg leading-tight">{admin?.role ?? '—'}</p>
              <p className="text-slate-300 text-sm mt-1">
                Protected admin routes and token-based session are configured.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-amber-500/15 text-sm text-slate-300">
            <p className="font-medium text-amber-200 mb-1">Next steps (not included in this phase)</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Orders, reservations, menu management, and operational dashboards will be added in later admin steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

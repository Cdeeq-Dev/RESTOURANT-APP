import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2, Shield } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminProtectedRoute: React.FC = () => {
  const { isAuthenticated, isInitializing } = useAdminAuth();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="glass-panel rounded-3xl px-8 py-10 text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <Shield className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span className="text-sm">Verifying admin session...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

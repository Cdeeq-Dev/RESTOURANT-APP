import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ADMIN_TOKEN_STORAGE_KEY } from '../services/api';
import { getCurrentAdmin, loginAdmin } from '../services/adminAuthService';
import type { AdminLoginPayload, AdminUser } from '../types/admin';

interface AdminAuthContextValue {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (payload: AdminLoginPayload) => Promise<void>;
  logout: () => void;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  });
  const [isInitializing, setIsInitializing] = useState(true);

  const clearSession = () => {
    setAdmin(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (!token) {
        if (isMounted) {
          setIsInitializing(false);
        }
        return;
      }

      try {
        const currentAdmin = await getCurrentAdmin();
        if (isMounted) {
          setAdmin(currentAdmin);
        }
      } catch {
        if (isMounted) {
          clearSession();
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    void initialize();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async (payload: AdminLoginPayload) => {
    const result = await loginAdmin(payload);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, result.token);
    }
    setToken(result.token);
    setAdmin(result.admin);
  };

  const logout = () => {
    clearSession();
  };

  const refreshAdmin = async () => {
    if (!token) {
      clearSession();
      return;
    }
    const currentAdmin = await getCurrentAdmin();
    setAdmin(currentAdmin);
  };

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      admin,
      token,
      isAuthenticated: Boolean(token && admin),
      isInitializing,
      login,
      logout,
      refreshAdmin,
    }),
    [admin, token, isInitializing]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

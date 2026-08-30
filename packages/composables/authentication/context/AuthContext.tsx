'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { getMe, refresh } from '../functions';
import type { User, ApiError } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get cookie on the client side
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      let token = getCookie('accessToken');

      if (!token) {
        // Attempt to refresh if there's no access token
        const refreshResponse = await refresh();
        token = refreshResponse.accessToken;
      }

      if (token) {
        try {
          const userData = await getMe(token);
          setUser(userData);
        } catch (err: any) {
          if (err?.status === 401) {
            // Token might be expired, try refreshing once
            const refreshResponse = await refresh();
            const newUserData = await getMe(refreshResponse.accessToken);
            setUser(newUserData);
          } else {
            throw err;
          }
        }
      } else {
        setUser(null);
      }
    } catch (err: any) {
      console.error('Failed to fetch user:', err);
      setError(err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, error, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

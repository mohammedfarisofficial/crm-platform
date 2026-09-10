'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import { getMe, fetchClient, getCookie } from '../functions';
import type { User } from '../types';
import { ApiError } from '../types';
import { authUrl } from '../config';
import { ENDPOINTS } from '@crm/utils/constants/endpoints';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// Deduplicated silent refresh — ensures only one refresh request is in-flight
// at any given time (guards against React StrictMode double-mount, concurrent
// tabs, etc.)
// ---------------------------------------------------------------------------

let activeRefreshPromise: Promise<string> | null = null;

function setAccessTokenCookie(token: string): void {
  if (typeof document === 'undefined') return;
  // 14 minutes — slightly under the 15-min JWT lifetime so we refresh early
  document.cookie = `accessToken=${encodeURIComponent(token)}; path=/; max-age=840; SameSite=Lax`;
}

async function silentRefresh(): Promise<string> {
  if (activeRefreshPromise) return activeRefreshPromise;

  activeRefreshPromise = (async () => {
    try {
      const { accessToken } = await fetchClient<{ accessToken: string }>(
        authUrl(ENDPOINTS.AUTHENTICATION.REFRESH),
        { method: 'POST', credentials: 'include' },
      );
      setAccessTokenCookie(accessToken);
      return accessToken;
    } finally {
      activeRefreshPromise = null;
    }
  })();

  return activeRefreshPromise;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const initRef = useRef(false); // guard against StrictMode double-mount

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      let token = getCookie('accessToken');

      if (!token) {
        // Attempt to refresh if there's no access token
        token = await silentRefresh();
      }

      if (token) {
        try {
          const userData = await getMe(token);
          setUser(userData);
        } catch (err: any) {
          if (err instanceof ApiError && err.status === 401) {
            // Token might be expired, try refreshing once
            const newToken = await silentRefresh();
            const newUserData = await getMe(newToken);
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
    // Prevent StrictMode double-execution from triggering two refreshes
    if (initRef.current) return;
    initRef.current = true;
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

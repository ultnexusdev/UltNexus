import { create } from 'zustand';
import { setAuthCookie, removeAuthCookie, getAuthCookie } from '../utils/cookies';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  login: (data: any) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: getAuthCookie() || null,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        // Expected data.message to be the i18n key like 'AUTH.INVALID_CREDENTIALS'
        set({ error: data.message || 'AUTH.LOGIN_FAILED', isLoading: false });
        return false;
      }

      setAuthCookie(data.token);
      set({ user: data.user, token: data.token, isLoading: false, error: null });
      return true;
    } catch (err) {
      set({ error: 'AUTH.NETWORK_ERROR', isLoading: false });
      return false;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        set({ error: data.message || 'AUTH.REGISTER_FAILED', isLoading: false });
        return false;
      }

      // After successful register, usually we don't log them in automatically if verification is required.
      // For now, we just return true and let the UI handle success message.
      set({ isLoading: false, error: null });
      return true;
    } catch (err) {
      set({ error: 'AUTH.NETWORK_ERROR', isLoading: false });
      return false;
    }
  },

  logout: () => {
    removeAuthCookie();
    set({ user: null, token: null });
  },
}));

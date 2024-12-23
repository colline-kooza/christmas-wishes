import { create } from 'zustand';

interface UserState {
  user: { id: string; name: string } | null;
  isLoading: boolean;
  setUser: (user: { id: string; name: string } | null) => void;
  setLoading: (loading: boolean) => void;
  hydrateUser: () => void;
}

const initialState = {
  user: null,
  isLoading: false,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,
  setUser: (user) => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
      } else {
        localStorage.removeItem('userData');
      }
    }
    set({ user });
  },
  setLoading: (isLoading) => set({ isLoading }),
  hydrateUser: () => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('userData') || 'null');
      set({ user: storedUser });
    }
  },
}));

// Hydration helper
export const initializeStore = () => {
  if (typeof window !== 'undefined') {
    const storedUser = JSON.parse(localStorage.getItem('userData') || 'null');
    useUserStore.setState({ user: storedUser });
  }
};
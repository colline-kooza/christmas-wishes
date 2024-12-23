import { create } from 'zustand';

interface UserState {
  user: { id: string; name: string } | null;
  isLoading: boolean;
  setUser: (user: { id: string; name: string } | null) => void;
  setLoading: (loading: boolean) => void;
  hydrateUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem('userData') || 'null'), 
  isLoading: false,
  setUser: (user) => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user)); 
    } else {
      localStorage.removeItem('userData'); 
    }
    set({ user });
  },
  setLoading: (isLoading) => set({ isLoading }),
  hydrateUser: () => {
    const storedUser = JSON.parse(localStorage.getItem('userData') || 'null');
    set({ user: storedUser });
  },
}));

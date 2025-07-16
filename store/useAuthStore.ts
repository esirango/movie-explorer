import { create } from "zustand";

export interface User {
    email: string;
    username: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    tokenLoading: boolean;
    setTokenLoading: (token: boolean) => void;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    tokenLoading: true,
    setTokenLoading: (tokenLoading) => set({ tokenLoading }),
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;

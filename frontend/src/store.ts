import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "auth",
      version: 1,
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export const useToken = () => {
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);
  const clearToken = useStore((state) => state.clearToken);
  return { token, setToken, clearToken };
};

export const getToken = () => useStore.getState().token;
export const setToken = (token: string | null) =>
  useStore.getState().setToken(token);
export const clearToken = () => useStore.getState().clearToken();

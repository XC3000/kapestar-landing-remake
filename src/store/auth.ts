import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  id: string | undefined;
};

type AuthState = {
  user: User;
  isLoggedIn: boolean;
  updateUser: (_user: User, _isLoggedIn: boolean) => void;
  logOut: () => void;
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: { id: undefined },
        isLoggedIn: false,
        updateUser: (user: User, isLoggedIn: boolean) =>
          set((state) => ({ ...state, user: user, isLoggedIn: isLoggedIn })),
        logOut: () =>
          set((state) => ({
            ...state,
            user: { id: undefined },
            isLoggedIn: false,
          })),
      }),
      {
        name: "auth",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["updateUser"].includes(key)
            )
          ),
      }
    ),
    { name: "auth" }
  )
);

export default useAuthStore;

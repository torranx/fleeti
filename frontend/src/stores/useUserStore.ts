import { create } from "zustand";
import { persist } from "zustand/middleware"
import createSelectors from "./createSelectors";
import { User } from "@/types/user";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = createSelectors(
  create<UserState>()(
    persist(
      (set, get, store) => ({
        user: null,
        setUser: (user) => set(() => ({ user })),
        clearUser: () => {
          set(() => ({ user: null }))
          store.persist.clearStorage();
        },
      }),
      { name: "user" }
    )
  )
)

export default useUserStore;

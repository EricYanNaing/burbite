"use client";

import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

const UI_COOKIE_NAME = "burbite-ui";

const cookieStorage: StateStorage = {
  getItem: (name) => Cookies.get(name) ?? null,
  setItem: (name, value) => {
    Cookies.set(name, value, {
      expires: 30,
      sameSite: "lax",
    });
  },
  removeItem: (name) => {
    Cookies.remove(name);
  },
};

type UiStore = {
  discoverSearch: string;
  saved: boolean;
  setDiscoverSearch: (value: string) => void;
  clearDiscoverSearch: () => void;
  toggleSaved: () => void;
};

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      discoverSearch: "",
      saved: false,
      setDiscoverSearch: (value) => {
        set({ discoverSearch: value });
      },
      clearDiscoverSearch: () => {
        set({ discoverSearch: "" });
      },
      toggleSaved: () => {
        set((state) => ({ saved: !state.saved }));
      },
    }),
    {
      name: UI_COOKIE_NAME,
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        discoverSearch: state.discoverSearch,
        saved: state.saved,
      }),
      skipHydration: true,
    },
  ),
);

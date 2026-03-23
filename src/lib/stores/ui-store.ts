"use client";

import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

const UI_COOKIE_NAME = "burbite-ui";
const MAX_RECENT_DISCOVER_SEARCHES = 6;

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
  recentDiscoverSearches: string[];
  saved: boolean;
  setDiscoverSearch: (value: string) => void;
  clearDiscoverSearch: () => void;
  saveRecentDiscoverSearch: (value: string) => void;
  clearRecentDiscoverSearches: () => void;
  toggleSaved: () => void;
};

function mergeRecentDiscoverSearches(current: string[], value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return current;
  }

  return [
    trimmedValue,
    ...current.filter(
      (entry) => entry.toLowerCase() !== trimmedValue.toLowerCase(),
    ),
  ].slice(0, MAX_RECENT_DISCOVER_SEARCHES);
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      discoverSearch: "",
      recentDiscoverSearches: [],
      saved: false,
      setDiscoverSearch: (value) => {
        set({ discoverSearch: value });
      },
      clearDiscoverSearch: () => {
        set({ discoverSearch: "" });
      },
      saveRecentDiscoverSearch: (value) => {
        set((state) => ({
          recentDiscoverSearches: mergeRecentDiscoverSearches(
            state.recentDiscoverSearches,
            value,
          ),
        }));
      },
      clearRecentDiscoverSearches: () => {
        set({ recentDiscoverSearches: [] });
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
        recentDiscoverSearches: state.recentDiscoverSearches,
        saved: state.saved,
      }),
      skipHydration: true,
    },
  ),
);

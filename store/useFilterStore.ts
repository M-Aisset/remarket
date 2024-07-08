import { create } from "zustand";

interface FilterState {
  filters: {
    rating: string;
    categories: string[];
    wilaya: string;
    offerings: string[];
  };
  setFilters: (newFilters: Partial<FilterState["filters"]>) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {
    rating: "any",
    categories: ["any"],
    wilaya: "any",
    offerings: ["any"],
  },
  setFilters: (newFilters: Partial<FilterState["filters"]>) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));

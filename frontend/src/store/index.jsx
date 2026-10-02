import { create } from "zustand";
export const domain = "http://localhost:1337";

export const useCart = create((set) => ({
  cart: [],
  setCart: (newValue) => set(() => ({ cart: newValue })),
}));

export const useModal = create((set) => ({
  modal: false,
  setModal: (newValue) => set(() => ({ modal: newValue })),
}));

export const useSearch = create((set) => ({
  searchValue: "",
  setSearchValue: (newValue) => set(() => ({ searchValue: newValue })),
}));

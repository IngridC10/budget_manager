"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type CategoryState = {
  categoria: string;
};

type CategoryContextType = {
  categories: CategoryState;
  setCategories: Dispatch<SetStateAction<CategoryState>>;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: { categoria: "alimentos" },
  setCategories: () => {},
});

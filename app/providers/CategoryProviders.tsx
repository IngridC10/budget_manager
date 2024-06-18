"use client";
import React, { createContext, useState, ReactNode } from "react";
import { Category } from "../board/domain/models";
import categoryData from "@/data/CategoryData";

interface CategoryContextType {
  categoriesState: Category[];
  setCategoriesState: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryContext = createContext<CategoryContextType>({
  categoriesState: [],
  setCategoriesState: () => {},
});

export default function CategoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [categoriesState, setCategoriesState] = useState(categoryData);
  return (
    <CategoryContext.Provider value={{ categoriesState, setCategoriesState }}>
      {children}
    </CategoryContext.Provider>
  );
}
export { CategoryContext, CategoryProvider };

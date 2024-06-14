"use client";
import React, { createContext, useState, ReactNode } from "react"; // Ajusta la ruta de importación según sea necesario
import { Category } from "../board/domain/models";
import categoryData from "@/data/CategoryData";

interface CategoryContextType {
  categoriesState: Category[]; // Cambia 'any' al tipo específico para tus categorías
  setCategoriesState: React.Dispatch<React.SetStateAction<Category[]>>; // Función para actualizar el estado
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

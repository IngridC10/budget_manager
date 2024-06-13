"use client";

import React, { useState } from "react";
import { CategoryContext } from "@/data/CategoryContext";
import dynamic from "next/dynamic";

const KanbanBoard = dynamic(() => import("./components/KanbanBoardComponent"), {
  ssr: false,
});

export default function BoardPage() {
  const [categories, setCategories] = useState({ categoria: "alimentos" });

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      <KanbanBoard />
    </CategoryContext.Provider>
  );
}

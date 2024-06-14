import { Id } from "@/types/domain";
import { ReactNode } from "react";
export type Column = {
  id: Id;
  title: string;
  // position: number;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export type Board = {
  columns: Column[];
  tasks: Task[];
};

export type Category = {
  id: Id;
  name: string;
};

export type IconNewCategory = {
  id: Id;
  name: string;
  icon: ReactNode;
  category?: string;
};

export type ExpenseType = {
  id: Id;
  name: string;
};

import { Id } from "@/types/domain";

export type Column = {
  id: Id;
  title: string;
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

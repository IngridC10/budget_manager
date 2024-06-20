import { Task } from "@/app/board/domain/models";

const taskData: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "",
    title: "Gastos en Salud",
    expenses: 80,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },
  {
    id: "2",
    columnId: "todo",
    content: "",
    title: "Gastos en Salud",
    expenses: 80,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },
  {
    id: "3",
    columnId: "doing",
    content: "",
    title: "Gastos en Salud",
    expenses: 80,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },

  {
    id: "4",
    columnId: "doing",
    content: "",
    title: "Gastos en Salud",
    expenses: 80,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },
  {
    id: "5",
    columnId: "done",
    content: "",
    title: "Gastos en Salud",
    expenses: 80,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },
];

export default taskData;

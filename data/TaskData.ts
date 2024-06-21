import { Task } from "@/app/board/domain/models";

const taskData: Task[] = [
  {
    id: "1",
    columnId: "0",
    content: "",
    title: "Gasolina",
    expenses: 20,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },
  {
    id: "2",
    columnId: "0",
    content: "",
    title: "Gastos en Salud",
    expenses: 60,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },
  {
    id: "3",
    columnId: "1",
    content: "",
    title: "Alimentos",
    expenses: 80,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },

  {
    id: "4",
    columnId: "2",
    content: "",
    title: "Estudios",
    expenses: 200,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },
  {
    id: "5",
    columnId: "2",
    content: "",
    title: "Recreacion",
    expenses: 100,
    date: new Date().toISOString(),
    categoryType: "Salud",
    expenseType: "Variable",
    ownerExpense: "Ingrid",
  },
];

export default taskData;

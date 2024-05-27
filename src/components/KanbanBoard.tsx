import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import PlusIcon from "../icons/PlusIcon";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

export class Card {
  id: Id;
  title: string;
  category: string;
  income: number;
  expenses: number;
  columnId: Id;
  content: string;
  constructor(
    id: number,
    title: string,
    category: string,
    income: number,
    expenses: number,
    columnId: number,
    content: string
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.income = income;
    this.expenses = expenses;
    this.columnId = columnId;
    this.content = content;
  }
}

const cardListMockUp = [
  new Card(
    0,
    "Gastos de Viajes",
    "Personal",
    10000,
    500,
    0,
    "Gastos de Viajes"
  ),
  new Card(
    1,
    "Gastos de Transporte",
    "Transporte",
    2000,
    400,
    1,
    "Gastos de Transporte"
  ),
  new Card(2, "Gastos en Salud", "Salud", 5000, 1000, 2, "Gastos en Salud"),
];
const getCardJSON = JSON.stringify(cardListMockUp, null, 2);

console.log(getCardJSON);

class Columns {
  id: number;
  title: string;
  position: number;
  constructor(id: number, title: string, position: number) {
    this.id = id;
    this.title = title;
    this.position = position;
  }
}

const columnsMockUp = [
  new Columns(0, "Viajes", 0),
  new Columns(1, "Transporte", 1),
  new Columns(2, "Salud", 2),
];

// class Category{
//   id: number;
//   name: string;
//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//   }

// }

// const defaultTasks: Task[] = [
//   // Tus tareas por defecto
// ];
const KanbanBoard: React.FC = () => {
  const [isModalOpenDetailState, setIsModalOpenDetailState] =
    useState<boolean>(false);
  const [isModalOpenAddCategoryState, setIsModalOpenAddCategoryState] =
    useState<boolean>(false);

  const [isModalOpenEditState, setIsModalOpenEditState] =
    useState<boolean>(false);

  // const [columns, setColumns] = useState<Column[]>(cardListMockUp);

  const [columns, setColumns] = useState<Column[]>(columnsMockUp);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [cardsState, setCardsState] = useState<Card[]>(cardListMockUp);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex gap-4 m-auto">
        <div className="flex gap-4 ">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                isModalOpenAddCategoryState={isModalOpenAddCategoryState}
                setIsModalOpenAddCategoryState={setIsModalOpenAddCategoryState}
                isModalOpenDetailState={isModalOpenDetailState}
                setIsModalOpenDetailState={setIsModalOpenDetailState}
                isModalOpenEditState={isModalOpenEditState}
                setIsModalOpenEditState={setIsModalOpenEditState}
                key={col.id}
                column={col}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                cards={cardsState.filter((card) => card.columnId === col.id)}
              />
            ))}
          </SortableContext>
        </div>
        <button
          onClick={() => {
            createNewColumn();
          }}
          className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-blueColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-blueColor
      hover:ring-2
      flex
      gap-2
      "
        >
          <PlusIcon />
          Add
        </button>
      </div>

      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              isModalOpenEditState={isModalOpenEditState}
              setIsModalOpenEditState={setIsModalOpenEditState}
              isModalOpenDetailState={isModalOpenDetailState}
              setIsModalOpenDetailState={setIsModalOpenDetailState}
              isModalOpenAddCategoryState={isModalOpenAddCategoryState}
              setIsModalOpenAddCategoryState={setIsModalOpenAddCategoryState}
              column={activeColumn}
              deleteColumn={deleteColumn}
              updateColumn={updateColumn}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              cards={cardListMockUp.filter(
                (card) => card.columnId === activeColumn.id
              )}
            />
          )}
          {activeCard && (
            <TaskCard
              onSelect={() => {}}
              isSelected={false}
              isModalEditState={isModalOpenEditState}
              setIsModalEditState={setIsModalOpenEditState}
              isModalOpenDetailState={isModalOpenDetailState}
              setIsModalOpenDetailState={setIsModalOpenDetailState}
              isModalOpenEditState={isModalOpenEditState}
              setIsModalOpenEditState={setIsModalOpenEditState}
              isModalOpenAddCategoryState={isModalOpenAddCategoryState}
              setModalOpenAddCategoryState={setIsModalOpenAddCategoryState}
              task={activeCard}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  function createTask(columnId: Id) {
    console.log("Creating task in column", columnId);
    const newTask: Card = {
      id: generateId(),
      columnId,
      content: "",
      title: "",
      category: "",
      income: 0,
      expenses: 0,
      // content: `Task ${tasks.length + 1}`,
    };

    setCardsState([...cardsState, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = cardsState.filter((task) => task.id !== id);
    setCardsState(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = cardsState.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setCardsState(newTasks);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = cardsState.filter((t) => t.columnId !== id);
    setCardsState(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveCard(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setCardsState((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setCardsState((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
};

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;

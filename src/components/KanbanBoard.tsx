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
// import{ se } from "date-fns/locale";

class Card {
  id: number;
  title: string;
  category: string;
  income: number;
  expenses: number;
  constructor(
    id: number,
    title: string,
    category: string,
    income: number,
    expenses: number
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.income = income;
    this.expenses = expenses;
  }
}

const getCard = [
  new Card(0, "Gastos Personales", "Personal", 10000, 500),
  new Card(1, "Gastos de Transporte", "Transporte", 2000, 400),
  new Card(2, "Gastos en Salud", "Salud", 5000, 1000),
];

// class Columns {
//   id: number;
//   title: string;
//   constructor(id: number, title: string) {
//     this.id = id;
//     this.title = title;
//   }
// }

// class Category{
//   id: number;
//   name: string;
//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//   }

// }

console.log(getCard);
const defaultTasks: Task[] = [
  // Tus tareas por defecto
];
const KanbanBoard: React.FC = () => {
  const [isModalOpenDetailState, setIsModalOpenDetailState] =
    useState<boolean>(false);
  const [isModalOpenAddCategoryState, setIsModalOpenAddCategoryState] =
    useState<boolean>(false);

  const [isModalOpenEditState, setIsModalOpenEditState] =
    useState<boolean>(false);

  const [columns, setColumns] = useState<Column[]>(getCard);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
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
                tasks={tasks.filter((task) => task.columnId === col.id)}
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
              tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
            />
          )}
          {activeTask && (
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
              task={activeTask}
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
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: "",
      // content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
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

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
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

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

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
      setTasks((tasks) => {
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
      setTasks((tasks) => {
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

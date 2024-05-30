import { useMemo, useState } from "react";
import { Column, Id } from "../types";
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
import { set } from "date-fns";
import { se } from "date-fns/locale";

export class Card {
  id: Id;
  title: string;
  category: string;
  income: number;
  expenses: number;
  columnId: Id;
  content: string;
  constructor(cardData: {
    id: Id;
    title: string;
    category: string;
    income: number;
    expenses: number;
    columnId: Id;
    content: string;
  }) {
    this.id = cardData.id;
    this.title = cardData.title;
    this.category = cardData.category;
    this.income = cardData.income;
    this.expenses = cardData.expenses;
    this.columnId = cardData.columnId;
    this.content = cardData.content;
  }
}

export const cardListMockUp = [
  new Card({
    id: 0,
    title: "Gastos de Viajes",
    category: "Personal",
    income: 30000,
    expenses: 500,
    columnId: 0,
    content: "Gastos de Viajes",
  }),
  new Card({
    id: 1,
    title: "Gastos de Transporte",
    category: "Transporte",
    income: 2000,
    expenses: 400,
    columnId: 1,
    content: "Gastos de Transporte",
  }),
  new Card({
    id: 2,
    title: "Gastos en Salud",
    category: "Salud",
    income: 5000,
    expenses: 1000,
    columnId: 2,
    content: "Gastos en Salud",
  }),
];
const getCardJSON = JSON.stringify(cardListMockUp, null, 2);

console.log(getCardJSON);

export class Columns {
  id: number;
  title: string;
  position: number;
  constructor(columnsData: { id: number; title: string; position: number }) {
    this.id = columnsData.id;
    this.title = columnsData.title;
    this.position = columnsData.position;
  }
}

export const columnsMockUp = [
  new Columns({
    id: 0,
    title: "Viajes",
    position: 0,
  }),

  new Columns({
    id: 1,
    title: "Transporte",
    position: 1,
  }),
  new Columns({
    id: 2,
    title: "Salud",
    position: 2,
  }),
];

export class Categories {
  id: number;
  name: string;
  constructor(categoriesData: { id: number; name: string }) {
    this.id = categoriesData.id;
    {
      this.name = categoriesData.name;
    }
  }
}

export const categoriesMockUp = [
  new Categories({
    id: 0,
    name: "Alimentos",
  }),
  new Categories({
    id: 1,
    name: "Transporte",
  }),
  new Categories({
    id: 2,
    name: "Salud",
  }),

  new Categories({
    id: 3,
    name: "Café",
  }),

  new Categories({
    id: 4,
    name: "Belleza",
  }),

  new Categories({
    id: 4,
    name: "Vivienda",
  }),
  new Categories({
    id: 4,
    name: "Social",
  }),
];

export class TypeExpense {
  id: number;
  name: String;
  constructor(categoriesData: { id: number; name: String }) {
    this.id = categoriesData.id;
    this.name = categoriesData.name;
  }
}

export const expenseMockUp = [
  new TypeExpense({
    id: 0,
    name: "Gasto Variable",
  }),

  new TypeExpense({
    id: 1,
    name: "Gasto Fijo",
  }),

  new TypeExpense({
    id: 2,
    name: "Gasto Recurrente",
  }),
];

const KanbanBoard: React.FC = () => {
  // Almacena el estado de la visibilidad del modal de detalle
  const [isModalOpenDetailState, setIsModalOpenDetailState] =
    useState<boolean>(false);

  // Almacena el estado de visibilidad del modal para añadir categoría
  const [isModalOpenAddCategoryState, setIsModalOpenAddCategoryState] =
    useState<boolean>(false);

  // Almacena el estado de la visibilidad del modal de edicion en el tablero
  const [isModalOpenEditState, setIsModalOpenEditState] =
    useState<boolean>(false);

  // Almacena el estado actual de las columnas y se actualiza el nuevo valor
  const [columnsState, setColumnsState] = useState<Column[]>(columnsMockUp);

  // Se utiliza para memorizar el resultado de que una operación crea un nuevo array con  los Id de todas las columnas
  const columnsId = useMemo(
    () => columnsState.map((col) => col.id),
    [columnsState]
  );

  // almacena el estado de los cards y se actualiza un nuevo valor con el setCardsState
  const [cardsState, setCardsState] = useState<Card[]>(cardListMockUp);

  // almacena el estado actual de la columna activa y se actualiza con setActiveColumnState
  const [activeColumnState, setActiveColumnState] = useState<Column | null>(
    null
  );

  // almacena el estado actual del card y se actualiza con un nuevo valor con setActiveCardState
  const [activeCardState, setActiveCardState] = useState<Card | null>(null);

  // Registra los sensores para iniciar la operación de arrastrar y soltar
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  return (
    // Registra los sensores que inician la operación de arrastrar y soltar
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex gap-4 m-auto">
        <div className="flex gap-4 ">
          {/* 
          Se mapea el estado de las columnas para renderizar un componente para cada columna */}
          <SortableContext items={columnsId}>
            {columnsState.map((col) => (
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
          {activeColumnState && (
            <ColumnContainer
              isModalOpenEditState={isModalOpenEditState}
              setIsModalOpenEditState={setIsModalOpenEditState}
              isModalOpenDetailState={isModalOpenDetailState}
              setIsModalOpenDetailState={setIsModalOpenDetailState}
              isModalOpenAddCategoryState={isModalOpenAddCategoryState}
              setIsModalOpenAddCategoryState={setIsModalOpenAddCategoryState}
              column={activeColumnState}
              deleteColumn={deleteColumn}
              updateColumn={updateColumn}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              cards={cardsState.filter(
                (card) => card.columnId === activeColumnState.id
              )}
            />
          )}
          {activeCardState && (
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
              task={activeCardState}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  // Esta función sirve para crear una nueva tarea o card en una columna específica
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
    };

    setCardsState([...cardsState, newTask]);
  }
  // Se utiliza para eliminar una tarea del estado de los cards
  function deleteTask(id: Id) {
    const newTasks = cardsState.filter((task) => task.id !== id);
    setCardsState(newTasks);
  }

  // Se utiliza para actualizar una tarea especifica en el estado de los cards
  function updateTask(id: Id, card: Card) {
    console.log("Updating task", id);
    const newTasks = cardsState.map((task) => {
      if (task.id !== id) return task;

      // copia todas las propiedades del objeto task en un nuevo objeto  llamado updatedTask
      const updatedTask = { ...task };

      updatedTask.title = card.title;
      updatedTask.category = card.category;
      updatedTask.income = card.income;
      updatedTask.expenses = card.expenses;
      updatedTask.content = card.content;

      // if (content !== undefined) {
      //   updatedTask.content = content;
      // }
      // if (expenses !== undefined) {
      //   updatedTask.expenses = expenses;
      // }

      return updatedTask;
    });

    // Se utiliza para actualizar el estado de las tarjetas
    setCardsState(newTasks);
    console.log("New tasks", cardsState);
  }

  // Esta función crea una nueva columna en el tablero
  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columnsState.length + 1}`,
    };

    setColumnsState([...columnsState, columnToAdd]);
  }

  // Elimina una columna específica del tablero
  function deleteColumn(id: Id) {
    const filteredColumns = columnsState.filter((col) => col.id !== id);
    setColumnsState(filteredColumns);

    const newTasks = cardsState.filter((t) => t.columnId !== id);
    setCardsState(newTasks);
  }

  // Actualiza el título de una columna en especifíco
  function updateColumn(id: Id, title: string) {
    const newColumns = columnsState.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    // Actualiza el estado de las columnas
    setColumnsState(newColumns);
  }

  // Maneja el inicio de una operación de arrastrar y soltar el tablero
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumnState(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Card") {
      setActiveCardState(event.active.data.current.task);
      return;
    }
  }
  // Se utiliza para manejar el final de una operación de arrastrar y soltar en el tablero
  function onDragEnd(event: DragEndEvent) {
    setActiveColumnState(null);
    setActiveCardState(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    // Actualiza el estado de las columnas en el tablero
    setColumnsState((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  // Esta función se activa cuando un elemento arrastrado se mueve sobre otro elemento

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Suelta la tarea sobre otra tarea
    if (isActiveATask && isOverATask) {
      setCardsState((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    //Actualiza los estados de la tarjeta en el card
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

// Genera un número aleatorio, este número puede ser utilizado como un identificador único

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;

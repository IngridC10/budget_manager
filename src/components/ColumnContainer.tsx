import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
import { Card } from "./KanbanBoard";
interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  cards: Card[];
  isModalOpenDetailState: boolean;
  setIsModalOpenDetailState: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpenAddCategoryState: boolean;
  setIsModalOpenAddCategoryState: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpenEditState: boolean;
  setIsModalOpenEditState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnContainer: React.FC<Props> = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  cards,
  deleteTask,
  updateTask,
  isModalOpenDetailState,
  setIsModalOpenDetailState,
  isModalOpenEditState,
  setIsModalOpenEditState,
  isModalOpenAddCategoryState,
  setIsModalOpenAddCategoryState,
}) => {
  const [editModeState, setEditModeState] = useState(false);

  const tasksIds = useMemo(() => cards.map((task) => task.id), [cards]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editModeState,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor opacity-40 border-2 border-colorLightBlue w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[366px] h-[650px] max-h-[650px] rounded-md flex flex-col"
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditModeState(true)}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-columnBackgroundColor">
            0
          </div>
          {!editModeState && column.title}
          {editModeState && (
            <input
              className="px-2 bg-black border rounded outline-none focus:border-colorLightBlue"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditModeState(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setEditModeState(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="px-1 py-2 rounded stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto bg-blueColor">
        <div className="flex flex-row items-center justify-end gap-2">
          <select className="w-32 h-6 text-black rounded-lg bg-colorLightBlue">
            <option>Categorías</option>
            <option>Asignaciones</option>
          </select>
          <div className="flex items-center group"></div>
        </div>

        <SortableContext items={tasksIds}>
          {cards.map((card) => (
            <TaskCard
              isModalOpenAddCategoryState={isModalOpenAddCategoryState}
              setModalOpenAddCategoryState={setIsModalOpenAddCategoryState}
              isModalOpenEditState={isModalOpenEditState}
              setIsModalOpenEditState={setIsModalOpenEditState}
              isSelected={false}
              onSelect={() => {}}
              key={card.id}
              task={card}
              deleteTask={deleteTask}
              updateTask={updateTask}
              isModalOpenDetailState={isModalOpenDetailState}
              setIsModalOpenDetailState={setIsModalOpenDetailState}
              isModalEditState={isModalOpenEditState}
              setIsModalEditState={setIsModalOpenEditState}
            />
          ))}
        </SortableContext>
        <div className="flex flex-row items-center justify-end">
          <button
            className="flex items-center gap-2 p-4 hover:text-colorLightBlue"
            onClick={() => createTask(column.id)}
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <div className="flex items-center p-4 h-[51px]">
        <h1>Suma Total</h1>
      </div>
    </div>
  );
};

export default ColumnContainer;

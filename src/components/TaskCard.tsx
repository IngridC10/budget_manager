import { useState } from "react";
import { Id } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "./ModalComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlusIcon from "../icons/PlusIcon";
import IconsCategoryList from "./IconsCategoryListComponent";
import CategorySelect, { OptionType } from "./CategoryComponent";
import OwnerExpenses from "./OwnerExpenses";
import { Card, expenseMockUp, categoriesMockUp } from "./KanbanBoard";

// import { de } from "date-fns/locale";

interface Props {
  task: Card;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, card: Card) => void;
  isModalOpenDetailState: boolean;
  setIsModalOpenDetailState: React.Dispatch<React.SetStateAction<boolean>>;
  isModalEditState: boolean;
  setIsModalEditState: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpenEditState: boolean;
  setIsModalOpenEditState: React.Dispatch<React.SetStateAction<boolean>>;
  isSelected: boolean;
  setModalOpenAddCategoryState: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpenAddCategoryState: boolean;
  onSelect: () => void;
}

function TaskCard({
  task,
  deleteTask,
  updateTask,
  isModalOpenDetailState,
  setIsModalOpenDetailState,
  isSelected,
  onSelect,
  isModalOpenAddCategoryState,
  setModalOpenAddCategoryState,
  isModalOpenEditState,
  setIsModalOpenEditState,
}: Props) {
  // Se utiliza para rastrear si el mouse está sobre un componente en especīfico.
  const [mouseIsOverState, setMouseIsOverState] = useState(false);

  // Rastrea si el componente está en modo de edición.
  const [editModeState, setEditModeState] = useState(false);

  // Rastrea el task seleccionado.
  const [selectedTask, setSelectedTask] = useState<Card | null>(null);

  // Rastrea los gastos asociados con una tarea y actualiza la interfaz de usuario
  const [expenseAmountState, setExpenseAmountState] = useState(task.expenses);

  // Rastrea la fecha seleccionada y actualiza la interfaz de usuario

  const [selectedDateState, setSelectedDateState] = useState<Date | null>(null);

  // Selecciona el tipo de gasto y actualiza la interfaz de usuario

  const [selectedExpenseTypeState, setSelectedExpenseTypeState] =
    useState<string>("");

  // Selecciona la categoría
  const [selectedCategoryState, setSelectedCategoryState] =
    useState<OptionType | null>(null);
  // Se utiliza para hacer que un elemento pueda ser reordenado mediante operaciones de
  // arrastrar y soltar
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
    disabled: editModeState,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    boxShadow: isSelected ? "0 0 10px #000" : "none",
  };

  // Cambia el estado de editModeState

  const toggleEditMode = () => {
    setEditModeState((prev) => !prev);
    setMouseIsOverState(false);
  };

  // Se activa cuando se hace click en un contenido específico
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTask(task); // Establecer el task seleccionado
    setIsModalOpenEditState(true);
  };

  // Se utiliza para actualizar una tarea existente con los nuevos valores y luego cierra el modal de edición
  const handleSave = () => {
    const newCard = {
      ...task,
      expenses: expenseAmountState,
      title: task.title,
      content: task.content,
      date: selectedDateState,
      category: selectedCategoryState?.value || "",
    };
    updateTask(task.id, newCard);
    setIsModalOpenEditState(false);
    console.log("me devuelve", newCard);
  };

  // Maneja el comportamiento de arrastrar y soltar

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-colorLightBlue p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-colorLightBlue cursor-grab relative"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        onSelect();
      }}
      className={`bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl ${
        isSelected ? "ring-2 ring-inset ring-colorLightBlue" : ""
      } hover:ring-2 hover:ring-inset hover:ring-colorLightBlue cursor-grab relative task`}
      onMouseEnter={() => setMouseIsOverState(true)}
      onMouseLeave={() => setMouseIsOverState(false)}
    >
      {editModeState ? (
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Ingrese gasto o ingreso..."
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => (task.content = e.target.value)}
        />
      ) : (
        <div className="flex justify-between w-full">
          <div
            className={`my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap ${
              !task.content ? "text-gray-500" : ""
            }`}
            onClick={handleContentClick}
          >
            {task.content || "Ingrese gasto o ingreso..."}
          </div>
          {mouseIsOverState && (
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTask(task); // Establecer el task seleccionado
                  toggleEditMode();
                  setIsModalOpenEditState(true);
                }}
                className="p-2 rounded stroke-white bg-columnBackgroundColor opacity-60 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>

              <button
                id={`info-${task.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpenDetailState(true);
                }}
                className="p-2 rounded stroke-white bg-columnBackgroundColor opacity-60 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>

              <button
                id={`delete-${task.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="p-2 rounded stroke-white bg-columnBackgroundColor opacity-60 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>
      )}

      {isModalOpenDetailState && (
        <ModalComponent
          onClose={() => setIsModalOpenDetailState(false)}
          content={
            <div className="flex flex-col items-start justify-center">
              <span className="w-10 h-10 mr-2">
                <i className="text-black fas fa-home"></i>
              </span>
              <div className="flex items-center justify-center w-full h-12 mt-5">
                <h1 className="text-[60px] font-bold text-blueColor">S/400</h1>
              </div>
              <h2 className="mt-6 text-lg font-bold text-black">
                Gastos personales - Seguro de salud
              </h2>
              <h3 className="mt-6 text-lg font-bold text-black">
                Responsable: Ingrid Calzada
              </h3>
              <h3 className="mt-6 text-lg font-bold text-black">
                Vence el: 10 de junio
              </h3>
            </div>
          }
        />
      )}

      {isModalOpenEditState && selectedTask && (
        <ModalComponent
          onClose={() => setIsModalOpenEditState(false)}
          content={
            <div className="flex flex-col items-start justify-center">
              <label
                htmlFor="monto"
                className="mb-2 text-xl text-blueColor text-start"
              >
                Ingrese el Monto:
              </label>
              <input
                type="text"
                id="monto"
                className="w-full h-12 px-4 text-black border rounded-lg w-70 border-blueColor"
                value={`${expenseAmountState}`}
                placeholder="Digite el monto..."
                onChange={(e) => {
                  if (e.target.value === "") {
                    setExpenseAmountState(0);
                  } else {
                    setExpenseAmountState(parseInt(e.target.value));
                  }
                }}
              />

              <div className="flex items-center justify-center w-full h-12 mt-2 rounded-lg bg-blueColor">
                <h1>{selectedTask.title}</h1>
              </div>

              <div className="flex flex-row items-center justify-between mt-5">
                <select
                  className="w-full h-10 text-center text-black rounded-lg bg-colorLightBlue"
                  value={selectedExpenseTypeState}
                  onChange={(e) => setSelectedExpenseTypeState(e.target.value)}
                >
                  <option value="">Tipo de gasto</option>
                  {expenseMockUp.map((expense) => (
                    <option key={expense.id} value={expense.id}>
                      {expense.name}
                    </option>
                  ))}
                </select>
                <DatePicker
                  selected={selectedDateState}
                  onChange={(date) => setSelectedDateState(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="p-2 ml-2 text-black rounded-lg h-11 w-60 bg-colorLightBlue"
                />
              </div>

              <div className="mt-5">
                <OwnerExpenses />
              </div>
              <div className="flex flex-row items-center justify-center mt-5">
                <CategorySelect
                  categories={categoriesMockUp}
                  selectedCategoryState={selectedCategoryState}
                  setSelectedCategoryState={setSelectedCategoryState}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpenAddCategoryState(true);
                  }}
                  onSelect={() => {}} // TODO set selectState
                  className="h-10 gap-2 ml-4 text-black"
                >
                  <PlusIcon />
                </button>
              </div>

              <button
                className="flex items-center justify-center w-40 h-10 mt-20 rounded-lg ml-52 bg-blueColor"
                onClick={handleSave}
              >
                <h1 className="text-white">Guardar</h1>
              </button>
            </div>
          }
        />
      )}

      {isModalOpenAddCategoryState && (
        <ModalComponent
          onClose={() => setModalOpenAddCategoryState(false)}
          content={
            <div className="flex flex-col justify-center p-4">
              <label htmlFor="category" className="mb-2 text-xl text-blueColor">
                Ingrese el nombre de la categoría:
              </label>
              <input
                type="text"
                id="category"
                className="w-full h-12 px-4 text-black border rounded-lg border-blueColor"
                placeholder="Escribe la categoría"
              />
              <h1 className="text-lg text-black">
                Escoge el ícono de tu preferencia
              </h1>
              <IconsCategoryList />

              <div className="flex items-center justify-center">
                <button className="h-12 mt-3 rounded-md w-52 bg-blueColor">
                  <h1 className="text-white">Guardar</h1>
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default TaskCard;

'use client';
import { useEffect, useState } from "react";
import TrashIcon from "@/public/assets/icons/TrashIcon";
import { Id } from "@/types/domain";
import { Task } from "../domain/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  faEdit,
  faTrash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import PlusIcon from "@/public/assets/icons/PlusIcon";
import ModalComponent from "@/components/ModalComponent";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [selectedDateState, setSelectedDateState] = useState<Date>(new Date());
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editCardEnabledState, setEditCardEnabledState] = useState(false);
  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editCardEnabledState,
  });

  useEffect(() => {
    setEditCardEnabledState(true);                                                                                                                                                                
  }, []);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditCardEnabledState((prev) => !prev);
    setMouseIsOver(false);
  };

  const handleEditClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsModalOpenState(true);
  };

  const closeModal = () => {
    setIsModalOpenState(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
        bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-#A2E6FA cursor-grab relative
        "
      />
    );
  }

  if (editCardEnabledState) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-500 cursor-grab relative"
      >
        <textarea
          className="
          h-[90%]
          w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
          "
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-500 cursor-grab relative task"
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
      >
        <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.content}
        </p>

        {mouseIsOver && (
          <div className="absolute flex flex-row gap-4 p-2 -translate-y-1/2 rounded stroke-white right-4 top-1/2 bg-columnBackgroundColor opacity-60 hover:opacity-100">
            <button onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </button>

            <button>
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>

            <button
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </div>

      {isModalOpenState && (
        <ModalComponent
          onClose={closeModal}
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
                placeholder="Digite el monto..."
              />

              <div className="flex items-center justify-center w-full h-12 mt-2 rounded-lg bg-blueColor">
                <h1>hola</h1>
              </div>

              <div className="flex flex-row items-center justify-between mt-5">
                <select className="w-full h-10 text-center text-black rounded-lg bg-colorLightBlue">
                  <option value="">Tipo de gasto</option>
                  <option value="1">Gasto Variable</option>
                  <option value="2">Gasto Fijo</option>
                  <option value="3">Recurrente</option>
                </select>

                <DatePicker
                  selected={selectedDateState}
                  onChange={(date) => {
                    if (date !== null) {
                      setSelectedDateState(date);
                    }
                  }}
                  dateFormat="Pp"
                  className="p-2 ml-2 text-black rounded-lg h-11 w-60 bg-colorLightBlue"
                />
              </div>

              <div className="mt-5"></div>
              <div className="flex flex-row items-center justify-center mt-5">
                <button className="h-10 gap-2 ml-4 text-black">
                  <PlusIcon />
                </button>
              </div>

              <button className="flex items-center justify-center w-40 h-10 mt-20 rounded-lg ml-52 bg-blueColor">
                <h1 className="text-white">Guardar</h1>
              </button>
            </div>
          }
        />
      )}
    </div>
  );
}

export default TaskCard;

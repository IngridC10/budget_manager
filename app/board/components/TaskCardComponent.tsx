"use client";
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

import ModalComponent from "@/components/ModalComponent";
import EditCardModalBodyComponent from "./EditCardModalBodyComponent";
import DetailCardModalBodyComponent from "./DetailCardModalBodyComponent";
import { title } from "process";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (task: Task) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editCardEnabledState, setEditCardEnabledState] = useState(false);
  const [isModalOpenState, setIsModalOpenState] = useState(false);
  const [isModalOpenDetailState, setIsModalOpenDetailState] = useState(false);

  // that can be sorted by drag and drop
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

    // Open modal Edition
  };

  const handleDetailClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsModalOpenDetailState(true); // Open modal Detail
  };

  const closeEditModal = () => {
    // Close modal Edition
    setIsModalOpenState(false);
  };

  const closeDetailModal = () => {
    // Close modal Detail
    setIsModalOpenDetailState(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-#A2E6FA cursor-grab relative"
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
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={task.title}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => {
            updateTask({ ...task, title: e.target.value });
          }}
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
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.title}
        </p>

        {mouseIsOver && (
          <div className="absolute flex flex-row gap-4 p-6 -translate-y-1/2 rounded stroke-white right-4 top-1/2  ">
            <div onClick={handleEditClick} className="h-[25px] w-[25px]">
              <FontAwesomeIcon icon={faEdit} height={25} width={25} />
            </div>

            <div onClick={handleDetailClick}>
              <FontAwesomeIcon icon={faInfoCircle} height={20} width={20} />
            </div>

            <div
              onClick={() => deleteTask(task.id)}
              className="h-[25px] w-[25px]"
            >
              <FontAwesomeIcon icon={faTrash} height={25} width={25} />
            </div>
          </div>
        )}
      </div>

      {isModalOpenState && (
        <ModalComponent
          onClose={closeEditModal}
          content={
            <EditCardModalBodyComponent
              updateTask={updateTask}
              task={task}
              setModalOpenState={setIsModalOpenState}
            />
          }
        />
      )}

      {isModalOpenDetailState && (
        <ModalComponent
          onClose={closeDetailModal}
          content={<DetailCardModalBodyComponent />}
        />
      )}
    </div>
  );
}

export default TaskCard;

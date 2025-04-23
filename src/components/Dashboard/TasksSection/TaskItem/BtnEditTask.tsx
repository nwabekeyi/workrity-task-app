// src/components/Dashboard/BtnEditTask.tsx
import React, { useState, useCallback } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import ModalCreateTask from "../../Utilities/ModalTask";
import OptionsSvg from "../../../../assets/options.svg";
import { Task } from "../../../../interfaces";
import useApi from "../../../../hooks/useApi";
import { tasksActions } from "../../Tasks.store";

const BtnEditTask: React.FC<{ task: Task }> = ({ task }) => {
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { put, loading, error } = useApi<Task, Task>(import.meta.env.VITE_API_URL);

  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };

  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };

  const editTaskHandler = useCallback(
    async (taskData: Task | Omit<Task, "id">) => {
      // Ensure taskData has an id, as this is for editing
      const updatedTask: Task = {
        ...(taskData as Task), // Spread taskData first
        id: task.id, // Explicitly set id last to avoid overwrite
      };
      try {
        const response = await put(updatedTask, `/tasks/${task.id}`);
        const newTask: Task = {
          id: response.id || response.id || task.id, // Handle _id or id
          title: response.title || updatedTask.title, // Fallback to updatedTask
          importance: response.importance ?? response.importance ?? updatedTask.importance,
          description: response.description || updatedTask.description,
          date: response.date || updatedTask.date,
          completed: response.completed ?? updatedTask.completed,
        };
        dispatch(tasksActions.editTask(newTask));
        alert("Task updated successfully!"); // First alert
        closeModalEditTask();
      } catch (err) {
        console.error("Failed to edit task:", err);
        alert("Failed to update task. Please try again.");
      }
    },
    [task.id, put, dispatch]
  );

  return (
    <>
      <button
        title="Edit task"
        className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700 disabled:opacity-50"
        onClick={openModalEditTask}
        disabled={loading}
      >
        <img
          src={OptionsSvg}
          alt="Edit"
          className="w-4 sm:w-5 h-4 sm:h-5"
        />
      </button>
      {modalEditTaskOpen && (
        <ModalCreateTask
          onClose={closeModalEditTask}
          task={task}
          nameForm="Edit task"
          onConfirm={editTaskHandler}
        />
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
};

export default React.memo(BtnEditTask);
import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import ModalCreateTask from "../../Utilities/ModalTask";
import OptionsSvg from "../../../../assets/options.svg"; // Regular SVG file import
import { Task } from "../../../../interfaces";
import useApi from "../../../../hooks/useApi"; // Assuming useApi hook is available
import { tasksActions } from "../../Tasks.store";

const BtnEditTask: React.FC<{ task: Task }> = ({ task }) => {
  const [modalEditTaskOpen, setModalEditTaskOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // Call the useApi hook at the top level of the component
  const { put } = useApi<Task, Task>(import.meta.env.VITE_API_URL);

  // Close modal function
  const closeModalEditTask = () => {
    setModalEditTaskOpen(false);
  };

  // Open modal function
  const openModalEditTask = () => {
    setModalEditTaskOpen(true);
  };

  // API call to edit the task
  const editTaskHandler = async (task: Task) => {
    try {
      // Call API to edit task using PUT request
      const response = await put(task, `/tasks/${task.id}`);

      // Dispatch updated task to the store
      const updatedTask: Task = {
        id: response.id,
        title: response.title,
        important: response.important,
        description: response.description,
        date: response.date,
        completed: response.completed,
      };

      dispatch(tasksActions.editTask(updatedTask));
      closeModalEditTask();
    } catch (err) {
      console.error("Failed to edit task:", err);
    }
  };

  return (
    <>
      <button
        title="edit task"
        className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
        onClick={openModalEditTask}
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
    </>
  );
};

export default BtnEditTask;

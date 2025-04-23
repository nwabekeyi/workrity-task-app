// src/components/Dashboard/Dashboard.tsx
import React from "react";
import AccountData from "./AccountSection/AccountData";
import Footer from "./Footer";
import Menu from "./Menu/Menu";
import TasksSection from "./TasksSection/TasksSection";
import ModalCreateTask from "./Utilities/ModalTask";
import { Task } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";
import { tasksActions } from "../../components/Dashboard/Tasks.store";
import useApi from "../../hooks/useApi";

const Dashboard: React.FC = () => {
  const modal = useAppSelector((state) => state.modal);
  const user = useAppSelector((state) => state.user.user);
  const userId = user && user.id;
  const dispatch = useAppDispatch();
  const { post } = useApi<any, Omit<Task, "id">>(
    import.meta.env.VITE_API_URL
  );

  const closeModalCreateTask = () => {
    dispatch(modalActions.closeModalCreateTask());
  };

  const createNewTaskHandler = async (taskData: Task | Omit<Task, "id">, nameForm: string) => {
    console.log("createNewTaskHandler called with:", taskData, "nameForm:", nameForm);
    if (nameForm === "Add a task") {
      if (!userId) {
        console.error("User ID is not available");
        alert("User ID is not available. Please log in.");
        return;
      }
      try {
        const response = await post(taskData as Omit<Task, "id">, `/tasks/${userId}`);
        console.log("POST /tasks/:userId response:", response);
        const newTask: Task = {
          id: response._id || response.id || Date.now().toString(),
          title: response.title || taskData.title,
          importance: response.importance ?? response.important ?? taskData.importance,
          description: response.description || taskData.description,
          date: response.date || taskData.date,
          completed: response.completed ?? taskData.completed,
        };
        console.log("Dispatching newTask:", newTask);
        dispatch(tasksActions.addNewTask(newTask));
        closeModalCreateTask();
        alert("Task created successfully!");
      } catch (err) {
        console.error("Failed to create task:", err);
        alert("Failed to create task. Please try again.");
      }
    } else {
      // For non-"Add a task" (e.g., edit), just dispatch (handled by BtnEditTask)
      dispatch(tasksActions.addNewTask(taskData as Task));
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
      {modal.modalCreateTaskOpen && (
        <ModalCreateTask
          onClose={closeModalCreateTask}
          nameForm="Add a task"
          onConfirm={(taskData) => createNewTaskHandler(taskData, "Add a task")}
        />
      )}
      <Menu />
      <TasksSection />
      <Footer />
      <AccountData />
    </div>
  );
};

export default Dashboard;
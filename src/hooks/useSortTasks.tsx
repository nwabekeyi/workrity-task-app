// src/hooks/useSortTasks.ts
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { tasksActions } from "../components/Dashboard/Tasks.store";
import { Task } from "../interfaces";
import useApi from "./useApi"; // Adjust path

const useSortTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const user = useAppSelector((state) => state.user.user);
  const userId = user && user.id;  const [sortedBy, setSortedBy] = useState<string>("");
  const [sortedTasks, setSortedTasks] = useState<Task[]>(tasks);
  const { getAll } = useApi<{ tasks: any[] }, unknown>(import.meta.env.VITE_API_URL);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("Fetching tasks for userId:", userId);
        const response = await getAll(`/tasks/${userId}`);
        console.log("Raw API response:", response);
        const tasks = response.tasks || [];
        const transformedTasks = tasks.map((task: any) => ({
          id: task._id,
          title: task.title,
          importance: task.importance,
          description: task.description,
          date: task.date,
          completed: task.completed,
        }));
        console.log("Transformed tasks:", transformedTasks);
        dispatch(tasksActions.setTasks(transformedTasks));
      } catch (err) {
        console.error("Error fetching tasks:", err);
        dispatch(
          tasksActions.setTasks([]) // Reset tasks on error
        );
        // Optionally set error state in Redux if needed
      }
    };
    if (userId) {
      fetchTasks();
    } else {
      console.warn("No userId found, skipping fetch");
    }
  }, [dispatch, getAll, userId]);

  // Update sortedTasks when tasks change
  useEffect(() => {
    console.log("Fetched tasks from Redux:", tasks);
    setSortedTasks(tasks);
  }, [tasks]);

  // Sorting logic
  useEffect(() => {
    const sortByDate = (order: "max-date" | "min-date"): Task[] => {
      const toMilliseconds = (date: string) => Date.parse(date);
      const tasksCopy = [...sortedTasks];
      const sorted = tasksCopy.sort((task1, task2) => {
        const date1 = toMilliseconds(task1.date);
        const date2 = toMilliseconds(task2.date);

        if (date1 < date2) {
          return -1;
        }
        if (date1 > date2) {
          return 1;
        }
        return 0;
      });

      return order === "min-date" ? sorted : sorted.reverse();
    };

    const sortByCompletedStatus = (completed: boolean): Task[] => {
      const tasksCopy = [...sortedTasks];
      const sorted = tasksCopy.sort((task1) => (task1.completed ? -1 : 0));
      return completed ? sorted : sorted.reverse();
    };

    if (sortedBy === "min-date" || sortedBy === "max-date") {
      setSortedTasks(sortByDate(sortedBy));
    }
    if (sortedBy === "" || sortedBy === "order-added") {
      setSortedTasks(sortedTasks);
    }
    if (sortedBy === "completed-first") {
      setSortedTasks(sortByCompletedStatus(true));
    }
    if (sortedBy === "uncompleted-first") {
      setSortedTasks(sortByCompletedStatus(false));
    }
  }, [sortedBy, sortedTasks]);

  return { sortedBy, setSortedBy, sortedTasks, loading, error };
};

export default useSortTasks;
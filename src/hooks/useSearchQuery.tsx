// src/hooks/useSearchQuery.tsx
import { useEffect, useState } from "react";
import { Task } from "../interfaces";
import { useAppSelector } from "../store/hooks";

const useSearchQuery = (searchQuery: string) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [matchedTasks, setMatchedTasks] = useState<Task[]>([]);

  useEffect(() => {
    console.log("Tasks in useSearchQuery:", tasks); // Debug tasks
    const filteredTasks = tasks.filter((task: Task) => {
      // Safely handle undefined, null, or non-string title
      const title = task.title && typeof task.title === "string" ? task.title : "";
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    if (searchQuery.trim().length) {
      setMatchedTasks(filteredTasks);
    } else {
      setMatchedTasks([]);
    }
  }, [searchQuery, tasks]);

  return matchedTasks;
};

export default useSearchQuery;
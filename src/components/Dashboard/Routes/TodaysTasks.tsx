import React, { useMemo } from "react";
import useDescriptionTitle from "../../../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import useSortTasks from "../../../hooks/useSortTasks";
import { Task } from "../../../interfaces";

// ✅ Exported utility function to use elsewhere
export const getTodaysTasks = (tasks: Task[]): Task[] => {
  const today = new Date().toISOString().split("T")[0];
  return tasks.filter((task) => {
    const taskDate = task.date?.split("T")[0];
    return taskDate === today;
  });
};

const TodaysTasks: React.FC = () => {
  const { sortedBy, setSortedBy, sortedTasks } = useSortTasks();

  const todaysTasks = useMemo(
    () => getTodaysTasks(sortedTasks),
    [sortedTasks]
  );

  useDescriptionTitle("Today's tasks", "Today's tasks");

  return (
    <LayoutRoutes
      sortedBy={sortedBy}
      setSortedBy={setSortedBy}
      title="Today's tasks"
      tasks={todaysTasks}
    />
  );
};

export default TodaysTasks;

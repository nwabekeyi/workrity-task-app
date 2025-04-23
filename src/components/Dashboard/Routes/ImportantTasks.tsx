import React, { useState, useEffect } from "react";
import { Task } from "../../../interfaces";
import useDescriptionTitle from "../../../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import useSortTasks from "../../../hooks/useSortTasks";

const ImportantTasks: React.FC = () => {
  const [importantTasks, setImportantTasks] = useState<Task[]>([]);

  const { sortedBy, setSortedBy, sortedTasks } = useSortTasks();
  const tasks = sortedTasks

  useEffect(() => {
    const filteredTasks: Task[] = tasks.filter((task: Task) => task.importance);
    setImportantTasks(filteredTasks);
  }, [tasks]);

  console.log(importantTasks)
  useDescriptionTitle("Tasks marked as important", "Important tasks");

  return (
    <LayoutRoutes sortedBy={sortedBy} setSortedBy={setSortedBy} title="Important tasks" tasks={importantTasks}></LayoutRoutes>
  );
};

export default ImportantTasks;

import React from "react";
import { useAppSelector } from "../../../store/hooks";
import useCompletedTasks from "../../../hooks/useCompletedTasks";
import useDescriptionTitle from "../../../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import useSortTasks from "../../../hooks/useSortTasks";

const DoneTasks: React.FC<{ done: boolean; title: string }> = ({
  done,
  title,
}) => {
  const { sortedBy, setSortedBy, sortedTasks } = useSortTasks();
  const tasks = sortedTasks
  const { tasks: tasksFiltered } = useCompletedTasks({ tasks, done });

  useDescriptionTitle("All tasks done", title);

  return <LayoutRoutes sortedBy={sortedBy} setSortedBy={setSortedBy} title={title} tasks={tasksFiltered}></LayoutRoutes>;
};

export default DoneTasks;

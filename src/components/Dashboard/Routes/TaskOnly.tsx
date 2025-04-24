import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../../../interfaces";
import { useAppSelector } from "../../../store/hooks";
import useDescriptionTitle from "../../../hooks/useDescriptionTitle";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import useSortTasks from "../../../hooks/useSortTasks";

const TaskOnly: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();


  const [matchedTask, setMatchedTask] = useState<Task[]>([]);

  const { sortedBy, setSortedBy, sortedTasks } = useSortTasks();
  const tasks = sortedTasks

  useEffect(() => {
    const taskId = params.taskId;
    const filteredTask = tasks.filter((task: Task) => taskId === task.id);
    if (!filteredTask.length) {
      navigate("/");
    }
    setMatchedTask(filteredTask);
  }, [navigate, params.taskId, tasks]);

  const title = matchedTask.length ? matchedTask[0].title : "";

  useDescriptionTitle(`Searching for ${title}`, "Task " + title);

  return <LayoutRoutes sortedBy={sortedBy} setSortedBy={setSortedBy} title={title} tasks={matchedTask} />;
};

export default TaskOnly;

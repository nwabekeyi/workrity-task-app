import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { tasksActions } from "../../Tasks.store";
import SvgX from "../../../../assets/x.svg";
import Check from "../../../../assets/check.svg";

const BtnToggleCompleted: React.FC<{
  taskCompleted: boolean;
  taskId: string;
  isListInView1: boolean;
}> = ({ taskCompleted, taskId, isListInView1 }) => {
  const dispatch = useAppDispatch();

  const toggleTaskCompleted = (id: string) => {
    dispatch(tasksActions.toggleTaskCompleted(id));
  };

  return (
    <button
      title={taskCompleted ? "mark as uncompleted" : "mark as completed"}
      className={`${
        taskCompleted
          ? "bg-emerald-200 text-emerald-800 "
          : "bg-amber-200 text-amber-800 "
      } ${isListInView1 ? "mr-4" : "mr-4 order-0"} rounded-full font-medium relative flex items-center`}
      onClick={() => toggleTaskCompleted(taskId)}
    >
      <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
        {taskCompleted ? "completed" : "uncompleted"}
      </span>
      <span className="sm:hidden w-6 h-6 grid place-items-center">
        <img
          src={taskCompleted ? Check : SvgX}
          alt={taskCompleted ? "Completed" : "Uncompleted"}
          className="w-3 h-3"
        />
      </span>
    </button>
  );
};

export default React.memo(BtnToggleCompleted);

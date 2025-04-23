import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { tasksActions } from "../../Tasks.store";
import StarLine from "../../../../assets/star-line.svg"; // importing SVG as image

const BtnMarkAsImportant: React.FC<{
  taskId: string;
  taskImportant: boolean;
}> = ({ taskId, taskImportant }) => {
  const dispatch = useAppDispatch();

  const markAsImportantHandler = () => {
    dispatch(tasksActions.markAsImportant(taskId));
  };

  return (
    <button
      title={taskImportant ? "Unmark as important" : "Mark as important"}
      onClick={markAsImportantHandler}
      className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto"
    >
      <img
        src={StarLine}
        alt="Important"
        className={`w-5 h-5 sm:w-6 sm:h-6 ${
          taskImportant ? "brightness-0 saturate-100 invert sepia hue-rotate-[340deg]" : ""
        }`}
      />
    </button>
  );
};

export default React.memo(BtnMarkAsImportant);

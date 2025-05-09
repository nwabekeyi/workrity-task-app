import React, { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { tasksActions } from "../../Tasks.store";
import ModalConfirm from "../../Utilities/ModalConfirm";
import Trash from "../../../../assets/trash.svg";

const BtnDeleteTask: React.FC<{ taskId: string }> = ({ taskId }) => {
  const [showModal, setIsModalShown] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const removeTaskHandler = () => {
    dispatch(tasksActions.removeTask(taskId));
  };

  return (
    <>
      {showModal && (
        <ModalConfirm
          onClose={() => setIsModalShown(false)}
          text="This task will be deleted permanently."
          onConfirm={removeTaskHandler}
        />
      )}
      <button
        onClick={() => setIsModalShown(true)}
        title="Delete task"
        className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200"
      >
        <img
          src={Trash}
          alt="Delete"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </button>
    </>
  );
};

export default React.memo(BtnDeleteTask);

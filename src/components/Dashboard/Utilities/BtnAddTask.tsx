import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { modalActions } from "../../../store/Modal.store";

const BtnAddTask: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const modalCreateTaskOpen = useAppSelector((state) => state.modal.modalCreateTaskOpen);

  const onOpenModal = () => {
    dispatch(modalActions.openModalCreateTask());
  };

  useEffect(() => {
    console.log("modalCreateTaskOpen:", modalCreateTaskOpen);
  }, [modalCreateTaskOpen]);

  return (
    <button className={`btn ${className}`} onClick={onOpenModal}>
      Add new task
    </button>
  );
};

export default BtnAddTask;
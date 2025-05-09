// src/components/Dashboard/Utilities/ModalTask.tsx
import React, { useRef, useState } from "react";
import { Task } from "../../../interfaces";
import Modal from "./Modal";

const InputCheckbox: React.FC<{
  label: string;
  isChecked: boolean;
  setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) => {
  return (
    <label className="mb-0 flex items-center cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
        )}
      </div>
      <span className="order-1 flex-1">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev: boolean) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask: React.FC<{
  onClose: () => void;
  task?: Task;
  nameForm: string;
  onConfirm: (task: Omit<Task, "id"> | Task) => void;
}> = ({ onClose, task, nameForm, onConfirm }) => {
  const today: Date = new Date();
  let day: number = today.getDate();
  let month: number = today.getMonth() + 1;
  const year: number = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate: string = year + "-" + month + "-" + day;
  const maxDate: string = year + 1 + "-" + month + "-" + day;

  const [description, setDescription] = useState<string>(task?.description || "");
  const [title, setTitle] = useState<string>(task?.title || "");
  const [date, setDate] = useState<string>(task?.date || todayDate);
  const [isImportant, setIsImportant] = useState<boolean>(task?.importance || false);
  const [isCompleted, setIsCompleted] = useState<boolean>(task?.completed || false);

  const isTitleValid = useRef<boolean>(false);
  const isDateValid = useRef<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current) {
      const taskData: Omit<Task, "id"> | Task = {
        title,
        description,
        date,
        completed: isCompleted,
        importance: isImportant,
        ...(task?.id && { id: task.id }), // Include id for edit
      };
      onConfirm(taskData);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <Modal onClose={onClose} title={nameForm}>
      <form className="flex flex-col stylesInputsField" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            placeholder="e.g, study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Date
          <input
            type="date"
            className="w-full"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </label>
        <label>
          Description (optional)
          <textarea
            placeholder="e.g, study for the test"
            className="w-full"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
        </label>
        <InputCheckbox
          isChecked={isImportant}
          setChecked={setIsImportant}
          label="Mark as important"
        />
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <button type="submit" className="btn mt-5" disabled={false}>
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
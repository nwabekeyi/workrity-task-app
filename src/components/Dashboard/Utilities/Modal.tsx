import React from "react";
import { createPortal } from "react-dom"; // Updated import
import SvgX from "../../../assets/x.svg";

const ModalContent: React.FC<{
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}> = ({ children, onClose, title }) => {
  const closeModalHandler = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-slate-600/20 z-[1000] flex items-center justify-center px-2 text-slate-600 dark:text-slate-200 xl:text-base sm:text-sm text-xs"
      onClick={closeModalHandler}
    >
      <section
        className="relative bg-slate-200 dark:bg-slate-900 max-w-lg w-full rounded-lg p-3 sm:p-5 flex flex-col justify-start overflow-y-auto max-h-[90vh]"
      >
        <button
          aria-label="close alert"
          className="absolute right-3 sm:right-4"
          onClick={onClose}
        >
          <img src={SvgX} alt="Close" className="w-5 h-5" />
        </button>
        <h2 className="font-medium mb-5 text-lg md:text-2xl">{title}</h2>
        {children}
      </section>
    </div>
  );
};

const modalElement = document.getElementById("modal")! as HTMLElement;

const Modal: React.FC<{
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}> = ({ children, onClose, title }) => {
  return createPortal(
    <ModalContent children={children} onClose={onClose} title={title} />,
    modalElement
  );
};

export default Modal;
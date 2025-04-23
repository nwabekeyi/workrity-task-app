import React, { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { tasksActions } from "../Tasks.store";
import ModalConfirm from "../Utilities/ModalConfirm";
import useApi from "../../../hooks/useApi"; // Adjust path

const DeleteTasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.id);
  const [showModal, setIsModalShown] = useState<boolean>(false);
  const { deleteItem, loading, error } = useApi<null, unknown>(
    import.meta.env.VITE_API_URL
  );



  const deleteAllDataHandler = useCallback(async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    try {
      // Call DELETE /tasks/all/${userId} with userId as path parameter
      await deleteItem(userId, "/tasks/all");
      dispatch(tasksActions.deleteAllData()); // Dispatch after success
      setIsModalShown(false); // Close modal

      // Alert that all tasks have been deleted
      alert("All tasks have been deleted successfully!");
    } catch (err) {
      console.error("Failed to delete all tasks:", err);
      // Optionally enhance with user-facing error (e.g., toast)
      alert("Failed to delete all tasks. Please try again.");
    }
  }, [userId, deleteItem, dispatch]);

  return (
    <>
      {showModal && (
        <ModalConfirm
          onClose={() => setIsModalShown(false)}
          text="All data will be deleted permanently."
          onConfirm={deleteAllDataHandler}
        />
      )}
      <button
        className="mt-auto text-left pt-4 hover:text-rose-600 dark:hover:text-slate-200 transition disabled:opacity-50"
        onClick={() => setIsModalShown(true)}
        disabled={loading || !userId} // Disable if loading or no userId
      >
        Delete all data
      </button>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
};

export default React.memo(DeleteTasks);

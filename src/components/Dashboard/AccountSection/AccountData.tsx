import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { menusActions } from "../../../store/Menu.store";
import { logoutUser } from "../../../store/User.strore";
import { useNavigate } from "react-router-dom"; 
import LayoutMenus from "../Utilities/LayoutMenus";
import DarkMode from "./DarkMode";
import DeleteTasks from "./DeleteTasks";
import TasksDone from "./TasksDone";

const AccountData: React.FC = () => {
  const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuAccount());
  };

  const handleLogout = () => {
    // Dispatch logout action to clear user data
    dispatch(logoutUser());  // Logout user
    dispatch(menusActions.closeMenuAccount());  // Close menu
    // Navigate to the login page after logging out
    navigate("/login");  // Redirect to /login page
  };

  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="top-0 right-0"
    >
      <section className="p-5 flex flex-col h-full">
        <span className="flex items-center mx-auto">
          <span className="font-medium">Hi, {user?.username}!</span>
          <img
            src={user?.profilePicture}
            alt="Profile"
            className="w-10 rounded-full ml-4"
          />
        </span>

        <DarkMode />

        <TasksDone />
        <DeleteTasks />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md text-center transition hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Logout
        </button>

        <a
          href="https://github.com/nwabekeyi"
          className="mt-4 bg-rose-100 p-2 rounded-md text-rose-600 text-center transition hover:bg-rose-200 dark:bg-slate-700/[.3] dark:text-slate-200"
        >
          Projected by Chidiebere Nwabekeyi
        </a>
      </section>
    </LayoutMenus>
  );
};

export default AccountData;

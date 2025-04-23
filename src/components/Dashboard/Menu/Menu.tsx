import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { menusActions } from "../../../store/Menu.store";
import BtnAddTask from "../Utilities/BtnAddTask";
import NavLinks from "./NavLinks";
import LayoutMenus from "../Utilities/LayoutMenus";
import workrityLogo from '../../../assets/Workrity-Logo-Wordmark-1024x298.webp'

const classLinkActive =
  "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu: React.FC = () => {
  const menuOpen = useAppSelector((state) => state.menu.menuHeaderOpened);
  const dispatch = useAppDispatch();

  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuHeader());
  };
  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="left-0"
    >
      <header className="h-full flex flex-col">
        <div className="flex justify-center mt-5">
        <img className="h-[100%] w-[70%]" src={workrityLogo} alt='workrity logo'/>
        </div>
        <BtnAddTask className="my-8 mx-4" />
        <NavLinks classActive={classLinkActive} />
      </header>
    </LayoutMenus>
  );
};

export default Menu;

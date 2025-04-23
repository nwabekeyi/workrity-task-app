import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  {
    name: "Today's tasks",
    path: "/dashboard/today", // Add /dashboard prefix
  },
  {
    name: "All tasks",
    path: "/dashboard", // Add /dashboard prefix
  },
  {
    name: "Important tasks",
    path: "/dashboard/important", // Add /dashboard prefix
  },
  {
    name: "Completed tasks",
    path: "/dashboard/completed", // Add /dashboard prefix
  },
  {
    name: "Uncompleted tasks",
    path: "/dashboard/uncompleted", // Add /dashboard prefix
  },
];

const NavLinks: React.FC<{ classActive: string }> = ({ classActive }) => {
  const route = useLocation();
  const currentPath = route.pathname;
  return (
    <nav>
      <ul className="grid gap-2">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={`px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200 ${
                currentPath === link.path ? classActive : ""
              }`}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;

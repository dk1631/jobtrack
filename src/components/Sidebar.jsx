import {NavLink, useNavigate, } from "react-router-dom";

import { removeUser } from "../utils/storage";

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    removeUser();
    navigate("/login");
  }

  return (
    <aside className="sidebar">

      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/applications"
          end
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Applications
        </NavLink>

        <NavLink
          to="/applications/add"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Add Application
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          Profile
        </NavLink>

      </nav>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;
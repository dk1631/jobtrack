import {useEffect,useState} from "react";

import {getCurrentUser,} from "../utils/storage";

function Navbar() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    function handleUserUpdate() {
      setUser(getCurrentUser());
    }

    window.addEventListener("userUpdated",handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated",handleUserUpdate);
    };
  }, []);

  return (
    <header className="navbar">

      <div>
        <h2 className="navbar-logo">
          JobTrack
        </h2>
      </div>

      <div className="navbar-user">

        <div className="user-avatar">
          {user?.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <p className="user-name">
            {user?.name}
          </p>

          <p className="user-email">
            {user?.email}
          </p>
        </div>

      </div>

    </header>
  );
}

export default Navbar;
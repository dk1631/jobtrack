import {Link} from "react-router-dom";

import {getCurrentUser} from "../utils/storage";

import "../styles/NotFound.css";

function NotFound() {
  const user = getCurrentUser();

  return (
    <div className="not-found-page">

      <div className="not-found-card">

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you're looking for
          doesn't exist.
        </p>

        <Link to={user? "/dashboard": "/login"} className="primary-button">
        {user
            ? "Back to Dashboard"
            : "Go to Login"
          }
        </Link>

      </div>

    </div>
  );
}

export default NotFound;
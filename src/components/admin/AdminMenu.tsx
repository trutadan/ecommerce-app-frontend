import { Link } from "react-router-dom";
import "./styles.css";

export const AdminMenu = () => {
  return (
    <div className="container">
      <h1>Navigate as</h1>
      <ul>
        <li>
          <Link to="/admin-menu">Admin</Link>
        </li>
        <li>
          <Link to="/moderator-menu">Moderator</Link>
        </li>
        <li>
          <Link to="/">User</Link>
        </li>
      </ul>
    </div>
  );
};

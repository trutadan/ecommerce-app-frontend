import { Link } from "react-router-dom";
import "./styles.css";

export const StaffMenu = () => {
  return (
    <div className="container">
      <h1>Navigate as</h1>
      <ul>
        <li>
          <Link to="/staff/menu">Staff</Link>
        </li>
        <li>
          <Link to="/">User</Link>
        </li>
      </ul>
    </div>
  );
};

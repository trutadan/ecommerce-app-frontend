import { Link } from "react-router-dom";

export const NavigationSelector = () => {
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
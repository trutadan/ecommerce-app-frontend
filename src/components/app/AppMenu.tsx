import { Link, useLocation } from "react-router-dom";
import "./AppMenu.css";

export const AppMenu = () => {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <h1>Menu Page</h1>
      <div className="menu">
        <ul>
          <li>
            <Link to="/items">Items</Link>
          </li>
          <li>
            <Link to="/items/most-sold">Most Sold Items</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

import React from "react";
import "./AppHome.css";
import { Link } from "react-router-dom";

export const AppHome = () => {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
        </ul>
      </nav>
      <h1>Welcome to Gym Supplements!</h1>
      <p>
        Whether you're looking to bulk up, slim down, or just maintain a healthy
        lifestyle, we have everything you need to reach your fitness goals.
      </p>
      <div className="menu">
        <div className="menu-item">
          <h2>Pre-Workout Supplements</h2>
          <p>
            Get the energy and focus you need to power through your workouts
            with our pre-workout supplements.
          </p>
        </div>
        <div className="menu-item">
          <h2>Protein Powders</h2>
          <p>
            Fuel your muscles with our selection of high-quality protein
            powders.
          </p>
        </div>
        <div className="menu-item">
          <h2>Post-Workout Recovery</h2>
          <p>
            Speed up your muscle recovery and reduce soreness with our range of
            post-workout recovery supplements.
          </p>
        </div>
      </div>
    </div>
  );
};

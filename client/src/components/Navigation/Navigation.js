import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import {
  FaLayerGroup,
  FaBell,
  FaUserAlt,
  FaUserPlus,
  FaQuestionCircle,
} from "react-icons/fa";

function Navigation() {
  return (
    <div id="nav-container">
      <div id="nav-container-first-row">
        <Link to="/">
          <FaLayerGroup className="nav-icon" />
        </Link>
        <Link to="/">
          <FaBell className="nav-icon" />
          <div id="bell-length">1</div>
        </Link>
      </div>
      <div id="nav-container-second-row">
        <Link to="/notifications">
          <FaUserPlus className="nav-icon" />
        </Link>
        <Link to="/notifications">
          <FaQuestionCircle className="nav-icon" />
        </Link>
        <FaUserAlt className="nav-icon" />
      </div>
    </div>
  );
}

export default Navigation;

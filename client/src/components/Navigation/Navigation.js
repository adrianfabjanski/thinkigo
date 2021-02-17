import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Navigation.css";
import AuthService from "../../AuthService";
import {
  FaLayerGroup,
  FaBell,
  FaUserAlt,
  FaUserPlus,
  FaQuestionCircle,
} from "react-icons/fa";

function Navigation() {
  const history = useHistory();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUserPlus, setShowUserPlus] = useState(false);

  if (showNotifications) {
    setTimeout(() => {
      setShowNotifications(false);
    }, 7000);
  }

  return (
    <div id="nav-container">
      <div id="nav-container-first-row">
        <Link to="/">
          <FaLayerGroup className="nav-icon" />
        </Link>
        <Link to="/">
          <FaBell
            className="nav-icon"
            onClick={() => {
              setShowNotifications(!showNotifications);
            }}
          />
          <div id="bell-length">1</div>
        </Link>
        <div
          className={
            showNotifications
              ? "notifications-popup active"
              : "notifications-popup"
          }
        >
          <p>You don't have any new notifications</p>
        </div>
      </div>
      <div id="nav-container-second-row">
        <FaUserPlus
          className="nav-icon"
          onClick={() => {
            setShowUserPlus(!showUserPlus);
          }}
        />
        <div className={showUserPlus ? "user-popup active" : "user-popup"}>
          <input
            type="text"
            placeholder="Search for users"
            id="searchUsers-input"
          />
        </div>
        <div id="userplus-length">9</div>
        <Link to="/notifications">
          <FaQuestionCircle className="nav-icon" />
        </Link>
        <FaUserAlt
          className="nav-icon"
          onClick={() => {
            setShowProfile(!showProfile);
          }}
        />
        <div className={showProfile ? "signout-popup active" : "signout-popup"}>
          <div id="signout-button">
            <p onClick={() => {}}>My Profile</p>
          </div>
          <div id="signout-button">
            <p
              onClick={() => {
                AuthService.signOut();
                history.push("/login");
              }}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

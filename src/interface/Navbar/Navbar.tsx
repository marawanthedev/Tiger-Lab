import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar bg-primary">
      <div className="navbar_container">
        <div className="navbar_left-side ">
          <div
            className="navbar_logo flex flex-colum align-items-center"
            onClick={() => navigate("/")}
          >
            Tiger Lab
          </div>
        </div>
        <div className="navbar_right-side flex flex-colum align-items-center">
          <div className="navbar_right-side__links">
            <Link to="/claims-list" className="navbar_link">
              Claim List
            </Link>
            <Link to="/" className="navbar_link">
              Create Claim
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

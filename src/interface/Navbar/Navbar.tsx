import { BaseInterface } from "constants/baseInterface";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.scss";

interface NavbarProps extends BaseInterface {}

export default function Navbar({ title }: NavbarProps) {
  const navigate = useNavigate();

  const navLinks = [
    { text: "Create Claim", to: "/" },
    { text: "Claims List", to: "/list" },
  ];

  return (
    <div className="navbar bg-primary" title={title}>
      <div className="navbar_container">
        <div className="navbar_left-side ">
          <div
            className="navbar_logo flex flex-colum align-items-center"
            onClick={() => navigate("/")}
            title={`${title}-logo`}
          >
            Tiger Lab
          </div>
        </div>
        <div className="navbar_right-side flex flex-colum align-items-center">
          <div className="navbar_right-side__links">
            {navLinks.map((link: (typeof navLinks)[0]) => {
              return (
                <Link
                  className="navbar_link"
                  to={link.to}
                  title={`${title}-link`}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

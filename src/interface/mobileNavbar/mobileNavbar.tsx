import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components";
import { IconOptions } from "../../components/icon/constants";
import "./mobileNavBar.scss";

interface MobileNavBarProps {
  hidden: boolean;
  menuOnClickCallBack: any;
}

const MobileNavBar = ({ hidden, menuOnClickCallBack }: MobileNavBarProps) => {
  const [icon, setIcon] = useState(IconOptions.tripleBars);

  const navLinks = [
    { text: "Create Claim", to: "/" },
    { text: "Claims List", to: "/list" },
  ];

  useEffect(() => {
    if (hidden) setIcon(IconOptions.tripleBars);
    if (!hidden) setIcon(IconOptions.cross);
  }, [hidden]);

  return (
    <nav
      className={`navigation bg-primary  ${
        !hidden && "navigation__full flex flex-column"
      }`}
    >
      <div className="navigation__header  flex align-items-center bg-primary">
        <div className="navigation__icon" onClick={menuOnClickCallBack}>
          <Icon type={icon} />
        </div>
        <div className="navigation__header__content flex justify-content-between align-items-center ">
          <div className={`navigation__header__center`} />
          <div className={`navigation__header__center`}>Tiger Lab</div>
        </div>
      </div>

      {!hidden && (
        <div className="navigation__menu">
          <div className="navigation__menu__inner-container flex flex-column align-items-center justify-content-center">
            {/* links */}
            <div className="navigation__menu__links">
              {navLinks.map((link, index) => {
                return (
                  <Link
                    key={index}
                    className="navigation__menu__link -f-family-burbank"
                    to={String(link.to)}
                    // to reset open state
                    onClick={menuOnClickCallBack}
                  >
                    {link.text}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavBar;

import React from "react";
import "./template.scss";
import { ReactNode } from "constants/ReactNode";
import Navbar from "./../Navbar/Navbar";
import Footer from "../footer/footer";
import MobileNavBar from "../mobileNavbar/mobileNavbar";
import { BaseInterface } from "constants/baseInterface";

interface ITemplate extends BaseInterface {
  children: ReactNode;
}

export default function Template(props: ITemplate): JSX.Element {
  // used to fixate screen when menu is open
  const [mobMenuHidden, setMobMenuHidden] = React.useState(true);

  return (
    <div
      className={`template flex flex-column justify-content-between align-items-between ${
        !mobMenuHidden ? "template_fixed" : ""
      }`}
      title={props.title}
    >
      <div className="template_navbar-container">
        <header>
          <div className="template_desktop-navbar-container">
            <Navbar title={`${props.title}-nav`} />
          </div>
          <div className="template_mobile-navbar-container">
            <MobileNavBar
              title={`${props.title}-mob-nav`}
              hidden={mobMenuHidden}
              menuOnClickCallBack={() => {
                setMobMenuHidden((prev) => !prev);
              }}
            />
          </div>
        </header>
      </div>

      <div className="template_children-container">
        <main title={`${props.title}-children`}>{props.children}</main>
      </div>

      <footer className="template_footer-container">
        <Footer title={`${props.title}-footer`} />
      </footer>
    </div>
  );
}

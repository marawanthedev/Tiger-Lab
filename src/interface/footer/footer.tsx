import { BaseInterface } from "constants/baseInterface";
import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

interface FooterProps extends BaseInterface {}

const Footer = ({ title }: FooterProps): JSX.Element => {
  return (
    <footer className="footer bg-primary" title={title}>
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Tiger Lab</h4>
            <p className="footer-paragraph">
              Tigerlab is the leading provider of insurance software solutions
              and embedded insurance. Our modular software empowers customers to
              rapidly deploy and easily extend and change applications to meet
              strategic business needs.
            </p>
            <div className="copyrights">
              ©TigerLab 2023. All rights reserved
            </div>
          </div>
          <div className="footer-col">
            <h4>Viewing Services</h4>
            <ul>
              <li>
                <Link to="/list" title={`${title}-claims-list-link`}>
                  Claims List
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Creating Services</h4>
            <ul>
              <li>
                <Link to="/" title={`${title}-create-claim-link`}>
                  Create Claim
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

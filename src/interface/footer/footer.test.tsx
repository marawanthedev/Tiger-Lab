import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Footer from "./footer";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "@remix-run/router";

describe("Footer is working properly", () => {
  const history = createBrowserHistory();
  const title = "footer-title";
  const renderComponent = () =>
    render(
      <Router location={history.location} navigator={history}>
        <Footer title={title} />
      </Router>
    );

  test("Claims list link works properly", () => {
    renderComponent();
    const claimListLink = screen.getByTitle(`${title}-claims-list-link`);
    fireEvent.click(claimListLink);
    expect(history.location.pathname).toBe(`/list`);
  });

  test("Create Claim link works properly", () => {
    renderComponent();
    const createClaim = screen.getByTitle(`${title}-create-claim-link`);
    fireEvent.click(createClaim);
    expect(history.location.pathname).toBe(`/`);
  });
});

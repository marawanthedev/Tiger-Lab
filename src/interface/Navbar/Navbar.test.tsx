import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { Router, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "@remix-run/router";
import Navbar from "./Navbar";

describe("navbar works properly", () => {
  const history = createBrowserHistory();

  const title = "nav-test";

  const renderComponent = () =>
    render(
      <Router location={history.location} navigator={history}>
        <Navbar title={title} />
      </Router>
    );

  test("Logo redirects to homepage properly", () => {
    renderComponent();
    const logoEl = screen.getByTitle(`${title}-logo`);
    fireEvent.click(logoEl);
    expect(history.location.pathname).toContain("/");
  });

  test("links navigate properly", () => {
    renderComponent();
    const links = screen.getAllByTitle(`${title}-link`);
    links.map((link) => {
      fireEvent.click(link);
      expect(history.location.pathname).toBe(link.getAttribute("href"));
    });
  });
});

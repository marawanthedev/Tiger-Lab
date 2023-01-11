import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "@remix-run/router";
import MobileNavBar from "./mobileNavbar";
import { IconOptions } from "components/icon/constants";

describe("mobile navbar works properly", () => {
  const history = createBrowserHistory();

  const mobileNavBarOptions = {
    title: "mob-nav-test",
    menuOnClickCallBack: jest.fn(),
  };
  const renderComponent = (hidden = true) =>
    render(
      <Router location={history.location} navigator={history}>
        <MobileNavBar {...mobileNavBarOptions} hidden={hidden} />
      </Router>
    );

  test("icon mapping at closed state works properly", async () => {
    renderComponent();
    const iconEl = screen.getByRole("icon");
    expect(iconEl.title).toContain(
      `${mobileNavBarOptions.title}-icon-${IconOptions.tripleBars}`
    );
  });
  test("icon mapping at opened state works properly", async () => {
    renderComponent(false);
    const iconEl = screen.getByRole("icon");
    expect(iconEl.title).toContain(
      `${mobileNavBarOptions.title}-icon-${IconOptions.cross}`
    );
  });

  test("links navigate properly", async () => {
    renderComponent(false);
    const links = screen.getAllByTitle(`${mobileNavBarOptions.title}-link`);

    links.map((link) => {
      fireEvent.click(link);
      expect(history.location.pathname).toBe(link.getAttribute("href"));
    });
  });
});

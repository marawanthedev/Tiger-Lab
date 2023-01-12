import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Template from "./template";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "@remix-run/router";
import ReactDOMServer from "react-dom/server";

describe("Template component works properly", () => {
  const history = createBrowserHistory();

  const templateOptions = {
    title: "template-test",
    children: <div>Template children test</div>,
  };
  const renderComponent = () =>
    render(
      <Router location={history.location} navigator={history}>
        <Template {...templateOptions} />
      </Router>
    );

  test("children prop to component maps properly", () => {
    renderComponent();
    const Children = () => templateOptions.children;

    const childrenStringFormat = ReactDOMServer.renderToStaticMarkup(
      <Children />
    );

    const childrenEl = screen.getByTitle(`${templateOptions.title}-children`);
    expect(childrenEl.children.length).toBe(1);
    expect(childrenEl.innerHTML).toBe(childrenStringFormat.toString());
  });
});

import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import CustomButton from "./button";
import { ButtonTypes } from "constants/ButtonType";

describe("button is working properly", () => {
  const buttonOptions = {
    color: "white",
    width: "20rem",
    innerText: "test-btn",
    title: "button-test",
    className: "test-class",
    type: ButtonTypes.SUBMIT,
    onClick: jest.fn(),
  };

  const renderComponent = () => render(<CustomButton {...buttonOptions} />);

  test("onClick event works properly", () => {
    renderComponent();
    const btnEl = screen.getByTitle(buttonOptions.title);
    fireEvent.click(btnEl);
    expect(buttonOptions.onClick).toHaveBeenCalledTimes(1);
  });

  test("class name prop to value mapped properly", () => {
    renderComponent();
    const btnEl = screen.getByTitle(buttonOptions.title);
    expect(btnEl.classList).toContain(buttonOptions.className);
  });

  test("color prop to value mapped properly", () => {
    renderComponent();
    const btnEl = screen.getByTitle(buttonOptions.title);
    expect(btnEl.style.color).toBe(buttonOptions.color);
  });

  test("width prop to value mapped properly", () => {
    renderComponent();
    const btnEl = screen.getByTitle(buttonOptions.title);
    expect(btnEl.style.width).toBe(buttonOptions.width);
  });

  test("type prop to value mapped properly", () => {
    renderComponent();
    const btnEl = screen.getByTitle(buttonOptions.title);
    expect(btnEl.getAttribute("type")).toBe(buttonOptions.type);
  });
  test("classname prop to value mapped properly", () => {
    renderComponent();
    const btnEl = screen.getByTitle(buttonOptions.title);
    expect(btnEl.classList).toContain(buttonOptions.className);
  });
});

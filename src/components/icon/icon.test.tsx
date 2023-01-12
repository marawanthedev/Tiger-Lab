import React from "react";
import { screen, render } from "@testing-library/react";
import Icon from "./icon";
import { IconOptions } from "./constants";

describe("icon component works properly", () => {
  const type = IconOptions.cross;
  const renderComponent = () => render(<Icon type={type} />);

  test("Icon option type to svg path is mapped properly", () => {
    renderComponent();
    const svgEl = screen.getByRole("icon-path");
    expect(svgEl.firstElementChild?.classList).toContain(type);
  });
});

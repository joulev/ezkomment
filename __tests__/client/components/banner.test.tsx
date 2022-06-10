import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Banner from "~/client/components/banner";

describe("Banner component", () => {
  it("`variant` testing", () => {
    expect(() => render(<Banner variant="warning">Hello</Banner>)).not.toThrow();
    expect(screen.getByText("Hello").closest(".border-amber-500.bg-amber-500")).not.toBeNull();
  });

  it("`className` testing", () => {
    expect(() =>
      render(
        <Banner id="banner" variant="warning" className="custom-class">
          Hello
        </Banner>
      )
    ).not.toThrow();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(document.getElementById("banner")).toHaveClass("custom-class");
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Button from "@client/components/buttons";

describe("Button component", () => {
  it("`variant` testing", () => {
    expect(() =>
      render(
        <>
          <Button id="no-variant">No variant</Button>
          <Button id="primary" variant="primary">
            Primary
          </Button>
          <Button id="danger" variant="danger">
            Danger
          </Button>
          <Button id="tertiary" variant="tertiary">
            Tertiary
          </Button>
        </>
      )
    ).not.toThrow();

    expect(screen.getByText("No variant")).toBeInTheDocument();
    expect(document.getElementById("no-variant")).toHaveClass("text-white bg-indigo-500");

    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(document.getElementById("primary")).toHaveClass("text-white bg-indigo-500");

    expect(screen.getByText("Danger")).toBeInTheDocument();
    expect(document.getElementById("danger")).toHaveClass("text-white bg-red-500");

    expect(screen.getByText("Tertiary")).toBeInTheDocument();
    expect(document.getElementById("tertiary")).toHaveClass(
      "text-neutral-700 dark:text-neutral-300 border-card bg-card"
    );
  });
});

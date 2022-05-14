import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Button from "@client/components/buttons";

describe("Button component", () => {
  it("`variant` testing", () => {
    expect(() =>
      render(
        <>
          <Button>No variant</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="tertiary">Tertiary</Button>
        </>
      )
    ).not.toThrow();

    expect(screen.getByText("No variant")).toBeInTheDocument();
    expect(screen.getByText("No variant").closest(".text-white.bg-indigo-500")).not.toBeNull();

    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Primary").closest(".text-white.bg-indigo-500")).not.toBeNull();

    expect(screen.getByText("Danger")).toBeInTheDocument();
    expect(screen.getByText("Danger").closest(".text-white.bg-red-500")).not.toBeNull();

    expect(screen.getByText("Tertiary")).toBeInTheDocument();
    expect(
      screen
        .getByText("Tertiary")
        .closest(".text-neutral-700.dark\\:text-neutral-300.border-card.bg-card")
    ).not.toBeNull();
  });

  it("`href` testing", () => {
    expect(() =>
      render(
        <>
          <Button id="no-href">No href</Button>
          <Button id="href" href="https://google.com">
            Href
          </Button>
        </>
      )
    ).not.toThrow();

    expect(screen.getByText("No href")).toBeInTheDocument();
    expect(document.getElementById("no-href")).not.toHaveAttribute("href");

    expect(screen.getByText("Href")).toBeInTheDocument();
    expect(document.getElementById("href")).toHaveAttribute("href", "https://google.com");
    expect(document.getElementById("href")).toHaveAttribute("target", "_blank");
  });

  it("`className` testing", () => {
    expect(() => render(<Button className="test">Class name</Button>)).not.toThrow();
    expect(screen.getByText("Class name").closest(".test")).not.toBeNull();
  });

  it("`children` testing", () => {
    expect(() =>
      render(
        <>
          <Button id="no-children" />
          <Button>Text</Button>
        </>
      )
    ).not.toThrow();

    expect(document.getElementById("no-children")).toHaveClass("p-1.5");

    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(screen.getByText("Text").closest(".p-1\\.5")).toBeNull();
  });
});

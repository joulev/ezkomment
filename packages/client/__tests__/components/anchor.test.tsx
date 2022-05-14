import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import A from "@client/components/anchor";

describe("Anchor component", () => {
  it("`href` tests", () => {
    expect(() =>
      render(
        <>
          <A>fake link</A>
          <A href="#">anchor</A>
          <A href="/">internal</A>
          <A href="https://google.com">external</A>
        </>
      )
    ).not.toThrow();

    expect(screen.getByText("fake link")).toBeInTheDocument();
    expect(screen.getByText("fake link")).not.toHaveAttribute("href");

    expect(screen.getByText("anchor")).toBeInTheDocument();
    expect(screen.getByText("anchor")).toHaveAttribute("href", "#");
    expect(screen.getByText("anchor")).not.toHaveAttribute("target");

    expect(screen.getByText("internal")).toBeInTheDocument();
    expect(screen.getByText("internal")).toHaveAttribute("href", "/");
    expect(screen.getByText("internal")).not.toHaveAttribute("target");

    expect(screen.getByText("external")).toBeInTheDocument();
    expect(screen.getByText("external")).toHaveAttribute("href", "https://google.com");
    expect(screen.getByText("external")).toHaveAttribute("target", "_blank");
  });

  it("`notStyled` tests", () => {
    expect(() =>
      render(
        <>
          <A>Normal link</A>
          <A notStyled>Not styled</A>
        </>
      )
    ).not.toThrow();

    expect(screen.getByText("Normal link")).toBeInTheDocument();
    expect(screen.getByText("Normal link")).toHaveClass("a");

    expect(screen.getByText("Not styled")).toBeInTheDocument();
    expect(screen.getByText("Not styled")).not.toHaveClass("a");
  });

  it("`className` tests", () => {
    expect(() => render(<A className="custom-class">Custom class</A>)).not.toThrow();
    expect(screen.getByText("Custom class")).toBeInTheDocument();
    expect(screen.getByText("Custom class")).toHaveClass("a");
    expect(screen.getByText("Custom class")).toHaveClass("custom-class");
  });
});

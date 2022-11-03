import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import A from "~/client/components/anchor";

describe("Anchor component", () => {
  it("`href` tests", () => {
    expect(() =>
      render(
        <>
          <A id="fake">fake link</A>
          <A id="anchor" href="#">
            anchor
          </A>
          <A id="internal" href="/">
            internal
          </A>
          <A id="external" href="https://example.com">
            external
          </A>
        </>
      )
    ).not.toThrow();

    expect(screen.queryByText("fake link")).toBeInTheDocument();
    expect(document.getElementById("fake")).not.toHaveAttribute("href");

    expect(screen.queryByText("anchor")).toBeInTheDocument();
    expect(document.getElementById("anchor")).toHaveAttribute("href", "/#");
    expect(document.getElementById("anchor")).not.toHaveAttribute("target");

    expect(screen.queryByText("internal")).toBeInTheDocument();
    expect(document.getElementById("internal")).toHaveAttribute("href", "/");
    expect(document.getElementById("internal")).not.toHaveAttribute("target");

    expect(screen.queryByText("external")).toBeInTheDocument();
    expect(document.getElementById("external")).toHaveAttribute("href", "https://example.com");
    expect(document.getElementById("external")).toHaveAttribute("target", "_blank");
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
    expect(screen.getByText("Normal link").closest(".a")).not.toBeNull();
    expect(screen.getByText("Not styled").closest(".a")).toBeNull();
  });

  it("`className` tests", () => {
    expect(() => render(<A className="custom-class">Custom class</A>)).not.toThrow();
    expect(screen.getByText("Custom class").closest(".a.custom-class")).not.toBeNull();
  });
});

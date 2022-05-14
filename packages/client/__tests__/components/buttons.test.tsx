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
    expect(() =>
      render(
        <Button id="class-name" className="test">
          Class name
        </Button>
      )
    ).not.toThrow();
    expect(document.getElementById("class-name")).toHaveClass("test");
  });

  it("`children` testing", () => {
    expect(() =>
      render(
        <>
          <Button id="no-children" />
          <Button id="have-children">Text</Button>
        </>
      )
    ).not.toThrow();

    expect(document.getElementById("no-children")).toHaveClass("p-1.5");

    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(document.getElementById("have-children")).not.toHaveClass("p-1.5");
  });
});

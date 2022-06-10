import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

import Nav from "~/client/components/docs/navbar";

import { NavData } from "~/types/docs.type";

jest.mock("next/router", () => require("next-router-mock"));

const navData: NavData = {
  "hello-world": "Hello, world",
  "a-route-with-subpages": {
    sectionTitle: "A route with subpages",
    pages: {
      "a-subpage": "A subpage",
      "another-subpage": "Another subpage",
    },
  },
};

describe("Documentation navigation pane tests", () => {
  it("Render links", () => {
    render(<Nav navData={navData} />);
    expect(screen.getByText("Hello, world")).toHaveAttribute("href", "/docs/hello-world");
    expect(screen.getByText("Another subpage")).toHaveAttribute(
      "href",
      "/docs/a-route-with-subpages/another-subpage"
    );
  });

  it("Highlight current page", () => {
    mockRouter.setCurrentUrl("/docs/a-route-with-subpages/a-subpage");
    render(<Nav navData={navData} />);
    expect(screen.getByText("Hello, world")).toHaveClass("text-muted");
    expect(screen.getByText("A subpage")).toHaveClass("text-primary");
  });
});

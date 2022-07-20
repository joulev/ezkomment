import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

import Nav from "~/client/components/docs/navbar";

import { NavData } from "~/types/client/docs.type";

jest.mock("next/router", () => require("next-router-mock"));

const navData: NavData = {
  directory: {
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
    expect(screen.getByText("Another subpage")).toHaveAttribute(
      "href",
      "/docs/directory/another-subpage"
    );
  });

  it("Highlight current page", () => {
    mockRouter.setCurrentUrl("/docs/directory/a-subpage");
    render(<Nav navData={navData} />);
    expect(screen.getByText("A subpage")).toHaveClass("text-primary");
    expect(screen.getByText("Another subpage")).toHaveClass("text-muted");
  });
});

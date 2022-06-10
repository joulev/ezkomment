import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { FC, ReactNode } from "react";

import BreakpointContext from "~/client/context/breakpoint";
import { useBreakpointInit } from "~/client/hooks/breakpoint";
import setupMediaViewport from "~/client/lib/tests/setupMediaViewport";

import Nav from "~/client/components/navbar";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("Test home navbar behaviour when clicking on the button", () => {
  it("Scroll to top if at /", async () => {
    window.scrollTo = jest.fn();
    mockRouter.setCurrentUrl("/");
    const user = userEvent.setup();

    expect(() => render(<Nav />)).not.toThrow();

    const logo = document.getElementsByClassName("logo-width")[0];
    expect(logo).toBeInTheDocument();

    expect(logo).not.toHaveAttribute("href");
    await user.click(logo);
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it("Navigate to / if not at /", async () => {
    mockRouter.setCurrentUrl("/something");
    const user = userEvent.setup();

    expect(() => render(<Nav />)).not.toThrow();

    const logo = document.getElementsByClassName("logo-width")[0];
    expect(logo).toBeInTheDocument();

    expect(logo).toHaveAttribute("href", "/");
    await user.click(logo);
    expect(mockRouter.pathname).toBe("/");
  });
});

describe("Test home navbar display on different positions", () => {
  it("Should not be displayed if and only if scrollTop is too small", () => {
    expect(() => render(<Nav />)).not.toThrow();
    const container = document.getElementsByClassName("container")[0];
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("h-0");
    fireEvent.scroll(window, { target: { scrollY: 300 } });
    expect(container).toHaveClass("h-0");
    fireEvent.scroll(window, { target: { scrollY: 301 } });
    expect(container).not.toHaveClass("h-0");
    expect(container).toHaveClass("h-18");
  });
});

const Document: FC<{ children: ReactNode }> = ({ children }) => {
  const breakpoint = useBreakpointInit();
  return <BreakpointContext.Provider value={breakpoint}>{children}</BreakpointContext.Provider>;
};

const Page: FC = () => (
  <Document>
    <Nav />
  </Document>
);

describe("Test home navbar display on different viewports", () => {
  it("Hide button text on small viewports", () => {
    setupMediaViewport(100);
    expect(() => render(<Page />)).not.toThrow();
    expect(screen.queryByText("Get started")).toBeNull();
  });

  it("Show button text on large viewport", () => {
    setupMediaViewport(1000);
    expect(() => render(<Page />)).not.toThrow();
    expect(screen.getByText("Get started")).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { FC, ReactNode } from "react";

import BreakpointContext from "~/old/client/context/breakpoint";
import { useBreakpointInit } from "~/old/client/hooks/breakpoint";
import setupMediaViewport from "~/old/client/lib/tests/setupMediaViewport";

import Nav from "~/old/client/components/navbar";

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
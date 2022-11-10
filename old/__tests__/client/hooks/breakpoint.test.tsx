import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FC, ReactNode } from "react";

import theme from "~/config/tailwindTheme";

import BreakpointContext from "~/old/client/context/breakpoint";
import useBreakpoint, { useBreakpointInit } from "~/old/client/hooks/breakpoint";
import setupMediaViewport from "~/old/client/lib/tests/setupMediaViewport";

const Document: FC<{ children: ReactNode }> = ({ children }) => {
  const breakpoint = useBreakpointInit();
  return <BreakpointContext.Provider value={breakpoint}>{children}</BreakpointContext.Provider>;
};

const Component: FC = () => {
  const breakpoint = useBreakpoint();
  return <div data-testid="breakpoint">{breakpoint}</div>;
};

const Page: FC = () => (
  <Document>
    <Component />
  </Document>
);

const screens = theme!.screens as { [key: string]: string };
const breakpoints = Object.entries(screens).map(([breakpoint, width]) => ({
  breakpoint,
  width: parseInt(width),
}));

describe("`breakpoint` integration test", () => {
  it("Test value on load based on viewport width", () => {
    setupMediaViewport(500); // xs
    render(<Page />);
    expect(screen.getByTestId("breakpoint")).toHaveTextContent("xs");
    document.body.innerHTML = "";

    for (const { breakpoint, width } of breakpoints) {
      setupMediaViewport(width);
      render(<Page />);
      expect(screen.getByTestId("breakpoint")).toHaveTextContent(breakpoint);
      document.body.innerHTML = "";
    }
  });
});

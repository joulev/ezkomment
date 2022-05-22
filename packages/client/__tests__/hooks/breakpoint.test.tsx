import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FC, ReactNode } from "react";

import theme from "@client/config/tailwindTheme";
import BreakpointContext from "@client/context/breakpoint";
import useBreakpoint, { useBreakpointInit } from "@client/hooks/breakpoint";

function queryMatchesCurrentWidth(query: string, currentWidth: number) {
  const regexp = /^\(min-width:\s(\d+)px\)$/g;
  const matches = query.match(regexp);
  if (!matches) return false;
  const queryValue = parseInt(matches[0].replace(regexp, "$1"));
  return currentWidth >= queryValue;
}

/**
 * @see https://stackoverflow.com/a/53449595
 */
function setupMedia(currentWidth: number) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: queryMatchesCurrentWidth(query, currentWidth),
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

describe("Test this test's setup functions `setupMedia` and `queryMatchesCurrentWidth`", () => {
  it("Never thought I'd see a test for another test", () => {
    setupMedia(800);
    expect(window.matchMedia("(min-width: 800px)").matches).toBeTruthy();
    expect(window.matchMedia("(min-width: 801px)").matches).toBeFalsy();
  });
});

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

const screens = theme.screens as { [key: string]: string };
const breakpoints = Object.entries(screens).map(([breakpoint, width]) => ({
  breakpoint,
  width: parseInt(width),
}));

describe("`breakpoint` integration test", () => {
  it("Test value on load based on viewport width", () => {
    setupMedia(500); // xs
    render(<Page />);
    expect(screen.getByTestId("breakpoint")).toHaveTextContent("xs");
    document.body.innerHTML = "";

    breakpoints.forEach(({ breakpoint, width }) => {
      setupMedia(width);
      render(<Page />);
      expect(screen.getByTestId("breakpoint")).toHaveTextContent(breakpoint);
      document.body.innerHTML = "";
    });
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, ReactNode } from "react";

import ModeContext from "@client/context/mode";
import useTheme, { useMode, useModeInit } from "@client/hooks/theme";

import ModeSwitcher from "@client/components/modeSwitcher";

/**
 * @see https://stackoverflow.com/a/53449595
 */
function setupMedia(systemTheme: "light" | "dark") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: systemTheme === "dark", // we will use window.matches("match dark")
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

const Document: FC<{ children: ReactNode }> = ({ children }) => {
  const { mode, setMode } = useModeInit();
  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
};

const Component: FC = () => {
  const { mode } = useMode();
  const theme = useTheme();
  return (
    <>
      <div id="mode">{mode}</div>
      <div id="theme">{theme}</div>
      <ModeSwitcher />
    </>
  );
};

const Page: FC = () => (
  <Document>
    <Component />
  </Document>
);

describe("Theme/mode integration test", () => {
  it("Theme test for switch mode buttons", async () => {
    setupMedia("light");
    const user = userEvent.setup();
    render(<Page />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);

    const lightButton = buttons[0];
    const darkButton = buttons[1];
    const systemButton = buttons[2];
    const curMode = () => document.getElementById("mode")!.textContent;
    const curTheme = () => document.getElementById("theme")!.textContent;

    await user.click(lightButton);
    expect(curMode()).toBe("light");
    expect(curTheme()).toBe("light");

    await user.click(darkButton);
    expect(curMode()).toBe("dark");
    expect(curTheme()).toBe("dark");

    await user.click(systemButton);
    expect(curMode()).toBe("system");
    expect(curTheme()).toBe("light");
  });

  it("Theme test for system mode = light", async () => {
    setupMedia("light");
    render(<Page />);
    expect(document.getElementById("mode")!.innerHTML).toBe("system");
    expect(document.getElementById("theme")!.innerHTML).toBe("light");
  });

  it("Theme test for system mode = dark", async () => {
    setupMedia("dark");
    render(<Page />);
    expect(document.getElementById("mode")!.innerHTML).toBe("system");
    expect(document.getElementById("theme")!.innerHTML).toBe("dark");
  });
});

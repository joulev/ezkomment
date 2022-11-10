import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC } from "react";

import { endProgress, startProgress } from "~/old/client/lib/nprogress";

const Component: FC = () => (
  <div>
    <button onClick={startProgress}>Start</button>
    <button onClick={endProgress}>End</button>
  </div>
);

describe("Test `nprogress` hooks", () => {
  beforeEach(() => {
    render(<Component />);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("Interaction with `startProgress` and `endProgress` triggers", async () => {
    const bar = () => document.getElementsByClassName("bar")[0] as HTMLElement;
    const barNegMargin = () => parseFloat(bar().style.marginLeft);
    const user = userEvent.setup();

    expect(document.getElementById("nprogress")).toBeNull();

    await user.click(screen.getByText("Start"));
    expect(bar()).toBeInTheDocument();
    let prevMargin = barNegMargin();

    await user.click(screen.getByText("Start"));
    expect(bar()).toBeInTheDocument();
    expect(barNegMargin()).toBeGreaterThan(prevMargin);
    prevMargin = barNegMargin();

    await user.click(screen.getByText("Start"));
    expect(bar()).toBeInTheDocument();
    expect(barNegMargin()).toBeGreaterThan(prevMargin);

    await user.click(screen.getByText("End"));
    waitFor(() => expect(bar()).not.toBeInTheDocument());
  });
});

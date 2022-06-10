import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Link from "next/link";
import { FC } from "react";

import useNProgress, { endProgress, startProgress } from "~/hooks/nprogress";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

const Component: FC = () => {
  useNProgress();
  return (
    <div>
      <Link href="/">
        <a>Link</a>
      </Link>
      <button onClick={startProgress}>Start</button>
      <button onClick={endProgress}>End</button>
    </div>
  );
};

describe("Test `nprogress` hooks", () => {
  beforeEach(() => {
    render(<Component />);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("Interaction with `next/link`", async () => {
    const progressContainer = () => document.getElementById("nprogress");
    const user = userEvent.setup();

    expect(progressContainer()).toBeNull();
    await user.click(screen.getByText("Link"));
    expect(progressContainer()).not.toBeNull();
    waitFor(() => expect(progressContainer()).toBeNull());
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

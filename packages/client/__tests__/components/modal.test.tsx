import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "@client/components/modal";

describe("Modal component", () => {
  it("`isVisible` testing", () => {
    expect(() =>
      render(
        <>
          <Modal id="not-shown">Not shown</Modal>
          <Modal id="shown" isVisible>
            Shown
          </Modal>
        </>
      )
    ).not.toThrow();

    expect(screen.getByText("Not shown")?.closest(".opacity-0")).not.toBeNull();
    expect(screen.getByText("Shown")?.closest(".opacity-0")).toBeNull();
  });

  it("`onOutsideClick` testing", async () => {
    const onOutsideClick = jest.fn();
    const user = userEvent.setup();

    expect(() =>
      render(
        <>
          <div>Outside text</div>
          <Modal id="main" isVisible onOutsideClick={onOutsideClick}>
            Test
          </Modal>
        </>
      )
    ).not.toThrow();

    expect(onOutsideClick).not.toHaveBeenCalled();
    await user.click(screen.getByText("Test"));
    expect(onOutsideClick).toHaveBeenCalledTimes(0);
    await user.click(document.getElementById("main")?.parentElement ?? document.body);
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });
});

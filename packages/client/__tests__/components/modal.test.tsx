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

    // We use .parentElement since the `id` is applied to the modal, but we are checking the
    // class list of the backdrop.
    //
    // Safari is really the new IE here... it doesn't support `<dialog>` and everything that goes
    // with it, until v15.4
    expect(document.getElementById("not-shown")?.parentElement).toHaveClass(
      "pointer-events-none opacity-0"
    );
    expect(document.getElementById("shown")?.parentElement).not.toHaveClass("pointer-events-none");
    expect(document.getElementById("shown")?.parentElement).toHaveClass("opacity-100");
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

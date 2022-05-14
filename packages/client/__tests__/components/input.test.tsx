import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Icon from "@mui/icons-material/AbcOutlined";

// anything is fine actually
import Input, { InputDetachedLabel } from "@client/components/forms/input";

describe("Input component", () => {
  it("`label` tests", async () => {
    const user = userEvent.setup();

    expect(() => render(<Input label="Input" type="text" />)).not.toThrow();
    expect(screen.getByText("Input")).toBeInTheDocument();

    await user.click(screen.getByText("Input"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("`onUpdate` tests", async () => {
    const onUpdate = jest.fn();
    const str = "test";
    const user = userEvent.setup();

    expect(() => render(<Input label="Input" type="text" onUpdate={onUpdate} />)).not.toThrow();

    await user.type(screen.getByRole("textbox"), str);
    expect(onUpdate).toHaveBeenCalledWith(str);
  });

  it('Check for `type="color"`', () => {
    render(
      <>
        <Input label="Colour" type="color" />
        <Input label="Normal" type="text" />
      </>
    );
    expect(document.getElementsByTagName("input")[0]).toHaveClass("cursor-pointer");
    expect(document.getElementsByTagName("input")[1]).toHaveClass("cursor-text");
  });
});

describe("Input element with `detachedLabel`", () => {
  it('"Everything" tests', async () => {
    const user = userEvent.setup();

    expect(() =>
      render(<InputDetachedLabel label="Input" helpText="help" icon={Icon} type="text" />)
    ).not.toThrow();
    expect(screen.getByText("Input")).toBeInTheDocument();
    expect(screen.getByText("help")).toBeInTheDocument();

    await user.click(screen.getByRole("textbox"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});

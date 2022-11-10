import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from "~/old/client/components/forms/select";

describe("Select component", () => {
  it("`label` tests", async () => {
    const user = userEvent.setup();

    expect(() => render(<Select label="Input" />)).not.toThrow();

    await user.click(screen.getByText("Input"));
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("`onUpdate` tests", async () => {
    const onUpdate = jest.fn();
    const user = userEvent.setup();

    expect(() =>
      render(
        <Select label="Input" onUpdate={onUpdate} defaultValue="0">
          <option value="0" disabled>
            Default value
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
        </Select>
      )
    ).not.toThrow();

    await user.selectOptions(screen.getByRole("combobox"), ["0"]);
    expect(onUpdate).not.toHaveBeenCalled();

    await user.selectOptions(screen.getByRole("combobox"), ["1"]);
    expect(onUpdate).toHaveBeenCalledWith("1");

    await user.selectOptions(screen.getByRole("combobox"), ["2"]);
    expect(onUpdate).toHaveBeenCalledWith("2");

    await user.selectOptions(screen.getByRole("combobox"), ["0"]);
    expect(onUpdate).toBeCalledTimes(2);
  });
});

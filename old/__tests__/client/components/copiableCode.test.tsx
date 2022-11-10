import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CopiableCode from "~/old/client/components/copiableCode";

describe("Copiable code component", () => {
  it("Able to copy code", async () => {
    const str = "Hello, world!";
    const user = userEvent.setup();
    jest.spyOn(navigator.clipboard, "writeText");

    expect(() => render(<CopiableCode content={str} />)).not.toThrow();
    const button = screen.getByRole("button");

    expect(screen.queryByText("Copy")).not.toBeNull();
    expect(screen.queryByText("Copied")).toBeNull();

    await user.click(button);
    expect(screen.queryByText("Copy")).toBeNull();
    expect(screen.queryByText("Copied")).not.toBeNull();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(str);

    await waitFor(() => expect(screen.queryByText("Copy")).not.toBeNull(), { timeout: 1000 });
  });
});

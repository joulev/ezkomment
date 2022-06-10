import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SiteGraph from "~/client/components/siteGraph";

const totalComment = [
  39, 47, 50, 52, 56, 58, 61, 68, 72, 75, 81, 83, 85, 87, 88, 96, 97, 99, 104, 107, 108, 111, 112,
  113, 114, 115, 117, 119, 123, 132,
];
const newComment = [
  0, 1, 1, 0, 3, 4, 1, 3, 6, 6, 1, 4, 3, 4, 1, 6, 3, 1, 2, 4, 4, 3, 1, 3, 4, 0, 6, 0, 4, 1,
];

describe("Site graph component", () => {
  it("Snapshot testing", () => {
    const { container } = render(<SiteGraph totalComment={totalComment} newComment={newComment} />);
    expect(container).toMatchSnapshot();
  });

  it("Not showing graph annotation unless on hover", async () => {
    const user = userEvent.setup();
    render(<SiteGraph totalComment={totalComment} newComment={newComment} />);
    // for some reasons `.not.toBeVisible()` doesn't work. Jest bug?
    expect(screen.getByText("New comments:").closest(".opacity-0")).not.toBeNull();

    const rectToHover = document.getElementsByTagName("rect")[30]; // >= 30
    await user.hover(rectToHover);
    expect(screen.getByText("New comments:").closest(".opacity-0")).toBeNull();
    await user.unhover(rectToHover);
    expect(screen.getByText("New comments:").closest(".opacity-0")).not.toBeNull();
  });

  it("Correct graph annotation day description", async () => {
    const user = userEvent.setup();
    render(<SiteGraph totalComment={totalComment} newComment={newComment} />);

    await user.hover(document.getElementsByTagName("rect")[59]);
    expect(screen.queryByText("Today")).not.toBeNull();
    expect(screen.queryByText("Yesterday")).toBeNull();
    expect(screen.queryByText("2 days ago")).toBeNull();

    await user.hover(document.getElementsByTagName("rect")[58]);
    expect(screen.queryByText("Today")).toBeNull();
    expect(screen.queryByText("Yesterday")).not.toBeNull();
    expect(screen.queryByText("2 days ago")).toBeNull();

    await user.hover(document.getElementsByTagName("rect")[57]);
    expect(screen.queryByText("Today")).toBeNull();
    expect(screen.queryByText("Yesterday")).toBeNull();
    expect(screen.queryByText("2 days ago")).not.toBeNull();
  });
});

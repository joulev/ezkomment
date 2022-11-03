import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FC } from "react";

import BlogLayout from "~/client/layouts/blog";

import { Author } from "~/types/client/utils.type";

type Props = { authors?: Author[]; wordCount?: number };
const Component: FC<Props> = ({ authors, wordCount }) => (
  <BlogLayout
    title="A blog"
    authors={authors ?? [{ name: "Author", github: "joulev" }]}
    timestamp={new Date("2022-01-02")}
    seo={{
      title: "A blog",
      description: "A blog",
      image: "https://example.com/image.png",
      url: "https://example.com/blog",
    }}
  >
    {Array(wordCount ?? 301)
      .fill("hello")
      .join(" ")}
  </BlogLayout>
);

describe("Blog layout component", () => {
  it("Render", () => {
    render(<Component />);
    expect(screen.getAllByText("A blog")).not.toBeNull();
    expect(screen.getByText("Author")).toBeInTheDocument();
    expect(screen.getByText("@joulev")).toHaveAttribute("href", "https://github.com/joulev");
    expect(screen.getByText("2 January 2022")).toBeInTheDocument();
    expect(screen.getByText("2 mins read")).toBeInTheDocument();
    document.body.innerHTML = "";

    render(<Component authors={[{ name: "Author" }]} />);
    document.body.innerHTML = "";

    render(<Component wordCount={200} />);
    expect(screen.getByText("1 min read")).toBeInTheDocument();
    document.body.innerHTML = "";

    render(<Component wordCount={0} />);
    expect(screen.getByText("0 mins read")).toBeInTheDocument();
  });
});

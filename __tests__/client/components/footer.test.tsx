import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Footer from "~/client/components/footer";

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt }: { src: string; alt: string }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

describe("Footer component", () => {
  const oldEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnv };
  });
  afterEach(() => {
    process.env = oldEnv;
  });

  it("Should not show link to GitHub in dev build", () => {
    // @ts-ignore
    process.env.NODE_ENV = "development";
    render(<Footer />);
    expect(screen.getByTestId("git info").innerHTML).toBe("Development build");
  });
  it("Should have text 'unknown' if not in Vercel in prod build", () => {
    // @ts-ignore
    process.env.NODE_ENV = "production";
    render(<Footer />);
    expect(screen.getByTestId("git hash").innerHTML).toBe("unknown");
  });
  it("Should have link to git hash with label trimmed in prod build", () => {
    // @ts-ignore
    process.env.NODE_ENV = "production";
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA = "a1b2c3d4e5";
    render(<Footer />);
    expect(screen.getByTestId("git hash").innerHTML).toBe("a1b2c3d");
    expect(screen.getByTestId("git hash")).toHaveAttribute(
      "href",
      "https://github.com/joulev/ezkomment/commit/a1b2c3d4e5"
    );
  });
});

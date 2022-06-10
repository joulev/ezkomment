import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FC } from "react";

import useBuildId from "~/hooks/buildId";

const Component: FC = () => {
  const { hash, timestamp } = useBuildId();
  return (
    <>
      <div data-testid="hash">{hash}</div>
      <div data-testid="time">{timestamp}</div>
    </>
  );
};

const Document: FC = () => (
  <div>
    <Component />
    {/* Current `/aquamarine` route `__NEXT_DATA__` as of commit 9cfc649 on `prod` */}
    <script
      id="__NEXT_DATA__"
      type="application/json"
    >{`{"props":{"pageProps":{}},"page":"/aquamarine","query":{},"buildId":"9cfc649-1652449258","nextExport":true,"autoExport":true,"isFallback":false,"scriptLoader":[]}`}</script>
  </div>
);

describe("Test `buildId` hooks", () => {
  it("Test `buildId` hooks", () => {
    render(<Document />);
    expect(screen.getByTestId("hash")).toHaveTextContent("9cfc649");
    expect(screen.getByTestId("time")).toHaveTextContent("1652449258");
  });

  it("Test development mode", () => {
    jest.resetModules();
    // @ts-ignore
    process.env.NODE_ENV = "development";
    render(<Document />);
    expect(screen.getByTestId("hash")).toHaveTextContent("");
    expect(screen.getByTestId("time")).toHaveTextContent("0");
  });
});

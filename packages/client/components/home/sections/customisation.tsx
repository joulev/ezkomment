import { FC, useEffect, useRef, useState } from "react";

import useTheme from "@client/hooks/theme";
import generateCommentHTML from "@client/lib/generateCommentHTML";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import CodeBlock from "@client/components/home/codeblock";
import Section from "@client/components/home/section";
import Window from "@client/components/home/window";

import { all, comment, styles } from "@client/constants/sampleCommentCode";

function useIframe() {
  const [contentHeight, setContentHeight] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handler = async () => {
    if (iframeRef.current) {
      // Wait for the iframe to render? Without it, the height is 0 for about (shockingly) 70% of
      // the time. Yeap, neither 0% nor 100%. Never think what I do would depend on pure luck but
      // here we go.
      await new Promise(resolve => setTimeout(resolve, 50));
      setContentHeight(iframeRef.current.contentWindow?.document.body.clientHeight ?? 0);
    }
  };

  useEffect(() => {
    handler();
  }, [iframeRef]);

  useEffect(() => {
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return { contentHeight, iframeRef };
}

const Illustration: FC<{ codeHtml: string }> = ({ codeHtml }) => {
  const theme = useTheme();
  const { contentHeight, iframeRef } = useIframe();
  return (
    <div className="relative h-[480px]">
      <div className="absolute top-0 inset-x-0 scale-75 origin-top-left">
        <Window tabs={["index.html", "comment.html", "styles.css"]} activeTab={0}>
          <CodeBlock codeHtml={codeHtml} />
        </Window>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-6 rounded border border-card bg-card scale-75 origin-bottom-right pointer-events-none">
        <iframe
          srcDoc={generateCommentHTML(all, comment, styles, theme === "dark")}
          className="w-full"
          style={{ height: contentHeight }}
          ref={iframeRef}
        />
      </div>
      <svg width={61} height={106} className="absolute bottom-24 left-[3%] sm:left-[6%]">
        {["M 1 1 C 1 50 20 90 60 100", "M 40 105 L 60 100 L 47 84"].map((path, i) => (
          <path
            d={path}
            className="stroke-indigo-500"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            key={i}
          />
        ))}
      </svg>
    </div>
  );
};

const HomeCustomisation: FC<{ codeHtml: string }> = ({ codeHtml }) => (
  <Section illustration={<Illustration codeHtml={codeHtml} />}>
    <h2>Customising to your heart&apos;s content</h2>
    <p>
      You can change the look and feel of your comments section to your liking and your page&apos;s
      design: the HTML and CSS of the comment section can be completely customised. Also, dark mode
      is supported.
    </p>
    <p>
      The <A href="https://microsoft.github.io/monaco-editor">Monaco editor</A>, which also powers{" "}
      <A href="https://code.visualstudio.com">Visual Studio Code</A>, is provided to help you do
      almost anything you want.
    </p>
    <Button>Learn more</Button>
  </Section>
);

export default HomeCustomisation;

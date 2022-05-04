import { FC, useEffect, useRef, useState } from "react";
import { Prism } from "react-syntax-highlighter";

import useTheme from "@client/hooks/theme";
import generateCommentHTML from "@client/lib/generateCommentHTML";
import { comment, all as main, styles } from "@client/lib/sampleCommentCode";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";

import Section from "../section";
import Window from "../window";

const Illustration: FC = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current)
        setContentHeight(iframeRef.current.contentWindow?.document.body.scrollHeight ?? 0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-[480px]">
      <div className="absolute top-0 inset-x-0 scale-75 origin-top-left">
        <Window tabs={["index.html", "comment.html", "styles.css"]} activeTab={0}>
          <div className="overflow-x-auto no-scrollbar text-sm p-3">
            <Prism language="html" useInlineStyles={false} codeTagProps={{ style: undefined }}>
              {main}
            </Prism>
          </div>
        </Window>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-6 rounded border border-card bg-card scale-75 origin-bottom-right">
        <iframe
          srcDoc={generateCommentHTML(main, comment, styles, theme === "dark")}
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

const HomeCustomisation: FC = () => (
  <Section illustration={<Illustration />}>
    <h2 className="text-4xl">Customising to your heart&apos;s content</h2>
    <p>
      You can change the look and feel of your comments section to your liking and your page&apos;s
      design: the HTML and CSS of the comment section can be completely customised. Oh, and you can
      even have dark mode.
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

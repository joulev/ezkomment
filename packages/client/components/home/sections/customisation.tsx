import { FC } from "react";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import CodeBlock from "@client/components/home/codeblock";
import Section from "@client/components/home/section";
import Window from "@client/components/home/window";

const Illustration: FC<{ codeHtml: string }> = ({ codeHtml }) => {
  return (
    <Window tabs={["index.html", "comment.html", "styles.css"]} activeTab={0}>
      <CodeBlock codeHtml={codeHtml} />
    </Window>
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

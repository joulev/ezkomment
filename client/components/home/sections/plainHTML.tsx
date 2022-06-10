import { FC } from "react";

import Button from "~/client/components/buttons";
import CodeBlock from "~/client/components/home/codeblock";
import Section from "~/client/components/home/section";
import Window from "~/client/components/home/window";

const HomePlainHTML: FC<{ codeHtml: string }> = ({ codeHtml }) => (
  <Section
    illustration={
      <Window tabs={["index.html"]} activeTab={0}>
        <CodeBlock codeHtml={codeHtml} />
      </Window>
    }
  >
    <h2>Plain HTML is enough</h2>
    <p>
      You never have to worry about backend, server, anything. Simply add an{" "}
      <code>&lt;iframe&gt;</code> to your HTML and you&apos;re all set!
    </p>
    <p>
      Work out of the box for all tools and frameworks: Jekyll, React, Vue, you name it. Including
      plain HTML!
    </p>
    <Button>See it in action</Button>
  </Section>
);

export default HomePlainHTML;

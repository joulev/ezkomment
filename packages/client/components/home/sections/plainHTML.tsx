import { FC } from "react";

import Button from "@client/components/buttons";

import Section from "../section";
import Window from "../window";

const HomePlainHTML: FC<{ codeHtml: string }> = ({ codeHtml }) => (
  <Section
    illustration={
      <Window tabs={["index.html"]} activeTab={0}>
        <div className="overflow-x-auto no-scrollbar text-sm p-3">
          <pre>
            <code className="whitespace-pre" dangerouslySetInnerHTML={{ __html: codeHtml }} />
          </pre>
        </div>
      </Window>
    }
  >
    <h2 className="text-4xl">Plain HTML is enough</h2>
    <p>
      You never have to worry about backend, server, anything. Simply add an{" "}
      <code>&lt;iframe&gt;</code> to your HTML and you&apos;re all set!
    </p>
    <p>
      Work out of the box for all tools and frameworks: Jekyll, React, Vue, you name it. Heck, it
      even works for good old plain HTML.
    </p>
    <Button>See it in action</Button>
  </Section>
);

export default HomePlainHTML;

import { FC } from "react";
import { Prism as SyntaxHighlighter, createElement } from "react-syntax-highlighter";

import Button from "@client/components/buttons";

import Section from "../section";
import Window from "../window";

const code = `      <span>Last updated: 1 January 2022</span>
    </div>
  </section>
  <section id="comments">
    <iframe src="https://api.ezkomment.joulev.dev/..."></iframe>
  </section>
</article>
<footer class="footer">
  <div class="footer-left-column">`;

const HomePlainHTML: FC = () => (
  <Section
    illustration={
      <Window tabs={["index.html"]} activeTab={0}>
        <div className="overflow-x-auto text-sm p-3">
          <SyntaxHighlighter
            language="html"
            useInlineStyles={false}
            codeTagProps={{ style: undefined }}
            showLineNumbers
            startingLineNumber={146} // just a random line number
            wrapLines
            renderer={({ rows }) =>
              rows.map((node, i) =>
                createElement({
                  node: { ...node, properties: { className: i === 4 ? [] : ["ignored"] } },
                  stylesheet: {},
                  useInlineStyles: false,
                  key: i,
                })
              )
            }
          >
            {code}
          </SyntaxHighlighter>
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

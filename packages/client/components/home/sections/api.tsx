import { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Button from "@client/components/buttons";

import Section from "../section";
import Window from "../window";

const code = `> const res = await fetcher(url, { page: "873e276648d48e4fd1e1" });
undefined
> res.status
200
> const { comments } = await res.json();
undefined
> comments
[
  {
    author: "John Doe",
    timestamp: "2020-06-01T12:00:00.000Z",
    content: "This is a comment",
  },
  ...
]`;

const HomeApi: FC = () => (
  <Section
    illustration={
      <Window tabs={["node", "zsh"]} activeTab={0}>
        <div className="overflow-x-auto no-scrollbar text-sm p-3">
          <SyntaxHighlighter
            language="javascript"
            useInlineStyles={false}
            codeTagProps={{ style: undefined }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </Window>
    }
  >
    <h2 className="text-4xl">Powerful API for power users</h2>
    <p>
      With the powerful API provided, you can really do anything you want with the comments.
      Absolutely zero restrictions on your creativity, be it custom JavaScript, fetching additional
      resources, paginations, etc.
    </p>
    <p>
      It&apos;s even <em>more</em> powerful, feature-rich than the built-in tools above.
    </p>
    <Button>Learn more</Button>
  </Section>
);

export default HomeApi;

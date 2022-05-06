import { FC } from "react";

import Button from "@client/components/buttons";

import Section from "../section";
import Window from "../window";

const HomeApi: FC<{ codeHtml: string }> = ({ codeHtml }) => (
  <Section
    illustration={
      <Window tabs={["node", "zsh"]} activeTab={0}>
        <div className="overflow-x-auto no-scrollbar text-sm p-3">
          <pre>
            <code className="whitespace-pre" dangerouslySetInnerHTML={{ __html: codeHtml }} />
          </pre>
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

import { FC } from "react";

import Button from "~/components/buttons";
import CodeBlock from "~/components/home/codeblock";
import Section from "~/components/home/section";
import Window from "~/components/home/window";

const HomeApi: FC<{ codeHtml: string }> = ({ codeHtml }) => (
  <Section
    illustration={
      <Window tabs={["node", "zsh"]} activeTab={0}>
        <CodeBlock codeHtml={codeHtml} />
      </Window>
    }
  >
    <h2>Powerful API for power users</h2>
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

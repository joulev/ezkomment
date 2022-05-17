import { FC } from "react";

import Button from "@client/components/buttons";
import Section from "@client/components/home/section";

const HomeEnding: FC = () => (
  <Section>
    <h2 className="text-4xl">&hellip; and much more!</h2>
    <p>Why not join now to play with it yourself?</p>
    <div className="flex flex-col sm:flex-row gap-x-6 gap-y-3 justify-center">
      <Button href="/auth">Get started for free</Button>
      <Button variant="tertiary" href="/docs">
        Read the docs
      </Button>
    </div>
  </Section>
);

export default HomeEnding;

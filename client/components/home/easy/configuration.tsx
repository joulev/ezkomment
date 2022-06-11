import { FC } from "react";

import A from "~/client/components/anchor";

import ButtonLink from "../buttonLink";

const EasyConfiguration: FC = () => {
  return (
    <section className="container my-24 grid md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-9">
        <h2 className="my-0 font-black text-4xl lg:text-5xl">
          <span className="text-gradient from-red-500 to-orange-500">easy</span> configuration
        </h2>
        <div className="text-muted text-lg md:text-xl lg:text-2xl">
          Zero-configuration. Have a webpage ready?{" "}
          <span className="text-neutral-900 dark:text-neutral-100">
            Adding a fully functional comment section won&apos;t take more than two minutes.
          </span>{" "}
          And no, you don&apos;t have to worry about backend, infrastructure&hellip; ever.
        </div>
        <div>
          <ButtonLink href="/auth" className="from-red-500 to-orange-500">
            Create your first
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default EasyConfiguration;

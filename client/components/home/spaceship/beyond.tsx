import { FC } from "react";

import ButtonLink from "../buttonLink";

const BeyondTheBoundary: FC = () => (
  <div className="flex flex-col gap-9 my-48">
    <h2 className="my-0 font-black text-4xl lg:text-5xl text-gradient from-green-500 to-cyan-500">
      beyond the boundary
    </h2>
    <div className="text-muted text-lg md:text-xl lg:text-2xl">
      Want to use your custom renderer? Want to integrate the whole thing to your existing
      infrastructure? You should REST!{" "}
      <span className="text-neutral-900 dark:text-neutral-100">
        Simply fetch our RESTful API and you have everything in your app.
      </span>
    </div>
    <div>
      <ButtonLink className="from-green-500 to-cyan-500" href="https://google.com">
        Read the API specs
      </ButtonLink>
    </div>
  </div>
);

export default BeyondTheBoundary;

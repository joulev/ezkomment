import Image from "next/future/image";
import { FC } from "react";

import avatar from "~/public/avatar.svg";

const Author: FC = () => (
  <div className="flex flex-row gap-3 not-prose items-end leading-none">
    <Image src={avatar} alt="Avatar" className="w-12 h-12" />
    <div className="flex flex-col">
      <div className="font-semibold text-lg">John Doe</div>
      <div>
        <a
          href="https://twitter.com/home"
          className="text-sm text-neutral-500 hover:underline underline-offset-2"
        >
          @home
        </a>
      </div>
    </div>
  </div>
);

export default Author;

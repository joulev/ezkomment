import clsx from "clsx";
import Image from "next/future/image";
import Link from "next/link";
import { FC } from "react";

import logo from "~/public/logo-text.svg";

const Logo: FC = () => (
  <Link href="/">
    <a
      className={clsx(
        "relative inline-block after:absolute after:content-['demo'] after:left-full after:top-1.5 after:ml-2",
        "after:text-indigo-500 after:bg-indigo-100 dark:after:bg-indigo-800 dark:after:bg-opacity-50",
        "after:uppercase after:text-sm after:px-1.5 after:py-0.5"
      )}
    >
      <Image src={logo} alt="ezkomment" className="h-8 w-fit" />
    </a>
  </Link>
);

export default Logo;

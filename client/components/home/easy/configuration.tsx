import Image from "next/image";
import { FC } from "react";

import useTheme from "~/client/hooks/theme";

import createNewPage from "~/public/images/home/create-new-page.svg";
import createNewSite from "~/public/images/home/create-new-site.svg";
import sectionLiveDark from "~/public/images/home/section-live-dark.svg";
import sectionLiveLight from "~/public/images/home/section-live-light.svg";

import HomeSection from "../section";

const EasyConfiguration: FC = () => {
  const theme = useTheme();
  return (
    <HomeSection
      colourClass="from-red-500 to-orange-500"
      title="configuration"
      desc={
        <>
          Zero-configuration. Have a webpage ready?{" "}
          <span className="text-neutral-900 dark:text-neutral-100">
            Adding a fully functional comment section won&apos;t take more than two minutes.
          </span>{" "}
          And no, you don&apos;t have to worry about backend, infrastructure&hellip; ever.
        </>
      }
      button={{ href: "/auth", children: "Create your first" }}
      illustration={{
        isFirst: true,
        className: "flex flex-col gap-12",
        parts: [
          <div
            className="mx-auto"
            style={{ width: `${(234 * 100) / 645}%`, minWidth: 234 / 1.5 }}
            key="1"
          >
            <Image
              src={createNewSite}
              alt="Cursor clicking on a 'Create a new site' button"
              layout="responsive"
            />
          </div>,
          <div
            className="mx-auto"
            style={{ width: `${(243 * 100) / 645}%`, minWidth: 243 / 1.5 }}
            key="2"
          >
            <Image
              src={createNewPage}
              alt="Cursor clicking on a 'Create a new page' button"
              layout="responsive"
            />
          </div>,
          <div key="3">
            <Image
              src={theme === "dark" ? sectionLiveDark : sectionLiveLight}
              alt="Banner showing creating comment section is successful"
              layout="responsive"
            />
          </div>,
        ],
      }}
    />
  );
};

export default EasyConfiguration;

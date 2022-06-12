import Image from "next/image";
import { FC } from "react";

import useTheme from "~/client/hooks/theme";

import createNewPage from "~/public/images/home/create-new-page.svg";
import createNewSite from "~/public/images/home/create-new-site.svg";
import sectionLiveDark from "~/public/images/home/section-live-dark.svg";
import sectionLiveLight from "~/public/images/home/section-live-light.svg";

import HomeSection from "../section";

const EasyIntegration: FC = () => {
  const theme = useTheme();
  return (
    <HomeSection
      colourClass="from-yellow-600 to-lime-600"
      title="integration"
      desc={
        <>
          All you need to do then is to add the embedding HTML <code>{"<iframe>"}</code> tag to your
          webpage.
          <span className="text-neutral-900 dark:text-neutral-100">
            No need of complicated frameworks, good ol’ plain HTML can do!
          </span>
        </>
      }
      button={{ href: "/auth", children: "Embed now" }}
      illustration={{
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

export default EasyIntegration;

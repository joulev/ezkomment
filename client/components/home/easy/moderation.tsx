import Image from "next/image";
import { FC } from "react";

import useTheme from "~/client/hooks/theme";

import createNewPage from "~/public/images/home/create-new-page.svg";
import createNewSite from "~/public/images/home/create-new-site.svg";
import sectionLiveDark from "~/public/images/home/section-live-dark.svg";
import sectionLiveLight from "~/public/images/home/section-live-light.svg";

import HomeSection from "../section";

const EasyModeration: FC = () => {
  const theme = useTheme();
  return (
    <HomeSection
      colourClass="from-pink-500 to-violet-500"
      title="moderation"
      desc={
        <>
          Spam, hate speech? Unwanted comments? Never a problem.{" "}
          <span className="text-neutral-900 dark:text-neutral-100">
            You have full control over every comment you have, full stop.
          </span>
        </>
      }
      button={{ href: "https://google.com", children: "See how it works" }}
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

export default EasyModeration;

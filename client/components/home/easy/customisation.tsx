import Image from "next/image";
import { FC } from "react";

import useTheme from "~/client/hooks/theme";

import createNewPage from "~/public/images/home/create-new-page.svg";
import createNewSite from "~/public/images/home/create-new-site.svg";
import sectionLiveDark from "~/public/images/home/section-live-dark.svg";
import sectionLiveLight from "~/public/images/home/section-live-light.svg";

import HomeSection from "../section";

const EasyCustomisation: FC = () => {
  const theme = useTheme();
  return (
    <HomeSection
      firstOrLast="last"
      colourClass="from-cyan-500 to-blue-500"
      title="customisation"
      desc={
        <>
          Worried the comment section might not fit your design? Fret not.{" "}
          <span className="text-neutral-900 dark:text-neutral-100">
            Bring your CSS over and make the comment section completely yours.
          </span>
        </>
      }
      button={{ href: "https://google.com", children: "Check it out" }}
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

export default EasyCustomisation;

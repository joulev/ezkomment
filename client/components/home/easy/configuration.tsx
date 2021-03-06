import clsx from "clsx";
import { FC } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import Button from "~/client/components/buttons";
import CopiableCode from "~/client/components/copiableCode";

import HomeSection from "../section";

const EasyConfiguration: FC = () => (
  <HomeSection
    firstOrLast="first"
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
      className: "flex flex-col gap-12",
      parts: [
        <div key="1">
          <div className="w-fit mx-auto relative">
            <Button icon={AddOutlinedIcon}>Create a new site</Button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/cursor-pointer.svg"
              alt=""
              className="absolute left-2/3 top-2/3"
            />
          </div>
        </div>,
        <div key="1">
          <div className="w-fit mx-auto relative">
            <Button icon={AddOutlinedIcon}>Create a new page</Button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/cursor-pointer.svg"
              alt=""
              className="absolute left-2/3 top-2/3"
            />
          </div>
        </div>,
        <div
          key="3"
          className={clsx(
            "w-[calc(100%/0.9)] xl:w-full scale-90 xl:scale-100 -translate-x-[5%] xl:-translate-x-0",
            "bg-neutral-100 dark:bg-neutral-900 border rounded border-card p-6 flex flex-col gap-3"
          )}
        >
          <h3 className="my-0 font-semibold text-xl">Your comment section is live!</h3>
          <div>Copy the following iframe to add it to your webpage.</div>
          <CopiableCode content='<iframe src="https://ezkomment.joulev.dev/embed/...">' />
        </div>,
      ],
    }}
  />
);

export default EasyConfiguration;

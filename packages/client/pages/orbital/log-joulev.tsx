import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import { FC, Fragment, ReactNode, ReactNodeArray } from "react";
import reactStringReplace from "react-string-replace";

import getOgImage from "@client/lib/getOgImage";
import getProjectLogJoulev from "@client/lib/orbital/logJoulev";

import A from "@client/components/anchor";
import Banner from "@client/components/banner";
import BlogLayout from "@client/layouts/blog";

import { SeoProps } from "@client/types/components.type";
import { ProjectLog } from "@client/types/utils.type";
import { NextPageWithLayout } from "@client/types/utils.type";

import authors from "@client/constants/authors";

type Props = {
  lastUpdated: string;
  data: ProjectLog;
  seo: SeoProps;
};

// The following "parsers" are specific for joulev's project log only. For other logs, write different parsers.
// First time I actually do serious OOP in any programming languages and I think I did a decent job.
class ReplaceableReact {
  // Type React.ReactNodeArray is deprecated, however react-string-replace uses it so I have no choice.
  value: string | ReactNodeArray;
  constructor(value: string) {
    this.value = value;
  }
  replace(query: string | RegExp, cb: (match: string, index: number, offset: number) => ReactNode) {
    this.value = reactStringReplace(this.value, query, cb);
    return this;
  }
  replaceAll() {
    return this.replace(/(PR #[0-9]+)/g, (match, i) => (
      <Fragment key={match + i}>
        PR&nbsp;
        <A
          href={
            match === "PR #60024"
              ? "https://github.com/DefinitelyTyped/DefinitelyTyped/pull/60024"
              : `https://github.com/joulev/ezkomment/pull/${match.substring(4)}`
          }
        >
          {match.substring(3)}
        </A>
      </Fragment>
    ))
      .replace(/\[([0-9a-f]{7})\]/g, (match, i) => (
        <A key={match + i} href={`https://github.com/joulev/ezkomment/commit/${match}`}>
          <code>{match}</code>
        </A>
      ))
      .replace(/(https?:\/\/[a-z0-9\-\.\/]+)/g, (match, i) => (
        <A key={match + i} href={match}>
          {match}
        </A>
      )).value;
  }
}
const TableTime: FC<{ time: string }> = ({ time }) => (
  <>
    {time
      .split(",")
      .map(period => period.split("-").join(" – "))
      .join(" and ")}
  </>
);
const TableContent: FC<{ content: string }> = ({ content }) => (
  <>{new ReplaceableReact(content).replaceAll()}</>
);
const TableRemarks: FC<{ remarks: string }> = ({ remarks }) => {
  if (remarks[0] === "*") {
    return (
      <ul className="!ml-6">
        {remarks.split("\n").map((str, i, arr) => (
          <li key={i} className={clsx(i === arr.length - 1 && "!mb-0")}>
            {new ReplaceableReact(str.substring(2)).replaceAll()}
          </li>
        ))}
      </ul>
    );
  }
  return <>{new ReplaceableReact(remarks).replaceAll()}</>;
};

const ProjectLogJoulev: NextPageWithLayout<Props> = ({ lastUpdated, data }) => {
  return (
    <div className="flex flex-col gap-18">
      <div className="max-w-prose mx-auto">
        <Banner variant="warning" className="lg:hidden mb-6">
          It is recommended to view this page in a wider screen.
        </Banner>
        <p>
          This notes all activities that Vu Van Dung (
          <A href="https://github.com/joulev">@joulev</A>) does on the ezkomment project from the
          day it commences (12 March &ndash; the date of the first commit). Since all activities
          from 12 March to 7 May are not properly logged as they are done, the time spent on
          studying and playing with new technologies, as well as the time to make small fixes and
          improvements have to be merged to one entry. All other entries also have to be derived
          from the commit history.
        </p>
        <p>All activities from 7 May onwards are properly logged as they are done.</p>
        <p>
          Since the two project member live about 300km from each other during the summer,{" "}
          <abbr title="face-to-face">F2F</abbr> is not possible, and we choose instant messaging for
          all communications. Therefore during the summer, we have no direct meetings, whether
          online or offline, between the members.
        </p>
        <p className="text-muted mb-0">
          This page is{" "}
          <A href="https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration">
            updated daily
          </A>
          . Last updated at{" "}
          <time title={lastUpdated} className="font-bold">
            {format(parseISO(lastUpdated), "d MMMM y HH:mm:ss")}
          </time>
          .
        </p>
      </div>
      <div>
        <div className="border rounded border-card bg-card p-6 max-w-fit mx-auto">
          <div className="text-lg text-muted">Total hours spent</div>
          <div className="text-3xl text-center">{data.total}</div>
        </div>
      </div>
      <div className="overflow-x-scroll -my-3">
        <div className="grid grid-cols-24">
          <div className="col-span-3 font-bold p-3 pl-0">Dates (D/M)</div>
          <div className="col-span-8 font-bold p-3">Content</div>
          <div className="col-span-1 font-bold p-3">Hrs</div>
          <div className="col-span-12 font-bold p-3 pr-0">Remarks</div>
          {data.logs.map(({ time, content, hours, remarks }, index) => (
            <Fragment key={index}>
              <div className="col-span-3 p-3 border-t border-card pl-0">
                <TableTime time={time} />
              </div>
              <div className="col-span-8 p-3 border-t border-card">
                <TableContent content={content} />
              </div>
              <div className="col-span-1 p-3 border-t border-card">{hours}</div>
              <div className="col-span-12 p-3 border-t border-card pr-0">
                <TableRemarks remarks={remarks} />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const image = await getOgImage({ title: "Project Log for Vu Van Dung", label: "orbital" });
  const data = await getProjectLogJoulev();
  return {
    props: {
      lastUpdated: new Date().toISOString(),
      seo: {
        title: "Project Log for Vu Van Dung | ezkomment",
        description: "Project Log for Vu Van Dung during the 2022 NUS Orbital Program",
        url: "https://ezkomment.joulev.dev/orbital/log-joulev",
        image,
      },
      data,
    },
    revalidate: 24 * 60 * 60,
  };
};

ProjectLogJoulev.getLayout = (page, { seo, lastUpdated }) => (
  <BlogLayout
    title="Project Log for Vu Van Dung"
    authors={[authors.joulev]}
    timestamp={parseISO(lastUpdated)}
    seo={seo}
    container
  >
    {page}
  </BlogLayout>
);

export default ProjectLogJoulev;

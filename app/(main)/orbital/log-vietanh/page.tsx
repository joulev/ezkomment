import clsx from "clsx";
import { Fragment } from "react";
import md2html from "~/misc/markdown";
import A from "~/client13/components/anchor.client";
import Banner from "~/client13/components/banner";
import BlogLayout from "../components/blog";
import authors from "~/constants/authors";
import rawData from "./log.json";

function compileData() {
  return Promise.all(
    rawData.map(async ({ Remark, ...rest }) => ({
      ...rest,
      Remark: await Promise.all(Remark.map(async str => await md2html(str))),
    }))
  );
}

export default async function OrbitalLogVietanhPage() {
  const data = await compileData();
  return (
    <BlogLayout
      title="Project Log for Nguyen Viet Anh"
      authors={[authors.vietanh]}
      timestamp={new Date("2022-07-25")}
      container
    >
      <div className="flex flex-col gap-18">
        <div className="max-w-prose mx-auto">
          <Banner variant="warning" className="lg:hidden mb-6">
            It is recommended to view this page in a wider screen.
          </Banner>
          <p className="mb-0">
            This note all activities that Nguyen Viet Anh (
            <A href="https://github.com/VietAnh1010">@VietAnh1010</A>) does on ezkomment project.
            Note that activities before 14 May were not logged properly.
          </p>
        </div>
        <div>
          <div className="border rounded border-card bg-card p-6 max-w-fit mx-auto">
            <div className="text-lg text-muted">Total hours spent</div>
            <div className="text-3xl text-center">
              {data.reduce((acc, { Hrs }) => acc + Hrs, 0)}
            </div>
          </div>
        </div>
        <div className="overflow-x-scroll -my-3">
          <div className="grid grid-cols-24">
            <div className="col-span-3 font-bold p-3 pl-0">Dates (D/M)</div>
            <div className="col-span-8 font-bold p-3">Content</div>
            <div className="col-span-1 font-bold p-3">Hrs</div>
            <div className="col-span-12 font-bold p-3 pr-0">Remarks</div>
            {data.map(({ Date, Content, Hrs, Remark }, index) => (
              <Fragment key={index}>
                <div className="col-span-3 p-3 border-t border-card pl-0">{Date}</div>
                <div className="col-span-8 p-3 border-t border-card">{Content}</div>
                <div className="col-span-1 p-3 border-t border-card">{Hrs}</div>
                <div className="col-span-12 p-3 border-t border-card pr-0">
                  <ul className="!ml-6 post">
                    {Remark.map((str, i, arr) => (
                      <li
                        key={i}
                        className={clsx(i === arr.length - 1 && "!mb-0")}
                        dangerouslySetInnerHTML={{ __html: str }}
                      />
                    ))}
                  </ul>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}

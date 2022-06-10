import clsx from "clsx";
import { FC, Fragment } from "react";

import { comments } from "~/lib/client/generateCommentHTML";

import A from "~/components/anchor";
import Button from "~/components/buttons";
import CodeBlock from "~/components/home/codeblock";
import Section from "~/components/home/section";
import Window from "~/components/home/window";

const Illustration: FC<{ codeHtml: string }> = ({ codeHtml }) => {
  const inputCls =
    "bg-transparent ring-0 border border-card rounded px-3 py-1 placeholder:text-muted";
  return (
    <div className="relative h-[480px]">
      <div className="absolute top-0 inset-x-0 scale-75 origin-top-left">
        <Window tabs={["index.html", "comment.html", "styles.css"]} activeTab={0}>
          <CodeBlock codeHtml={codeHtml} />
        </Window>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-6 rounded border border-card bg-card scale-75 origin-bottom-right pointer-events-none">
        <hr className="mt-0 mb-4.5" />
        {comments.map(({ author, text, date }, index) => (
          <Fragment key={index}>
            <div className="flex flex-row justify-between mb-4.5">
              <div className="font-bold">{author}</div>
              <div className="text-muted">{date}</div>
            </div>
            <div>{text}</div>
            <hr className="my-4.5" />
          </Fragment>
        ))}
        <form onSubmit={() => false}>
          <div className="grid grid-cols-2 gap-4.5 mb-4.5">
            <input placeholder="Display name" className={inputCls} />
            <input placeholder="Email (optional)" className={inputCls} />
            <textarea placeholder="Content" className={clsx(inputCls, "col-span-full")} />
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-xs text-muted">Styling with Markdown is supported</div>
            <Button type="submit" className="ml-auto" disabled>
              Post
            </Button>
          </div>
        </form>
      </div>
      <svg width={61} height={106} className="absolute bottom-24 left-[3%] sm:left-[6%]">
        {["M 1 1 C 1 50 20 90 60 100", "M 40 105 L 60 100 L 47 84"].map((path, i) => (
          <path
            d={path}
            className="stroke-indigo-500"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            key={i}
          />
        ))}
      </svg>
    </div>
  );
};

const HomeCustomisation: FC<{ codeHtml: string }> = ({ codeHtml }) => (
  <Section illustration={<Illustration codeHtml={codeHtml} />}>
    <h2>Customising to your heart&apos;s content</h2>
    <p>
      You can change the look and feel of your comments section to your liking and your page&apos;s
      design: the HTML and CSS of the comment section can be completely customised. Also, dark mode
      is supported.
    </p>
    <p>
      The <A href="https://microsoft.github.io/monaco-editor">Monaco editor</A>, which also powers{" "}
      <A href="https://code.visualstudio.com">Visual Studio Code</A>, is provided to help you do
      almost anything you want.
    </p>
    <Button>Learn more</Button>
  </Section>
);

export default HomeCustomisation;

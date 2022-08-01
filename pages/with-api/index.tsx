import { Options } from "easymde";
import { formatDistanceToNowStrict } from "date-fns";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { FC, FormEventHandler, useCallback, useMemo, useState } from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import useSWR from "swr";

import Article from "~/components/article";
import Author from "~/components/author";

const URL = "https://ezkdev.joulev.dev/api/v1/comments/eIgBj1QQhG8VHT1V3joQ/VyQ2XqoUz4U5Gew4w2kv";

async function md2html(md: string) {
  const processor = remark().use(remarkHtml);
  const html = await processor.process(md);
  return html.toString();
}

async function fetcher(url: string) {
  const { data } = (await fetch(url).then(r => r.json())) as {
    data: { text: string; author: string | null; date: number }[];
  };
  return await Promise.all(
    data.map(async ({ text, ...rest }) => ({ ...rest, text: await md2html(text) }))
  );
}

const SimpleMDE = dynamic(import("react-simplemde-editor"), { ssr: false });

const Comments: FC = () => {
  const { data, mutate } = useSWR(URL, fetcher);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const onChange = useCallback((value: string) => setText(value), []);
  const options = useMemo<Options>(
    () => ({ spellChecker: false, status: false, minHeight: "72px" }),
    []
  );
  const submit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, text }),
    });
    setAuthor("");
    setText("");
    await mutate();
  };
  return (
    <section>
      <h2>Comments</h2>
      <div className="flex flex-col gap-6 not-prose">
        {!data && <>Fetching comments&hellip;</>}
        {data && data.length === 0 && <>No comments yet. Be the first to join the conversation.</>}
        {data &&
          data.length !== 0 &&
          data.map(({ text, author, date }, index) => (
            <div key={index} className="border border-['#ddd'] bg-white p-6">
              <div className="flex flex-row items-baseline gap-6 mb-3">
                <strong className="text-lg">{author}</strong>
                <time className="text-sm text-neutral-500">
                  {formatDistanceToNowStrict(new Date(date), { addSuffix: true })}
                </time>
              </div>
              <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          ))}
        <hr className="border-['#ddd']" />
        <form className="flex flex-col gap-6" onSubmit={submit}>
          <SimpleMDE
            placeholder="Your comment"
            value={text}
            onChange={onChange}
            options={options}
          />
          <div className="flex flex-row gap-6">
            <input
              type="text"
              placeholder="Your name"
              className="flex-1 bg-white border border-[#ddd] focus:outline-none px-4 py-2"
              value={author}
              onChange={event => setAuthor(event.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 border text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Page: NextPage = () => (
  <div className="bg-neutral-100 min-h-screen">
    <div className="py-24 px-8">
      <div className="w-full max-w-prose mx-auto prose dark:prose-invert prose-neutral text-base">
        <Article authorElement={Author} />
        <Comments />
      </div>
    </div>
  </div>
);

export default Page;

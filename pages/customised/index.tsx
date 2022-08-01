import clsx from "clsx";
import { NextPage } from "next";

import Article from "~/components/article";
import Author from "~/components/author";
import Comment from "~/components/comment";

const Page: NextPage = () => (
  <div className="bg-slate-100 min-h-screen">
    <div className="py-24 px-8">
      <div
        className={clsx(
          "w-full max-w-prose mx-auto prose dark:prose-invert prose-slate text-base",
          "font-['Supreme'] prose-h1:font-['Chubbo']"
        )}
      >
        <Article authorElement={Author} />
        <section>
          <h2>Comments</h2>
          <Comment ezkUrl="https://ezkomment.joulev.dev/embed/eIgBj1QQhG8VHT1V3joQ/QyvJ1h2qGsX0dOc53LwI" />
        </section>
      </div>
    </div>
  </div>
);

export default Page;

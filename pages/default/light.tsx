import { NextPage } from "next";

import Article from "~/components/article";
import Comment from "~/components/comment";
import { Author } from "~/components/variations/default";

const Page: NextPage = () => (
  <div className="bg-neutral-100 min-h-screen">
    <div className="py-24 px-8">
      <div className="w-full max-w-prose mx-auto prose dark:prose-invert prose-neutral text-base">
        <Article authorElement={Author} />
        <section>
          <h2>Comments</h2>
          <Comment ezkUrl="https://ezkomment.joulev.dev/embed/EtWkLUcKPYrz5k5ynb16/4JJxJZE1pdqBgTOOrP79" />
        </section>
      </div>
    </div>
  </div>
);

export default Page;

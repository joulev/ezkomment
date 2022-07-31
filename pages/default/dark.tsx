import { NextPage } from "next";

import Article from "~/components/article";
import Comment from "~/components/comment";
import { Author } from "~/components/variations/default";

const Page: NextPage = () => (
  <div className="bg-neutral-900 min-h-screen dark">
    <div className="py-24 px-8">
      <div className="w-full max-w-prose mx-auto prose dark:prose-invert prose-neutral text-base">
        <Article authorElement={Author} />
        <section>
          <h2>Comments</h2>
          <Comment ezkUrl="https://ezkomment.joulev.dev/embed/EtWkLUcKPYrz5k5ynb16/c6QU9zVBBPfL3H41zP8V?dark=1" />
        </section>
      </div>
    </div>
  </div>
);

export default Page;

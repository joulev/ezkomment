import Article from "~/components/article";
import Author from "~/components/author";
import Comment from "~/components/comment";

import { GetStaticProps, NextPage } from "~/types";

const Page: NextPage = () => (
  <div className="prose dark:prose-invert prose-neutral text-base">
    <Article authorElement={Author} />
    <section>
      <h2>Comments</h2>
      <Comment ezkUrl="https://ezkomment.joulev.dev/embed/EtWkLUcKPYrz5k5ynb16/c6QU9zVBBPfL3H41zP8V?dark=1" />
    </section>
  </div>
);

export const getStaticProps: GetStaticProps = () => ({
  props: {
    bgClass: "bg-neutral-900 dark",
    template: "default",
    darkMode: true,
    sourceURL: "https://github.com/joulev/ezkomment/blob/demo/pages/default/dark.tsx",
    title: "Default template (dark)",
  },
});

export default Page;

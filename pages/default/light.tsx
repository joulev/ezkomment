import Article from "~/components/article";
import Author from "~/components/author";
import Comment from "~/components/comment";

import { GetStaticProps, NextPage } from "~/types";

const Page: NextPage = () => (
  <div className="prose dark:prose-invert prose-neutral text-base">
    <Article authorElement={Author} />
    <section>
      <h2>Comments</h2>
      <Comment ezkUrl="https://ezkdev.joulev.dev/embed/EtWkLUcKPYrz5k5ynb16/4JJxJZE1pdqBgTOOrP79" />
    </section>
  </div>
);

export const getStaticProps: GetStaticProps = () => ({
  props: {
    bgClass: "bg-neutral-100",
    template: "default",
    darkMode: false,
    sourceURL: "https://github.com/joulev/ezkomment/blob/demo/pages/default/light.tsx",
    title: "Default template (light)",
  },
});

export default Page;

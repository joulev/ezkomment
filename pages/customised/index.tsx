import Article from "~/components/article";
import Author from "~/components/author";
import Comment from "~/components/comment";

import { GetStaticProps, NextPage } from "~/types";

const Page: NextPage = () => (
  <div className="prose dark:prose-invert prose-slate text-base font-['Supreme'] prose-h1:font-['Chubbo']">
    <Article authorElement={Author} />
    <section>
      <h2>Comments</h2>
      <Comment ezkUrl="https://ezkdev.joulev.dev/embed/eIgBj1QQhG8VHT1V3joQ/QyvJ1h2qGsX0dOc53LwI" />
    </section>
  </div>
);

export const getStaticProps: GetStaticProps = () => ({
  props: {
    bgClass: "bg-slate-100",
    template: { url: "https://github.com/joulev/ezkomment/blob/demo/templates/customised.html" },
    darkMode: false,
    sourceURL: "https://github.com/joulev/ezkomment/blob/demo/pages/customised/index.tsx",
    title: "Customised template",
  },
});

export default Page;

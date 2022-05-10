import { format } from "date-fns";
import { MDXProps } from "mdx/types";
import Head from "next/head";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

import A from "@client/components/anchor";
import Footer from "@client/components/footer";
import HomeNavbar from "@client/components/home/navbar";
import PostHeading from "@client/components/postheading";

import { Author } from "@client/types/utils.type";

import defaultAvatar from "@client/public/images/default-photo.svg";

type BlogLayoutProps = {
  title: string;
  authors: Author[];
  timestamp: Date;
  children: (props: MDXProps) => JSX.Element;
};

const AuthorCard: FC<Author> = ({ name, github }) => (
  <div className="flex flex-row gap-3 items-center">
    <Image
      src={github ? `https://avatars.githubusercontent.com/${github}` : defaultAvatar}
      alt="avatar"
      width={36}
      height={36}
      className="rounded-full"
    />
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-lg leading-3">{name}</div>
      {github && (
        <A
          href={`https://github.com/${github}`}
          className="text-sm text-muted hover:text-muted leading-3"
        >
          @{github}
        </A>
      )}
    </div>
  </div>
);

const BlogLayout: FC<BlogLayoutProps> = ({ title, authors, timestamp, children: Content }) => {
  const [minutesToRead, setMinutesToRead] = useState(0);
  useEffect(() => {
    const wordCnt = document.getElementsByClassName("post")[0].textContent?.split(" ").length ?? 0;
    setMinutesToRead(Math.round(wordCnt / 200));
  }, []);
  return (
    <>
      <Head>
        <title>{title} | ezkomment</title>
      </Head>
      <HomeNavbar />
      <header className="bg-card border-b border-card px-6 sm:px-10 py-24">
        <div className="mx-auto w-full lg:w-5/6 xl:w-4/5">
          <h1 className="text-5xl md:text-6xl font-extralight mb-12">{title}</h1>
          <div className="flex flex-col gap-12 md:flex-row md:justify-between">
            <div className="flex flex-col gap-6 md:flex-row md:gap-12">
              {authors.map((author, index) => (
                <AuthorCard key={index} {...author} />
              ))}
            </div>
            <div className="flex flex-col md:items-end">
              <span className="text-xl">{format(timestamp, "d MMMM y")}</span>
              <span className="text-muted">
                {minutesToRead} min{minutesToRead !== 1 && "s"} read
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="px-6 sm:px-10">
        <article className="mx-auto my-[72px] max-w-prose post blog">
          <Content
            components={{
              a: ({ ref, ...rest }) => <A {...rest} />,
              h1: props => <PostHeading {...props} level={1} />,
              h2: props => <PostHeading {...props} level={2} />,
              h3: props => <PostHeading {...props} level={3} />,
              h4: props => <PostHeading {...props} level={4} />,
              h5: props => <PostHeading {...props} level={5} />,
              h6: props => <PostHeading {...props} level={6} />,
            }}
          />
        </article>
      </main>
      <Footer className="px-6 sm:px-10" containerClasses="mx-auto w-full lg:w-5/6 xl:w-4/5" />
    </>
  );
};

export default BlogLayout;

import { format } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

import blogAnchors from "@client/lib/blogAnchors";

import A from "@client/components/anchor";
import Footer from "@client/components/footer";
import HomeNavbar from "@client/components/home/navbar";
import PostHeading from "@client/components/postHeading";

import { BlogLayoutProps } from "@client/types/components.type";
import { Author } from "@client/types/utils.type";

import defaultAvatar from "@client/public/images/default-photo.svg";
import logo from "@client/public/images/logo-text.svg";

const AuthorCard: FC<Author> = ({ name, github }) => (
  <div className="flex flex-row gap-3 items-center">
    <div className="rounded-full border border-indigo-500 dark:border-indigo-400 h-9 w-9 relative overflow-hidden">
      <Image
        src={github ? `https://avatars.githubusercontent.com/${github}` : defaultAvatar}
        alt="avatar"
        layout="fill"
      />
    </div>
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
  const anchors = blogAnchors(Content({})); // Yeap. <Content /> doesn't work here.
  return (
    <>
      <Head>
        <title>{title} | ezkomment</title>
      </Head>
      <HomeNavbar />
      <header className="bg-card border-b border-card px-6 sm:px-10 py-24 print:hidden">
        <div className="mx-auto w-full lg:w-5/6 xl:w-4/5">
          <A className="block w-[calc(397px*0.4)] mb-3" href="/">
            <Image src={logo} alt="logo" width={397} height={80} />
          </A>
          <h1 className="text-5xl md:text-6xl font-extralight mb-12 mt-0">{title}</h1>
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
          <h1 className="hidden print:block">{title}</h1>
          <PostHeading level={2} id="table-of-content">
            Table of Content
          </PostHeading>
          {/* TODO: Render anchors as a TOC */}
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

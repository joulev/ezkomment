import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

import A from "~/client/components/anchor";
import Footer from "~/client/components/footer";
import PublicNavbar from "~/client/components/navbar";
import Seo from "~/client/components/seo";

import { BlogLayoutProps } from "~/types/client/components.type";
import { Author } from "~/types/client/utils.type";

import defaultAvatar from "~/public/images/default-photo.svg";
import logo from "~/public/images/logo-text.svg";

const AuthorCard: FC<Author> = ({ name, github }) => (
  <div className="flex flex-row gap-3 items-center">
    <div className="rounded-full border border-indigo-500 dark:border-indigo-400 relative overflow-hidden">
      <Image
        src={github ? `https://avatars.githubusercontent.com/${github}` : defaultAvatar}
        alt="avatar"
        width={36}
        height={36}
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

const BlogLayout: FC<BlogLayoutProps> = ({
  title,
  authors,
  timestamp,
  seo,
  container,
  children,
}) => {
  const [minutesToRead, setMinutesToRead] = useState(0);
  useEffect(() => {
    const wordCnt = document.getElementsByClassName("post")[0].textContent!.split(" ").length;
    setMinutesToRead(Math.round(wordCnt / 200));
  }, []);
  return (
    <>
      <Seo {...seo} />
      <PublicNavbar />
      <header className="bg-card border-b border-card py-24">
        <div className="container">
          <A className="block logo-width" href="/">
            <Image src={logo} alt="logo" />
          </A>
          <h1 className="text-5xl md:text-6xl font-extralight mb-12 mt-9">{title}</h1>
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
      <main className="container">
        <article className={clsx("my-18 post blog", container || "max-w-prose mx-auto")}>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogLayout;

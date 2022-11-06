import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import { Author } from "~/constants/authors";
import A from "~/client13/components/anchor.client";
import ReadingTime from "./readingTime.client";
import logo from "~/client13/assets/logo-text.svg";
import defaultAvatar from "./default-photo.svg";

function AuthorCard({ name, github }: Author) {
  return (
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
}

export type Props = React.PropsWithChildren<{
  title: string;
  authors: Author[];
  timestamp: Date;
  /** Whether the post content should be full-width (`.container`) or limited-width (`.max-w-prose`) */
  container?: boolean;
}>;

export default function BlogLayout({ title, authors, timestamp, container, children }: Props) {
  return (
    <>
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
                <ReadingTime />
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
    </>
  );
}

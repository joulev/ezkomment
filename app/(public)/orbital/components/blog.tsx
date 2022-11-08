import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";
import { Author } from "~/constants/authors";
import A from "~/app/components/anchor.client";
import LogoText from "~/app/components/logo/logoText";
import ReadingTime from "./readingTime.client";

/**
 * @author Treer <gitlab.com/Treer>
 * @see {@link https://freesvg.org/users-profile-icon}
 * @note Slightly modified by Vu Van Dung to change the colour to match site colour theme
 */
function DefaultPhoto() {
  return (
    <svg version="1.1" width={36} height={36} viewBox="0 0 600 600">
      <defs>
        <clipPath id="circular-border">
          <circle cx="300" cy="300" r="280" />
        </clipPath>
        <clipPath id="avoid-antialiasing-bugs">
          <rect width="100%" height="498" />
        </clipPath>
      </defs>
      <circle cx="300" cy="300" r="280" fill="#64748B" clipPath="url(#avoid-antialiasing-bugs)" />
      <circle cx="300" cy="230" r="115" fill="#E2E8F0" />
      <circle cx="300" cy="550" r="205" fill="#E2E8F0" clipPath="url(#circular-border)" />
    </svg>
  );
}

function AuthorCard({ name, github }: Author) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <div className="rounded-full border border-indigo-500 dark:border-indigo-400 relative overflow-hidden">
        {github ? (
          <Image
            src={`https://avatars.githubusercontent.com/${github}`}
            alt="avatar"
            width={36}
            height={36}
          />
        ) : (
          <DefaultPhoto />
        )}
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
          <A href="/">
            <LogoText />
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

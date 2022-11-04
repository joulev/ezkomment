import ButtonLink from "../buttonLink";

export default function OpenSource() {
  return (
    <div className="flex flex-col gap-9 my-48">
      <h2 className="my-0 font-black text-4xl lg:text-5xl">
        <span className="text-gradient from-blue-500 to-violet-500">open source</span>, as it should
        be
      </h2>
      <div className="text-muted text-lg md:text-xl lg:text-2xl">
        <span className="text-neutral-900 dark:text-neutral-100">
          ezkomment is an NUS Orbital project.
        </span>{" "}
        All steps are documented and everything is available publicly.
      </div>
      <div className="flex flex-col items-start sm:flex-row gap-x-12 gap-y-6">
        <ButtonLink className="from-blue-500 to-violet-500" href="/new/orbital">
          Read more
        </ButtonLink>
        <ButtonLink
          className="from-blue-500 to-violet-500"
          href="https://github.com/joulev/ezkomment"
        >
          View the code
        </ButtonLink>
      </div>
    </div>
  );
}

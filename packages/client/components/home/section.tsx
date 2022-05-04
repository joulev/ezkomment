import { FC, ReactNode } from "react";

type SectionProps = { children: ReactNode; illustration?: ReactNode };

/**
 * A section in the home page. If an illustration is available, the section is displayed with the
 * content and the illustration side by side. Otherwise, the content is centered.
 *
 * @param props.illustration A React node used as the illustration for the section
 * @param props.children A React node used as the content of the section
 */
const Section: FC<SectionProps> = ({ illustration, children }) => (
  <section className="px-6 sm:px-10 my-48">
    {illustration ? (
      <div className="mx-auto w-full lg:w-5/6 xl:w-4/5 grid grid-cols-12 gap-y-9 lg:gap-x-12">
        <div className="order-last col-span-full lg:order-first lg:col-span-5">{children}</div>
        <div className="order-first col-span-full lg:order-last lg:col-span-7">
          <div className="w-full sm:w-7/8 md:w-3/4 lg:w-full mx-auto pointer-events-none">
            {illustration}
          </div>
        </div>
      </div>
    ) : (
      <div className="mx-auto w-full lg:w-5/6 xl:w-4/5 text-center">{children}</div>
    )}
  </section>
);

export default Section;

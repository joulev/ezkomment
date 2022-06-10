import { FC } from "react";

import { SectionProps } from "~/types/components.type";

/**
 * A section in the home page. If an illustration is available, the section is displayed with the
 * content and the illustration side by side. Otherwise, the content is centered.
 *
 * @param props.illustration A React node used as the illustration for the section
 * @param props.children A React node used as the content of the section
 */
const Section: FC<SectionProps> = ({ illustration, children }) => (
  <section className="container my-48">
    {illustration ? (
      <div className="grid grid-cols-12 gap-y-9 lg:gap-x-12 xl:gap-x-18">
        <div className="order-last col-span-full lg:order-first lg:col-span-5 xl:col-span-6 home-section">
          {children}
        </div>
        <div className="order-first col-span-full lg:order-last lg:col-span-7 xl:col-span-6">
          <div className="w-full sm:w-7/8 md:w-3/4 lg:w-full mx-auto">{illustration}</div>
        </div>
      </div>
    ) : (
      <div className="text-center home-section">{children}</div>
    )}
  </section>
);

export default Section;

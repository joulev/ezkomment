import Image from "next/image";
import { ComponentProps, FC, ReactNode } from "react";

type ImageProps = {
  src: ComponentProps<typeof Image>["src"];
  alt: string;
  width: number;
  height: number;
};

type SectionProps = { children: ReactNode; illustration?: ReactNode };

const Section: FC<SectionProps> = ({ children, illustration }) => (
  <section className="px-6 sm:px-10 my-48">
    {illustration ? (
      <div className="mx-auto w-full lg:w-5/6 xl:w-4/5 grid grid-cols-12 gap-y-9 lg:gap-x-12">
        <div className="order-last col-span-full lg:order-first lg:col-span-5">{children}</div>
        <div className="order-first col-span-full lg:order-last lg:col-span-7">{illustration}</div>
      </div>
    ) : (
      <div className="mx-auto w-full lg:w-5/6 xl:w-4/5 text-center">{children}</div>
    )}
  </section>
);

const SectionImage: FC<{ image: ImageProps; children: ReactNode }> = ({ image, children }) => (
  <Section
    illustration={
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-full mx-auto">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image layout="responsive" {...image} />
      </div>
    }
  >
    {children}
  </Section>
);

export { Section as default, SectionImage };

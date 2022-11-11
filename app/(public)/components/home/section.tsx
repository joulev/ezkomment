import clsx from "clsx";
import ButtonLink, { Props as ButtonLinkProps } from "./button-link";
import Illustration, { Props as IllustrationProps } from "./illustration.client";

export type Props = {
  colourClass: string;
  title: string;
  desc: React.ReactNode;
  button: Omit<ButtonLinkProps, "className">;
  firstOrLast?: IllustrationProps["firstOrLast"];
  illustration: IllustrationProps;
};

export default function HomeSection({
  colourClass,
  title,
  desc,
  button,
  firstOrLast,
  illustration,
}: Props) {
  return (
    <section className="container mt-24 mb-36 md:mt-36 md:mb-48 grid md:grid-cols-2 gap-x-18 gap-y-12">
      <div className="flex flex-col gap-9">
        <h2 className="my-0 font-black text-4xl lg:text-5xl">
          <span className={clsx("text-gradient", colourClass)}>easy</span>
          <br className="hidden md:block xl:hidden" /> {title}
        </h2>
        <div className="text-muted text-lg md:text-xl lg:text-2xl">{desc}</div>
        <div>
          <ButtonLink className={colourClass} {...button} />
        </div>
      </div>
      <Illustration firstOrLast={firstOrLast} {...illustration} />
    </section>
  );
}
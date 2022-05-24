import clsx from "clsx";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC } from "react";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";

import useTheme from "@client/hooks/theme";
import getOgImage from "@client/lib/getOgImage";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";
import Footer from "@client/components/footer";
import HomeNavbar from "@client/components/home/navbar";
import Seo from "@client/components/seo";

import { SeoProps } from "@client/types/components.type";
import { IconType } from "@client/types/utils.type";

import logoDark from "@client/public/images/orbital/logo-orbital-dark.svg";
import logoLight from "@client/public/images/orbital/logo-orbital-light.svg";

const lastUpdated = "12 May 2022";

type Props = {
  seo: SeoProps;
};

type SectionLinkProps = {
  icon: IconType;
  title: string;
  href: string;
  description: string;
  date: string;
};
const SectionLink: FC<SectionLinkProps> = ({ icon: Icon, title, href, description, date }) => (
  <A
    notStyled
    href={href}
    className={clsx(
      "rounded border border-card bg-card hover:border-neutral-700 dark:hover:border-neutral-300",
      "p-6 flex flex-col gap-6 transition"
    )}
  >
    <div className="flex flex-row gap-3 items-center">
      <span className="bg-neutral-100 dark:bg-neutral-900 rounded-full w-12 h-12 grid place-items-center flex-shrink-0">
        <Icon />
      </span>
      <span className="font-bold text-lg">{title}</span>
    </div>
    <div className="flex-grow">{description}</div>
    <div className="text-muted text-sm">{date}</div>
  </A>
);

const OrbitalHome: NextPage<Props> = ({ seo }) => {
  const theme = useTheme();
  return (
    <>
      <Seo {...seo} />
      <HomeNavbar />
      <header className="bg-card border-b border-card px-6 sm:px-10 py-24">
        <div className="mx-auto container text-center">
          <A className="mx-auto block w-[calc(801px/80*36)] max-w-full" href="/">
            <Image
              src={theme === "dark" ? logoDark : logoLight}
              alt="logo with orbital"
              width={801}
              height={80}
            />
          </A>
          <h1>
            <span className="text-indigo-500 font-bold">ezkomment</span> is an NUS Orbital&nbsp;2022
            project.
          </h1>
          <p className="text-xl font-light">
            This page includes all public information of ezkomment that is related to NUS
            Orbital&nbsp;2022.
          </p>
          <Button href="https://orbital.comp.nus.edu.sg" className="inline-block">
            Go to Orbital homepage
          </Button>
        </div>
      </header>
      <main className="container py-12 flex flex-col gap-18">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            ["Team name", "EzKomment"],
            ["Team number", "5007"],
            ["Achievement level", "Artemis"],
          ].map(([label, value]) => (
            <div key={label} className="text-center">
              <div className="text-muted text-lg">{label}</div>
              <div className="text-3xl">{value}</div>
            </div>
          ))}
        </div>
        <section>
          <h2 className="text-center">Registration and Lift-off</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionLink
              title="Proposal"
              description="The first description of the application, sent along with the Orbital application form."
              href="/orbital/proposal"
              icon={ArticleOutlinedIcon}
              date={"14 March 2022"}
            />
            <SectionLink
              title="Lift-off poster"
              description="First design of the poster, submitted during the lift-off stage."
              href="https://ezkomment.joulev.dev/images/orbital/liftoff-poster.png"
              icon={ImageOutlinedIcon}
              date={"11 May 2022"}
            />
            <SectionLink
              title="Lift-off video"
              description="The video submitted during the lift-off stage."
              href="https://drive.google.com/file/d/1wkvvl-EeYFRbqdmqBBfFu5B-NO_vVxFK/view?usp=drivesdk"
              icon={OndemandVideoOutlinedIcon}
              date={"11 May 2022"}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const image = await getOgImage({ title: "ezkomment @ NUS Orbital", label: "orbital" });
  return {
    props: {
      seo: {
        title: "Orbital | ezkomment",
        description:
          "ezkomment is an NUS Orbital project. This page includes all public information of ezkomment that is related to NUS Orbital 2022.",
        image,
        url: "https://ezkomment.joulev.dev/orbital",
      },
    },
  };
};

export default OrbitalHome;

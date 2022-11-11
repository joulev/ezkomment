import clsx from "clsx";
import { FileText, Code, Image as ImageIcon, Video, Icon } from "lucide-react";
import A from "~/app/components/anchor.client";
import Button from "~/app/components/buttons.client";
import LogoText from "~/app/components/logo/logo-text";

function LogoOrbital() {
  return (
    <div className="mx-auto inline-block">
      <A href="/" notStyled className="flex flex-row items-center gap-4.5">
        <LogoText className="sm:pr-4.5 sm:border-r sm:border-muted" />
        <span className="hidden sm:block text-2xl font-extralight">Orbital 2022</span>
      </A>
    </div>
  );
}

type SectionLinkProps = {
  icon: Icon;
  title: React.ReactNode;
  href: string;
  description?: string;
  date: string;
};
function SectionLink({ icon: Icon, title, href, description, date }: SectionLinkProps) {
  return (
    <A
      notStyled
      href={href}
      className={clsx(
        "rounded border border-card bg-card hover:border-muted p-6 flex flex-col gap-6 transition",
        description || "justify-between"
      )}
    >
      <div className="flex flex-row gap-3 items-center">
        <span className="bg-neutral-100 dark:bg-neutral-900 rounded-full w-12 h-12 grid place-items-center flex-shrink-0">
          <Icon />
        </span>
        <span className="font-bold text-lg">{title}</span>
      </div>
      {description && <div className="flex-grow">{description}</div>}
      <div className="text-muted text-sm">{date}</div>
    </A>
  );
}

export default function OrbitalPage() {
  return (
    <>
      <header className="bg-card border-b border-card px-6 sm:px-10 py-24">
        <div className="mx-auto container text-center">
          <LogoOrbital />
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionLink
              title="Proposal"
              description="The first description of the application, sent along with the Orbital application form."
              href="/orbital/proposal"
              icon={FileText}
              date="14 March 2022"
            />
            <SectionLink
              title="Lift-off poster"
              description="First design of the poster, submitted during the lift-off stage."
              href="/images/orbital/liftoff-poster.png"
              icon={ImageIcon}
              date="11 May 2022"
            />
            <SectionLink
              title="Lift-off video"
              description="The video submitted during the lift-off stage."
              href="/orbital/liftoff-video"
              icon={Video}
              date="11 May 2022"
            />
          </div>
        </section>
        <section>
          <h2 className="text-center">Milestone 1</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionLink
              title="README"
              description="The README, describing all information we have about the project."
              href="/orbital/ms1-readme"
              icon={FileText}
              date="27 May 2022"
            />
            <SectionLink
              title="Milestone 1 poster"
              description="Second version of the poster, submitted for Milestone 1."
              href="/images/orbital/ms1-poster.png"
              icon={ImageIcon}
              date="26 May 2022"
            />
            <SectionLink
              title="Milestone 1 video"
              description="Second version of the project video, submitted for Milestone 1."
              href="/orbital/ms1-video"
              icon={Video}
              date="27 May 2022"
            />
          </div>
        </section>
        <section>
          <h2 className="text-center">Milestone 2</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionLink
              title="README"
              description="The README, describing all information we have about the project."
              href="/orbital/ms2-readme"
              icon={FileText}
              date="25 June 2022"
            />
            <SectionLink
              title="Milestone 2 poster"
              description="Third version of the poster, submitted for Milestone 2."
              href="/images/orbital/ms2-poster.png"
              icon={ImageIcon}
              date="24 June 2022"
            />
            <SectionLink
              title="Milestone 2 video"
              description="Third version of the project video, submitted for Milestone 2."
              href="/orbital/ms2-video"
              icon={Video}
              date="27 June 2022"
            />
          </div>
        </section>
        <section>
          <h2 className="text-center">Milestone 3</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionLink
              title="README"
              description="The README, describing all information we have about the project."
              href="/orbital/ms3-readme"
              icon={FileText}
              date="25 July 2022"
            />
            <SectionLink
              title="Milestone 3 poster"
              description="Fourth version of the poster, submitted for Milestone 3."
              href="/images/orbital/ms3-poster.png"
              icon={ImageIcon}
              date="24 July 2022"
            />
            <SectionLink
              title="Milestone 3 video"
              description="Fourth version of the project video, submitted for Milestone 3."
              href="/orbital/ms3-video"
              icon={Video}
              date="25 July 2022"
            />
          </div>
        </section>
        <section>
          <h2 className="text-center">Splashdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SectionLink
              title="Splashdown poster"
              description="Final version of the poster"
              href="/images/orbital/splashdown-poster.png"
              icon={ImageIcon}
              date="12 August 2022"
            />
            <SectionLink
              title="Splashdown video"
              description="Final version of the project video"
              href="/orbital/splashdown-video"
              icon={Video}
              date="12 August 2022"
            />
            <SectionLink
              title="Splashdown source code"
              description="Source code of the application as of Splashdown"
              href="/orbital/splashdown-source"
              icon={Code}
              date="12 August 2022"
            />
          </div>
        </section>
        <section>
          <h2 className="text-center">Project Log</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionLink
              title={<>Vu Van Dung&apos;s Project&nbsp;Log</>}
              href="/orbital/log-joulev"
              icon={FileText}
              date="01 August 2022"
            />
            <SectionLink
              title={<>Nguyen Viet Anh&apos;s Project&nbsp;Log</>}
              href="/orbital/log-vietanh"
              icon={FileText}
              date="25 July 2022"
            />
          </div>
        </section>
      </main>
    </>
  );
}

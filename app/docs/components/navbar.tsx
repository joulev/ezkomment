import { Fragment } from "react";
import SidebarLink from "./sidebar-link.client";
import { NavData } from "../documentation";

export type Props = { navData: NavData };

export default function DocsNav({ navData }: Props) {
  return (
    <nav>
      {Object.entries(navData).map(([topLevel, data], i) => (
        <Fragment key={i}>
          <h2 className="text-sm uppercase tracking-widest font-normal mt-6 mb-3">
            {data.sectionTitle}
          </h2>
          {Object.entries(data.pages).map(([secondLevel, title], j) => (
            <SidebarLink key={j} href={`/docs/${topLevel}/${secondLevel}`}>
              {title}
            </SidebarLink>
          ))}
        </Fragment>
      ))}
    </nav>
  );
}
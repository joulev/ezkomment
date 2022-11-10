import { FC, Fragment } from "react";

import { NavData } from "~/old/types/client/docs.type";

import SidebarLink from "./sidebarlink";

const DocsNav: FC<{ navData: NavData }> = ({ navData }) => (
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

export default DocsNav;

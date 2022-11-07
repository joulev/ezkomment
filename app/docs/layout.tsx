import { navData } from "~/client/lib/documentation";
import DocsSidebar from "./components/sidebar.client";

export default function DocsLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <DocsSidebar navData={navData} />
      {children}
    </>
  );
}

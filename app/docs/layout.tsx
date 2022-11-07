import { navData } from "./documentation";
import DocsSidebar from "./components/sidebar.client";

export default function DocsLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <DocsSidebar navData={navData} />
      {children}
    </>
  );
}

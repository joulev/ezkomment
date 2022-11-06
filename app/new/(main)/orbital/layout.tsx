import PublicNavbar from "./components/publicNavbar";

export default function MainPublicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
}

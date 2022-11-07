import PublicNavbar from "./components/publicNavbar";

export default function OrbitalLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
}

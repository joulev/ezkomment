import PublicNavbar from "./components/public-navbar";

export default function OrbitalLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  );
}

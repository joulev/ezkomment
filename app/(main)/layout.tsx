import Footer from "./components/footer";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

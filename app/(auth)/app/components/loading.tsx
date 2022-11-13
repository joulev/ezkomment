import Footer from "~/app/(public)/components/footer";
import Navbar from "./navbar.client";

export default function Loading() {
  return (
    <>
      <Navbar type="others" />
      <div style={{ height: "10000px" }} />
      <Footer />
    </>
  );
}

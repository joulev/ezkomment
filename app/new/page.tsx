import Hero from "~/client13/components/home/hero";
import EasySections from "~/client13/components/home/easy";
import FinalSections from "~/client13/components/home/spaceship";
import Footer from "~/client13/components/footer";

export default function Page() {
  return (
    <>
      <Hero />
      <EasySections />
      <FinalSections />
      <Footer />
    </>
  );
}

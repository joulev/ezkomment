import Hero from "./components/home/hero";
import EasySections from "./components/home/easy";
import FinalSections from "./components/home/spaceship/index.client";

export default function IndexPage() {
  return (
    <>
      <Hero />
      <EasySections />
      <FinalSections />
    </>
  );
}

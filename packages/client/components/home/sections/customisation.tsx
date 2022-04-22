import { FC } from "react";

import A from "@client/components/anchor";
import Button from "@client/components/buttons";

import image from "@client/public/images/home/customisation.png";

import { SectionImage } from "../section";

const HomeCustomisation: FC = () => (
  <SectionImage image={{ src: image, alt: "Customisation", width: 1296, height: 1174 }}>
    <h2 className="text-4xl">Customising to your heart&apos;s content</h2>
    <p>
      You can change the look and feel of your comments section to your liking and your page&apos;s
      design: the HTML and CSS of the comment section can be completely customised. Oh, and you can
      even have dark mode.
    </p>
    <p>
      The <A href="https://microsoft.github.io/monaco-editor">Monaco editor</A>, which also powers{" "}
      <A href="https://code.visualstudio.com">Visual Studio Code</A>, is provided to help you do
      almost anything you want.
    </p>
    <Button>Learn more</Button>
  </SectionImage>
);

export default HomeCustomisation;

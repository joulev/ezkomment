import { FC } from "react";

import Button from "@client/components/buttons";

import image from "@client/public/images/home/iframe-sample.png";

import { SectionImage } from "../section";

const HomePlainHTML: FC = () => (
  <SectionImage image={{ src: image, alt: "Iframe sample", width: 1422, height: 682 }}>
    <h2 className="text-4xl">Plain HTML is enough</h2>
    <p>
      You never have to worry about backend, server, anything. Simply add an{" "}
      <code>&lt;iframe&gt;</code> to your HTML and you&apos;re all set!
    </p>
    <p>
      Work out of the box for all tools and frameworks: Jekyll, React, Vue, you name it. Heck, it
      even works for good old plain HTML.
    </p>
    <Button>See it in action</Button>
  </SectionImage>
);

export default HomePlainHTML;

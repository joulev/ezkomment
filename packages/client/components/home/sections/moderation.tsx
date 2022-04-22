import { FC } from "react";

import Button from "@client/components/buttons";

import image from "@client/public/images/home/moderation.png";

import { SectionImage } from "../section";

const HomeModeration: FC = () => (
  <SectionImage image={{ src: image, alt: "Moderation tool", width: 1058, height: 538 }}>
    <h2 className="text-4xl">Moderating your comments</h2>
    <p>
      Built-in moderation tool for your comments. All comments need to be manually approved by you
      before they go public.
    </p>
    <p>Think it&apos;s not worth the work? You can disable it at any time!</p>
    <Button>Learn more</Button>
  </SectionImage>
);

export default HomeModeration;

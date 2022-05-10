import { FC } from "react";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import Button from "@client/components/buttons";
import Comments from "@client/components/comments";
import Section from "@client/components/home/section";

const comments = [
  {
    author: "John Doe",
    date: "2020-01-01T00:00:00.000Z",
    text: "This is a nice article. However, I think the part about CSS is slightly misleading.",
  },
  {
    author: "ABC Tech Support",
    date: "2020-01-01T00:00:00.000Z",
    text: "WARNING your computer has been infected with a virus. please get help immediately by calling us at 0123456",
  },
];

const HomeModeration: FC = () => (
  <Section
    illustration={
      <Comments comments={comments}>
        <div className="flex flex-row gap-3">
          <Button icon={ClearOutlinedIcon} variant="tertiary" />
          <Button icon={CheckOutlinedIcon} />
        </div>
      </Comments>
    }
  >
    <h2 className="text-4xl">Moderating your comments</h2>
    <p>
      Built-in moderation tool for your comments. All comments need to be manually approved by you
      before they go public.
    </p>
    <p>Think it&apos;s not worth the work? You can disable it at any time!</p>
    <Button>Learn more</Button>
  </Section>
);

export default HomeModeration;

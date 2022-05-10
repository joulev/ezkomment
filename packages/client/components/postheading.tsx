import { FC } from "react";

import TagOutlinedIcon from "@mui/icons-material/TagOutlined";

import A from "@client/components/anchor";

import { PostHeadingProps } from "@client/types/components.type";

const PostHeading: FC<PostHeadingProps & { level: number }> = ({ level, id, children }) => {
  const HeadingTag: keyof JSX.IntrinsicElements = `h${level as 1 | 2 | 3 | 4 | 5 | 6}`;
  return (
    <HeadingTag id={id} className="relative group">
      {children}
      {level > 1 && (
        <A
          href={`#${id}`}
          className="absolute bottom-0 right-full pr-1 opacity-0 group-hover:opacity-100 transition"
        >
          <TagOutlinedIcon fontSize="small" />
        </A>
      )}
    </HeadingTag>
  );
};

export default PostHeading;

import { FC } from "react";

import TagOutlinedIcon from "@mui/icons-material/TagOutlined";

import A from "~/client/components/anchor";

import { PostHeadingProps } from "~/types/client/components.type";

const UpdatedLabel: FC = () => (
  <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded text-sm font-normal inline-block relative ml-3 bottom-0.5">
    updated
  </span>
);

const PostHeading: FC<PostHeadingProps & { level: number }> = ({ level, id, children }) => {
  const HeadingTag: keyof JSX.IntrinsicElements = `h${level as 1 | 2 | 3 | 4 | 5 | 6}`;
  return (
    <HeadingTag id={id} className="relative group">
      {typeof children === "string" && children.endsWith(" (updated)") ? (
        <>
          {children.substring(0, children.length - 10)}
          <UpdatedLabel />
        </>
      ) : (
        children
      )}
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

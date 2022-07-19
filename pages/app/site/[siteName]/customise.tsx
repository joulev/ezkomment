/**
 * I know the spacing in this page is different from the rest of the site, if not absolutely
 * terrible. However I have to sacrifice beauty for ease of use here: the config bar needs to
 * stay visible the whole time, and it shouldn't take lots of space.
 */
import Editor from "@monaco-editor/react";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";

import ColourOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";

import monacoOptions from "~/config/monaco";

import useAuth from "~/client/hooks/auth";
import useBreakpoint from "~/client/hooks/breakpoint";
import { useSite } from "~/client/hooks/site";
import useTheme from "~/client/hooks/theme";
import { internalFetcher, internalSWRGenerator } from "~/client/lib/fetcher";
import generatePreviewHTML from "~/client/lib/generatePreviewHTML";

import sitePages from "~/client/components/app/handleSite";
import BlankIllustration from "~/client/components/blankIllustration";
import Button from "~/client/components/buttons";
import Input from "~/client/components/forms/input";
import SideBySide from "~/client/components/sideBySide";
import IconLabel from "~/client/components/utils/iconAndLabel";
import RightAligned from "~/client/components/utils/rightAligned";

import { IconAndLabel, ResponseMessage as Msg, PreviewComment } from "~/types/client/utils.type";
import { SiteCustomisation } from "~/types/server";

const initialPreviewComments: PreviewComment[] = [
  {
    author: "John Doe",
    content: "This is a comment",
    date: "2018-01-01",
  },
  {
    content:
      "This is another comment *with markdown*. How about _italic_ too? And I also have `code` and\n\n* lists\n* of\n* items",
    date: "2018-01-02",
  },
];

type ButtonGroupProps = {
  buttons: (IconAndLabel & { onClick: () => void })[];
  active: number;
};
const ButtonGroup: FC<ButtonGroupProps> = ({ buttons, active }) => (
  <div
    className={clsx(
      "flex flex-row rounded border divide-x overflow-hidden",
      "border-card divide-card"
    )}
  >
    {buttons.map(({ label, icon, onClick }, index) => (
      <button
        key={index}
        onClick={active === index ? undefined : onClick}
        className={clsx(
          icon && !label ? "px-3" : "px-6",
          "py-1.5 transition",
          active === index
            ? "bg-indigo-500 text-white"
            : clsx(
                "bg-card text-muted",
                "hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
              )
        )}
      >
        <IconLabel {...{ icon, label }} />
      </button>
    ))}
  </div>
);

type AddCommentProps = {
  comments: PreviewComment[];
  setComments: (_: PreviewComment[]) => void;
};
const AddComment: FC<AddCommentProps> = ({ comments, setComments }) => {
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <h2 className="pt-6">Test comments</h2>
      <p>Here you can add comments for it to be rendered on the right.</p>
      <form
        className="flex flex-col gap-6 mb-6"
        onSubmit={event => {
          event.preventDefault();
          setComments([...comments, { author: author === "" ? undefined : author, date, content }]);
          setAuthor("");
          setDate("");
          setContent("");
        }}
      >
        <Input
          value={author}
          onUpdate={setAuthor}
          type="text"
          icon={PersonOutlinedIcon}
          placeholder="Author"
        />
        <Input
          value={date}
          onUpdate={setDate}
          type="text"
          icon={ScheduleOutlinedIcon}
          placeholder="Date"
          required
        />
        <textarea
          value={content}
          onChange={event => setContent(event.currentTarget.value)}
          placeholder="Content"
          className="bg-card border-card rounded border focus:ring-0 hover:border-muted focus:border-muted placeholder:text-muted"
          required
        ></textarea>
        <RightAligned>
          <Button>Add comment</Button>
        </RightAligned>
      </form>
      {comments.map(({ author, date, content }, index) => (
        <div key={index} className="py-6 border-t border-card flex flex-col gap-3">
          <div>
            <strong>Author:</strong> {author ?? <span className="text-muted">(not given)</span>}
          </div>
          <div>
            <strong>Date:</strong> {date}
          </div>
          <div>
            <div className="mb-1.5">
              <strong>Content:</strong>
            </div>
            <pre className="bg-card rounded border border-card p-3 w-full text-sm overflow-x-auto no-scrollbar">
              {content}
            </pre>
          </div>
          <div className="flex flex-row justify-end">
            <Button
              onClick={() => setComments(comments.filter((_, i) => i !== index))}
              variant="tertiary"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

type ContentProps = {
  initialHTML: string;
  submit: (html: string | undefined) => Promise<void>;
  msg: Msg;
};
const Content: FC<ContentProps> = ({ initialHTML, submit, msg }) => {
  const currentTheme = useTheme();
  const breakpoint = useBreakpoint();

  const [active, setActive] = useState(0);
  const [code, setCode] = useState<string | undefined>(initialHTML);

  const [comments, setComments] = useState(initialPreviewComments);
  const [previewBg, setPreviewBg] = useState("#ffffff");
  const [previewIsDark, setPreviewIsDark] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");

  useEffect(() => {
    (async () => {
      const html = await generatePreviewHTML(code ?? "", comments, previewIsDark);
      setPreviewHTML(html);
    })();
  }, [comments, code, previewIsDark]);

  return (
    <>
      <div
        className={clsx(
          "hidden lg:flex flex-row gap-6 items-center",
          "py-3 bg-neutral-100 dark:bg-neutral-900 sticky top-[49px] z-10"
        )}
      >
        <ButtonGroup
          buttons={[
            { label: "Code", onClick: () => setActive(0) },
            { label: "Comments", onClick: () => setActive(1) },
          ]}
          active={active}
        />
        <ButtonGroup
          buttons={[
            {
              icon: breakpoint === "lg" ? LightModeOutlinedIcon : undefined,
              label: breakpoint === "lg" ? undefined : "Light",
              onClick: () => {
                setPreviewIsDark(false);
                setPreviewBg("#ffffff");
              },
            },
            {
              icon: breakpoint === "lg" ? DarkModeOutlinedIcon : undefined,
              label: breakpoint === "lg" ? undefined : "Dark",
              onClick: () => {
                setPreviewIsDark(true);
                setPreviewBg("#000000");
              },
            },
          ]}
          active={previewIsDark ? 1 : 0}
        />
        <Input
          type="color"
          label="Preview Bg"
          icon={ColourOutlinedIcon}
          value={previewBg}
          onUpdate={setPreviewBg}
          className="w-48"
        />
        <div className="flex-grow" />
        {msg && msg.type === "success" && (
          <div className="text-sm text-emerald-500">{msg.message}</div>
        )}
        {msg && msg.type === "error" && <div className="text-sm text-red-500">{msg.message}</div>}
        <Button
          icon={DoneOutlinedIcon}
          disabled={initialHTML === code || !code}
          onClick={() => submit(code)}
        >
          Deploy
        </Button>
      </div>
      <div className="hidden lg:block mb-9">
        <SideBySide
          left={
            active === 0 ? (
              <Editor
                height="90vh"
                language="html"
                value={code}
                theme={currentTheme === "light" ? "light" : "vs-dark"}
                onChange={setCode}
                options={monacoOptions}
              />
            ) : (
              <AddComment comments={comments} setComments={setComments} />
            )
          }
          right={
            <div
              className="p-6 rounded border border-card h-full min-h-[90vh]"
              style={{ backgroundColor: previewBg }}
            >
              <iframe srcDoc={previewHTML} className="w-full h-full" />
            </div>
          }
        />
      </div>
    </>
  );
};

const ContentWrapper: FC = () => {
  const breakpoint = useBreakpoint();
  const { setLoading } = useAuth();
  const { site } = useSite();
  const { data, mutate } = useSWR(
    site ? `/api/sites/${site.id}/customisation` : null,
    internalSWRGenerator<SiteCustomisation>()
  );
  const [msg, setMsg] = useState<Msg>(null);

  const handleSubmit = async (html: string | undefined) => {
    if (!site || !html) return;
    setLoading(true);
    try {
      const { success } = await internalFetcher({
        url: `/api/sites/${site.id}/customisation`,
        method: "PUT",
        options: { body: JSON.stringify({ customisation: html }) },
      });
      if (!success) throw new Error("Failed to update customised HTML");
      await mutate({ customisation: html });
      setMsg({ type: "success", message: "Deployed successfully" });
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", message: "Deployment failed" });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!msg) return;
    const timeoutRef = setTimeout(() => setMsg(null), 3000);
    return () => clearTimeout(timeoutRef);
  }, [msg]);

  if (["xs", "sm", "md"].includes(breakpoint))
    return (
      <div className="flex flex-col gap-6 my-12 items-center">
        <div className="w-48">
          <BlankIllustration />
        </div>
        <div className="text-xl text-center">Oops! Your screen is too small.</div>
        <div>Please use a laptop or a device with a wider screen to use this feature.</div>
      </div>
    );

  if (!data || !site) return <Loading />;

  return <Content initialHTML={data.customisation} submit={handleSubmit} msg={msg} />;
};

const Loading: FC = () => (
  <>
    <div className="lg:hidden flex flex-col gap-6 my-12 items-center">
      <div className="w-48">
        <BlankIllustration />
      </div>
      <div className="text-xl text-center">Oops! Your screen is too small.</div>
      <div>Please use a laptop or a device with a wider screen to use this feature.</div>
    </div>
    <div
      className={clsx(
        "hidden lg:flex flex-row gap-6 items-center",
        "py-3 bg-neutral-100 dark:bg-neutral-900 sticky top-[49px] z-10"
      )}
    >
      <div className="h-9 w-72 pulse" />
      <div className="h-9 w-48 pulse" />
      <div className="h-9 w-36 pulse" />
      <div className="flex-grow" />
      <div className="h-9 w-24 pulse" />
      <div className="h-9 w-24 pulse" />
    </div>
    <div className="hidden lg:grid grid-cols-2 gap-6 mb-9">
      <div className="h-[90vh] pulse" />
      <div className="h-[90vh] pulse" />
    </div>
  </>
);

const SiteCustomise = sitePages({
  title: siteName => `Customise | ${siteName}`,
  activeTab: "customise",
  removePadding: true,
  Loading,
  Content: ContentWrapper,
});

export default SiteCustomise;

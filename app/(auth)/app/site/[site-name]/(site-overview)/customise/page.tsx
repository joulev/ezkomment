"use client";

/**
 * I know the spacing in this page is different from the rest of the site, if not absolutely
 * terrible. However I have to sacrifice beauty for ease of use here: the config bar needs to
 * stay visible the whole time, and it shouldn't take lots of space.
 */
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import clsx from "clsx";
import { startTransition, useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useSWR from "swr";
import { Palette, Sun, Moon, Check, Maximize, Minimize, User, Clock } from "lucide-react";
import { internalPut, internalSWRGenerator } from "~/app/(auth)/internal-fetch";
import { darkTheme, lightTheme, modifiedHTML, options } from "~/misc/config/monaco";
import { useBreakpoint } from "~/app/breakpoint";
import { useLoadingState } from "~/app/loading-state";
import { useSite } from "~/app/(auth)/app/site/[site-name]/site";
import { useSetToast } from "~/app/(auth)/toast";
import generatePreviewHTML, { PreviewComment } from "./generate-preview-HTML";
import BlankIllustration from "~/app/components/blank-illustration";
import Button from "~/app/components/buttons.client";
import Input from "~/app/components/forms/input";
import IconLabel, { IconAndLabel } from "~/app/components/utils/icon-label.client";
import RightAligned from "~/app/components/utils/right-aligned";
import SideBySide from "./components/side-by-side.client";
import { SiteTemplate } from "~/types/server";

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
function ButtonGroup({ buttons, active }: ButtonGroupProps) {
  return (
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
}

type AddCommentProps = {
  comments: PreviewComment[];
  setComments: (_: PreviewComment[]) => void;
};
function AddComment({ comments, setComments }: AddCommentProps) {
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
        <Input value={author} onUpdate={setAuthor} type="text" icon={User} placeholder="Author" />
        <Input
          value={date}
          onUpdate={setDate}
          type="text"
          icon={Clock}
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
}

type EditorProps = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
};
function Editor({ value, onChange }: EditorProps) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(match.matches);
    const listener = (event: MediaQueryListEvent) => setDark(event.matches);
    match.addEventListener("change", listener);
  }, []);
  function editorWillMount(monaco: Monaco) {
    monaco.editor.defineTheme("ezk-light", lightTheme);
    monaco.editor.defineTheme("ezk-dark", darkTheme);
    monaco.languages.register({ id: "ezk-html" });
    monaco.languages.setMonarchTokensProvider("ezk-html", modifiedHTML);
  }
  return (
    <MonacoEditor
      language="ezk-html"
      value={value}
      theme={dark ? "ezk-dark" : "ezk-light"}
      onChange={val => startTransition(() => onChange(val))}
      options={options}
      beforeMount={editorWillMount}
    />
  );
}

type ContentProps = {
  initialHTML: string;
  submit: (html: string | undefined) => Promise<void>;
  siteId: string;
};
type SavedConfig = {
  previewBg: string;
  previewIsDark: boolean;
  comments: PreviewComment[];
  code: string | undefined;
};
function Content({ initialHTML, submit, siteId }: ContentProps) {
  const breakpoint = useBreakpoint();
  const fullscreenHandle = useFullScreenHandle();

  const [active, setActive] = useState(0);
  const [code, setCode] = useState<string | undefined>(initialHTML);

  const [comments, setComments] = useState(initialPreviewComments);
  const [previewBg, setPreviewBg] = useState("#ffffff");
  const [previewIsDark, setPreviewIsDark] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");
  const [loadedFromLocalStorage, setLoadedFromLocalStorage] = useState(false);

  useEffect(() => {
    const configRaw = window.localStorage.getItem(`customise-config-${siteId}`);
    if (configRaw) {
      const config: SavedConfig = JSON.parse(configRaw);
      setPreviewBg(config.previewBg);
      setPreviewIsDark(config.previewIsDark);
      setComments(config.comments);
      setCode(config.code);
    }
    setLoadedFromLocalStorage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const html = await generatePreviewHTML(code ?? "", comments, previewIsDark);
      setPreviewHTML(html);
    })();
  }, [comments, code, previewIsDark]);

  useEffect(() => {
    if (!loadedFromLocalStorage) return;
    const config: SavedConfig = { previewBg, previewIsDark, comments, code };
    window.localStorage.setItem(`customise-config-${siteId}`, JSON.stringify(config));
  }, [previewBg, previewIsDark, comments, code, loadedFromLocalStorage, siteId]);

  return (
    <FullScreen
      handle={fullscreenHandle}
      className={clsx(fullscreenHandle.active && "px-3", "bg-neutral-100 dark:bg-neutral-900")}
    >
      <div
        className={clsx(
          "hidden lg:flex flex-row gap-6 items-center",
          "py-3 bg-neutral-100 dark:bg-neutral-900",
          fullscreenHandle.active || "sticky z-10 top-[49px]"
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
              icon: breakpoint === "lg" ? Sun : undefined,
              label: breakpoint === "lg" ? undefined : "Light",
              onClick: () => {
                setPreviewIsDark(false);
                setPreviewBg("#ffffff");
              },
            },
            {
              icon: breakpoint === "lg" ? Moon : undefined,
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
          icon={Palette}
          value={previewBg}
          onUpdate={setPreviewBg}
          className="w-48"
        />
        <div className="flex-grow" />
        <Button
          onClick={fullscreenHandle.active ? fullscreenHandle.exit : fullscreenHandle.enter}
          variant="tertiary"
          icon={fullscreenHandle.active ? Minimize : Maximize}
        />
        <Button
          icon={Check}
          disabled={initialHTML === code || !code}
          onClick={() =>
            submit(code).then(() => window.localStorage.removeItem(`customise-config-${siteId}`))
          }
        >
          Deploy
        </Button>
      </div>
      <div className="hidden lg:block mb-9">
        <SideBySide
          left={
            active === 0 ? (
              <div className={clsx(fullscreenHandle.active ? "h-screen pb-18" : "h-[90vh]")}>
                <Editor value={code} onChange={setCode} />
              </div>
            ) : (
              <div
                className={clsx(
                  fullscreenHandle.active && "h-screen pb-18 overflow-y-auto no-scrollbar"
                )}
              >
                <AddComment comments={comments} setComments={setComments} />
              </div>
            )
          }
          right={
            <div
              className={clsx(
                "p-6 rounded border border-card",
                fullscreenHandle.active ? "h-screen pb-24" : "h-full"
              )}
              style={{ backgroundColor: previewBg }}
            >
              <iframe srcDoc={previewHTML} className="w-full h-full" />
            </div>
          }
        />
      </div>
    </FullScreen>
  );
}

export default function AppSiteCustomisePage() {
  const { site } = useSite();
  const breakpoint = useBreakpoint();
  const { setLoading } = useLoadingState();
  const setToast = useSetToast();
  const { data, mutate } = useSWR(
    `/api/sites/${site.id}/template`,
    internalSWRGenerator<SiteTemplate>()
  );

  const handleSubmit = async (html: string | undefined) => {
    if (!site || !html) return;
    setLoading(true);
    try {
      const { success } = await internalPut(`/api/sites/${site.id}/template`, { template: html });
      if (!success) throw new Error("Failed to update template HTML");
      await mutate({ template: html });
      setToast({ type: "success", message: "Deployed successfully!" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Deployment failed." });
    }
    setLoading(false);
  };

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

  if (!data) return null;

  return <Content initialHTML={data.template} submit={handleSubmit} siteId={site.id} />;
}

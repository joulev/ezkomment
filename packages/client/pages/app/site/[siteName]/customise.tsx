/**
 * I know the spacing in this page is different from the rest of the site, if not absolutely
 * terrible. However I have to sacrifice beauty for ease of use here: the config bar needs to
 * stay visible the whole time, and it shouldn't take lots of space.
 */
import Editor from "@monaco-editor/react";
import clsx from "clsx";
import { GetServerSideProps, NextPage } from "next";
import { FC, useState } from "react";

import ColourOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import monacoOptions from "@client/config/monaco";
import { useScreenWidth } from "@client/context/screenWidth";
import generateCommentHTML from "@client/lib/generateCommentHTML";
import useCurrentTheme from "@client/lib/getCurrentTheme";
import { all, comment, styles } from "@client/lib/sampleCommentCode";

import Button from "@client/components/buttons";
import Input from "@client/components/forms/input";
import IconLabel from "@client/components/utils/iconAndLabel";
import AppLayout from "@client/layouts/app";

import { IconAndLabel } from "@client/types/utils.type";

import site from "@client/sample/site.json";

type Site = typeof site;
type Props = { site: Site };
type ButtonGroupProps = {
  buttons: (IconAndLabel & { onClick: () => void })[];
  active: number;
};
type EditorTab = "all" | "comment" | "styles";

const editorTabs: EditorTab[] = ["all", "comment", "styles"];
const sampleCode: Record<EditorTab, string> = { all, comment, styles };

const ButtonGroup: FC<ButtonGroupProps> = ({ buttons, active }) => (
  <div
    className={clsx(
      "flex flex-row rounded border divide-x overflow-hidden",
      "border-card divide-neutral-300 dark:divide-neutral-700"
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

const SiteCustomise: NextPage<Props> = ({ site }) => {
  const currentTheme = useCurrentTheme();
  const screenWidth = useScreenWidth();

  const [active, setActive] = useState(0);
  const [code, setCode] = useState(sampleCode);
  const [previewBg, setPreviewBg] = useState("#ffffff");
  const [previewIsDark, setPreviewIsDark] = useState(false);

  return (
    <AppLayout
      title={`Customise | ${site.name}`}
      type="site"
      activeTab="customise"
      siteName={site.name}
      removePadding
    >
      <div className="lg:hidden py-9">
        Please use a laptop or a device with a wider screen to use this feature.
      </div>
      <div
        className={clsx(
          "hidden lg:flex flex-row gap-6 items-center",
          "py-3 bg-neutral-100 dark:bg-neutral-900 sticky top-[49px] z-10"
        )}
      >
        <ButtonGroup
          buttons={[
            { label: "All", onClick: () => setActive(0) },
            { label: "Comment", onClick: () => setActive(1) },
            { label: "Styles", onClick: () => setActive(2) },
          ]}
          active={active}
        />
        <ButtonGroup
          buttons={[
            {
              icon: screenWidth === "lg" ? LightModeOutlinedIcon : undefined,
              label: screenWidth === "lg" ? undefined : "Light",
              onClick: () => {
                setPreviewIsDark(false);
                setPreviewBg("#ffffff");
              },
            },
            {
              icon: screenWidth === "lg" ? DarkModeOutlinedIcon : undefined,
              label: screenWidth === "lg" ? undefined : "Dark",
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
          label="Preview"
          icon={ColourOutlinedIcon}
          value={previewBg}
          onUpdate={setPreviewBg}
          className="w-44"
        />
        <div className="flex-grow" />
        <Button icon={SaveOutlinedIcon} variant="tertiary">
          Save
        </Button>
        <Button icon={DoneOutlinedIcon}>Deploy</Button>
      </div>
      <div className="hidden lg:grid grid-cols-2 gap-6 mb-9">
        <Editor
          height="90vh"
          language={active === 2 ? "css" : "html"}
          value={code[editorTabs[active]]}
          theme={currentTheme === "light" ? "light" : "vs-dark"}
          onChange={newCode => setCode({ ...code, [editorTabs[active]]: newCode })}
          options={monacoOptions}
        />
        <div className="p-6 rounded border border-card" style={{ backgroundColor: previewBg }}>
          <iframe
            srcDoc={generateCommentHTML(code.all, code.comment, code.styles, previewIsDark)}
            sandbox="" // this doesn't make any sense. Why not just sandbox (as boolean)?
            className="w-full h-full"
          />
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { site } });

export default SiteCustomise;

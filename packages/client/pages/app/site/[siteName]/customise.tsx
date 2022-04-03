/**
 * I know the spacing in this page is different from the rest of the site, if not absolutely
 * terrible. However I have to sacrifice beauty for ease of use here: the config bar needs to
 * stay visible the whole time, and it shouldn't take lots of space.
 */
import Editor from "@monaco-editor/react";
import clsx from "clsx";
import { GetServerSideProps, NextPage } from "next";
import { FC, useState } from "react";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import monacoOptions from "@client/config/monaco";
import useCurrentTheme from "@client/lib/getCurrentTheme";

import Button from "@client/components/buttons";
import AppLayout from "@client/layouts/app";

import site from "@client/sample/site.json";

type Site = typeof site;
type Props = { site: Site };
type Language = "html" | "css";
type ButtonGroupProps = { buttons: { label: string; onClick: () => void }[]; active: number };

const languages: Language[] = ["html", "css"];

const sampleCode: Record<Language, string> = {
  html: `<div>Hello World</div>\n`,
  css: `div {
  color: red;
}\n`,
};

const ButtonGroup: FC<ButtonGroupProps> = ({ buttons, active }) => (
  <div
    className={clsx(
      "flex flex-row rounded border divide-x overflow-hidden",
      "border-neutral-300 dark:border-neutral-700 divide-neutral-300 dark:divide-neutral-700"
    )}
  >
    {buttons.map(({ label, onClick }, index) => (
      <button
        key={index}
        onClick={active === index ? undefined : onClick}
        className={clsx(
          "py-1.5 px-6",
          active === index
            ? "bg-indigo-500"
            : "bg-white dark:bg-black hover:bg-neutral-200 dark:hover:bg-neutral-800"
        )}
      >
        {label}
      </button>
    ))}
  </div>
);

const SiteCustomise: NextPage<Props> = ({ site }) => {
  const currentTheme = useCurrentTheme();

  const [activeLang, setActiveLang] = useState(0);
  const [code, setCode] = useState(sampleCode);

  return (
    <AppLayout
      title={`Customise ${site.name}`}
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
          "py-3 bg-neutral-100 dark:bg-neutral-900 sticky top-12 z-10"
        )}
      >
        <ButtonGroup
          buttons={[
            { label: "HTML", onClick: () => setActiveLang(0) },
            { label: "CSS", onClick: () => setActiveLang(1) },
          ]}
          active={activeLang}
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
          language={languages[activeLang]}
          value={code[languages[activeLang]]}
          theme={currentTheme === "light" ? "light" : "vs-dark"}
          onChange={newCode => setCode({ ...code, [activeLang]: newCode })}
          options={monacoOptions}
        />
        <div className="bg-white">
          <iframe
            srcDoc={`<html><head><style>${code.css}</style></head><body>${code.html}</body></html>`}
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

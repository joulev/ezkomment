/**
 * I know the spacing in this page is different from the rest of the site, if not absolutely
 * terrible. However I have to sacrifice beauty for ease of use here: the config bar needs to
 * stay visible the whole time, and it shouldn't take lots of space.
 */
import Editor from "@monaco-editor/react";
import clsx from "clsx";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

import monacoOptions from "@client/config/monaco";
import useCurrentTheme from "@client/lib/getCurrentTheme";

import Button from "@client/components/buttons";
import AppLayout from "@client/layouts/app";

import site from "@client/sample/site.json";

type Site = typeof site;
type Props = { site: Site };

type Language = "html" | "css";

const sampleCode: Record<Language, string> = {
  html: `<div>Hello World</div>\n`,
  css: `div {
  color: red;
}\n`,
};
const description: Record<Language, string> = { html: "HTML", css: "CSS" };

const SiteCustomise: NextPage<Props> = ({ site }) => {
  const currentTheme = useCurrentTheme();

  const [activeLang, setActiveLang] = useState<Language>("html");
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
          "py-3 bg-neutral-100 dark:bg-neutral-900 sticky top-12"
        )}
      >
        <div className="font-semibold text-xl">{description[activeLang]}</div>
        <div className="flex-grow" />
        {activeLang !== "html" && (
          <Button variant="tertiary" onClick={() => setActiveLang("html")}>
            Switch to HTML
          </Button>
        )}
        {activeLang !== "css" && (
          <Button variant="tertiary" onClick={() => setActiveLang("css")}>
            Switch to CSS
          </Button>
        )}
        <Button icon={DoneOutlinedIcon}>Deploy</Button>
      </div>
      <div className="hidden lg:grid grid-cols-2 gap-6 mt-6 mb-9">
        <Editor
          height="90vh"
          language={activeLang}
          value={code[activeLang]}
          theme={currentTheme === "light" ? "light" : "vs-dark"}
          onChange={newCode => setCode({ ...code, [activeLang]: newCode })}
          options={monacoOptions}
          className="-z-10"
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

import Editor from "@monaco-editor/react";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

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
    >
      {/*<Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />*/}
      <div className="lg:hidden">
        Please use a laptop or a device with a wider screen to use this feature.
      </div>
      <div className="hidden lg:grid grid-cols-2 gap-6">
        <div>
          <div className="flex flex-row gap-6 items-center mb-6">
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
          <Editor
            height="90vh"
            language={activeLang}
            value={code[activeLang]}
            theme={currentTheme === "light" ? "light" : "vs-dark"}
            onChange={newCode => setCode({ ...code, [activeLang]: newCode })}
            options={{
              minimap: { enabled: false },
              lineHeight: 1.4,
              fontSize: 12,
            }}
          />
        </div>
        <div className="bg-white">
          <iframe
            srcDoc={`<html><head><style>${code.css}</style></head><body>${code.html}</body></html>`}
            sandbox="" // this doesn't make any sense. Why not just sandbox?
            className="w-full h-full"
          />
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => ({ props: { site } });

export default SiteCustomise;

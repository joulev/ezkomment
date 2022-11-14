import { highlight, languages } from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-http";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";

export type Props = React.PropsWithChildren<{ className?: string }>;

export default function CodeBlock({ children, className }: Props) {
  const language = className?.replace(/language-/, "");
  if (!language || !children) return <code>{children}</code>;
  const rendered = highlight(String(children), languages[language], language);
  return <code dangerouslySetInnerHTML={{ __html: rendered }} />;
}

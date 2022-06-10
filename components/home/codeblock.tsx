import { FC } from "react";

/**
 * A wrapper for all code blocks in the home page. Here to avoid code duplication. Should be a direct
 * child of `<Window>`.
 *
 * @param props.codeHtml The HTML of the code section. Should be the output of Prism as a HTML string.
 */
const CodeBlock: FC<{ codeHtml: string }> = ({ codeHtml }) => (
  <div className="overflow-x-auto no-scrollbar text-sm p-3">
    <pre>
      <code className="whitespace-pre" dangerouslySetInnerHTML={{ __html: codeHtml }} />
    </pre>
  </div>
);

export default CodeBlock;

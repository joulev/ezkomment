import { highlight, languages } from "prismjs";
import { renderToStaticMarkup } from "react-dom/server";

import { PrismOptions } from "~/types/utils.type";

function addLineNumbers(codeHtml: string, lineNumberFrom: number) {
  const lines = codeHtml.split("\n");
  const maxLineNo = lineNumberFrom + lines.length - 1;
  const maxLength = Math.max(lineNumberFrom.toString().length, maxLineNo.toString().length);
  return lines
    .map(
      (line, index) =>
        renderToStaticMarkup(
          <span
            className="comment linenumber inline-block mr-6 text-right select-none"
            style={{ minWidth: maxLength + "ch" }}
          >
            {index + lineNumberFrom}
          </span>
        ) + line
    )
    .join("\n");
}

function highlightLines(codeHtml: string, highlighted: number[], lineNumberFrom?: number) {
  const addedLineNo = lineNumberFrom ?? 1;
  return codeHtml
    .split("\n")
    .map((line, index) =>
      highlighted.includes(index + addedLineNo)
        ? `<span>${line}</span>`
        : `<span class="ignored">${line}</span>`
    )
    .join("\n");
}

/**
 * Highlight a code block with Prism. This can be used on server-side, contrary to most Prism
 * plugins which rely on DOM so have to be used on client-side exclusively.
 *
 * @param code The code to be highlighted
 * @param options The options that can be used to customise the output. See utils.type.ts for more
 * details.
 * @returns The highlighted code as a valid HTML string
 */
export default function prism(code: string, options: PrismOptions): string {
  let rendered = highlight(code, languages[options.language], options.language);
  if (options.lineNumberFrom) rendered = addLineNumbers(rendered, options.lineNumberFrom);
  if (options.highlighted)
    rendered = highlightLines(rendered, options.highlighted, options.lineNumberFrom);
  return rendered;
}

import { highlight, languages } from "prismjs";

import { PrismLanguage, PrismOptions } from "@client/types/utils.type";

const defaultPrism = (code: string, language: PrismLanguage) =>
    highlight(code, languages[language], language);

export default function prism(code: string, options: PrismOptions): string {
    let rendered = defaultPrism(code, options.language);
    if (options.lineNumberFrom !== undefined) {
        const lines = rendered.slice(0, -1).split("\n");
        const minLineNo = options.lineNumberFrom;
        const maxLineNo = minLineNo + lines.length - 1;
        const maxLength = Math.max(minLineNo.toString().length, maxLineNo.toString().length);
        rendered =
            lines
                .map(
                    (line, index) =>
                        '<span class="comment linenumber"' +
                        'style="display:inline-block;min-width:' +
                        maxLength +
                        'ch;margin-right:1em;text-align:right;user-select:none">' +
                        (minLineNo + index) +
                        "</span>" +
                        line
                )
                .join("\n") + "\n";
    }
    return rendered;
}

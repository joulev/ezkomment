import escapeStringRegexp from "escape-string-regexp";
// Something like is-even. May look useless, but I'm not reinventing the wheel.
import mergeRanges from "merge-ranges";

const config = {
    previewLength: 100,
    leftMargin: 20,
};

type DocCache = {
    source: string;
    title: string;
    content: string;
};

/**
 * Doing what the function name dictates.
 *
 * @param content The content of the file to search in
 * @param posArray In form of [[start1, end1], [start2, end2] ...]
 * @returns An array of objects that describes the preview display
 */
function getHighlightedPreview(content: string, posArray: [number, number][]) {
    const previewStartPos = Math.max(posArray[0][0] - config.leftMargin, 0);
    const previewEndPos = previewStartPos + config.previewLength;

    let preview: { text: string; highlight: boolean }[] = [];

    if (posArray[0][0] > previewStartPos) {
        preview.push({
            text: content.substring(previewStartPos, posArray[0][0]),
            highlight: false,
        });
    }

    for (let index = 0; index < posArray.length; index++) {
        const [start, end] = posArray[index];
        if (start >= previewEndPos) break;
        preview.push({
            text: content.substring(start, Math.min(end, previewEndPos)),
            highlight: true,
        });
        if (end >= previewEndPos) break;
        preview.push({
            text: content.substring(
                end,
                Math.min(
                    index === posArray.length - 1 ? Infinity : posArray[index + 1][0],
                    previewEndPos
                )
            ),
            highlight: false,
        });
    }

    return preview;
}

/**
 * Search for a query in a documentation file
 *
 * @param docs The entry of a documentation file in docs/cache.json
 * @param words The words to query
 * @returns Information about the search result
 */
export function findMatchInDocContent({ content, source, title }: DocCache, words: string[]) {
    const matches = words
        .map<[number, number][]>(word =>
            Array.from(content.matchAll(new RegExp(escapeStringRegexp(word), "gi"))).map(a => [
                a?.index ?? 0,
                (a?.index ?? 0) + a[0].length,
            ])
        )
        .flat()
        .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const matchesMerged = mergeRanges(matches);
    return {
        source,
        title,
        matchCount: matches.length,
        preview: matches.length > 0 ? getHighlightedPreview(content, matchesMerged) : [],
    };
}

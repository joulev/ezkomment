import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { PreviewComment } from "~/types/client/utils.type";

export const comments = [
    {
        author: "John Doe",
        text: "This is a great post. I like it.",
        date: "3 months ago",
    },
    {
        author: "Jane Doe",
        text: "I think there is a mistake when you talk about CSS, but otherwise it is a great post.",
        date: "1 year ago",
    },
];

// https://stackoverflow.com/a/42308842
const serverJs = `
window.addEventListener('message', function (event) {
    if (event.data == "FrameHeight") {
        var body = document.body, html = document.documentElement;
        var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        event.source.postMessage({ "FrameHeight": height }, "*");
    }
});`;

/**
 * Construct a preview HTML for the given templates in the /site/[siteName]/customise page
 * @deprecated
 * @param allTemplate The template for the whole comment section, with a placeholder `<COMMENTS>`
 * to insert comments in
 * @param commentTemplate The template for each comment, with placeholders `<AUTHOR>`, `<TIME>` and
 * `<CONTENT>`
 * @param styles The CSS styles
 * @param addDarkClass Whether to add `.dark` to `<body>` or not
 * @returns The preview HTML
 */
export default function generateCommentHTML(
    allTemplate: string,
    commentTemplate: string,
    styles: string,
    commentList?: typeof comments,
    addDarkClass: boolean = false
) {
    const commentHTML = (commentList ?? comments).map(comment => {
        const commentTemplateWithData = commentTemplate
            .replace("<AUTHOR>", comment.author)
            .replace("<TIME>", comment.date)
            .replace("<CONTENT>", comment.text);
        return commentTemplateWithData;
    });
    const allComments = commentHTML.join("");
    const allTemplateWithData = allTemplate.replace("<COMMENTS>", allComments);
    return `<html><head><style>${styles}</style></head><body${
        addDarkClass ? ' class="dark"' : ""
    }>${allTemplateWithData}<script>${serverJs}</script></body></html>`;
}

export async function generatePreviewHTML(
    html: string,
    comments: PreviewComment[],
    isDark?: boolean
) {
    if (typeof window === "undefined") throw new Error("This should be run on client side");
    const remark = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify);
    const commentHTML = await Promise.all(
        comments.map(async ({ author, content, date }) => ({
            author,
            date,
            content: String(await remark.process(content)),
        }))
    );

    const htmlDom = new DOMParser().parseFromString(html, "text/html");
    const doc = htmlDom.documentElement;
    const commentWrapper = doc.querySelector("[data-ezk=comments]");
    if (!commentWrapper) return html;

    const commentFrameHTML = commentWrapper.innerHTML;
    commentWrapper.innerHTML =
        commentHTML.length > 0
            ? ""
            : "<div>There are no comments yet. Be the first to join the conversation.</div>";

    for (let i = 0; i < commentHTML.length; i++) {
        const commentDom = new DOMParser().parseFromString(commentFrameHTML, "text/html");
        const commentDoc = commentDom.documentElement;
        const author = commentDoc.querySelector("[data-ezk='comment-author']");
        const date = commentDoc.querySelector("[data-ezk='comment-date']");
        const content = commentDoc.querySelector("[data-ezk='comment-content']");
        if (author) author.textContent = commentHTML[i].author ?? "Anonymous";
        if (date) date.textContent = commentHTML[i].date;
        if (content) content.innerHTML = commentHTML[i].content;
        commentWrapper.appendChild(commentDom.body.firstChild as ChildNode);
    }

    if (isDark) doc.classList.add("dark");

    return new XMLSerializer().serializeToString(doc);
}

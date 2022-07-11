import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { PreviewComment } from "~/types/client/utils.type";

export default async function generatePreviewHTML(
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

    for (const comment of commentHTML) {
        const commentDom = new DOMParser().parseFromString(commentFrameHTML, "text/html");
        const commentDoc = commentDom.documentElement;
        const author = commentDoc.querySelector("[data-ezk='comment-author']");
        const date = commentDoc.querySelector("[data-ezk='comment-date']");
        const content = commentDoc.querySelector("[data-ezk='comment-content']");
        if (author) author.textContent = comment.author ?? "Anonymous";
        if (date) date.textContent = comment.date;
        if (content) content.innerHTML = comment.content;
        commentWrapper.appendChild(commentDom.body.firstChild as ChildNode);
    }

    if (isDark) doc.classList.add("dark");

    return new XMLSerializer().serializeToString(doc);
}

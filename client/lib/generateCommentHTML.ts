import { JSDOM } from "jsdom";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { PreviewComment } from "~/types/client/utils.type";

// Probably will integrate this to the build chain and compress it.
const extraScript = (apiURL: string) => `const apiURL = "${apiURL}";
let hasFocus = false;
let isVisible = false;
let blockValidate = false;
let COMMENTDIVCONTENT = "";

function handler() {
  validate();
  blockValidate = true;
  setTimeout(() => (blockValidate = false), 1000);
}

function sendFrameHeight() {
  const height = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  window.parent.postMessage({ EzkFrameHeight: height }, "*");
}

function initialise() {
  document.addEventListener("visibilitychange", () => {
    isVisible = document.visibilityState === "visible";
    if (hasFocus && isVisible && !blockValidate) handler();
  });
  window.addEventListener("focus", () => {
    hasFocus = true;
    if (hasFocus && isVisible && !blockValidate) handler();
  });
  window.addEventListener("message", event => {
    if (event.data.hasOwnProperty("EzkFrameHeight")) sendFrameHeight();
  });
  document.querySelector("[data-ezk=form]").addEventListener("submit", onFormSubmit);
}

async function validate() {
  const comments = await fetch(apiURL).then(res => res.json());
  const commentsDiv = document.querySelector("[data-ezk=comments]");
  if (COMMENTDIVCONTENT === "") COMMENTDIVCONTENT = commentsDiv.innerHTML;
  commentsDiv.innerHTML = comments.length > 0
    ? ""
    : "<div>There are no comments yet. Be the first to join the conversation.</div>";
  comments.forEach(({ author, text, date }) => {
    const commentDocument = new DOMParser().parseFromString(COMMENTDIVCONTENT, "text/html");
    const authorEl = commentDocument.querySelector("[data-ezk='comment-author']");
    const contentEl = commentDocument.querySelector("[data-ezk='comment-content']");
    const dateEl = commentDocument.querySelector("[data-ezk='comment-date']");
    if (authorEl) authorEl.textContent = (author && author.length > 0) ? author : "Anonymous";
    if (contentEl) contentEl.innerHTML = text; // already rendered safely on server side
    if (dateEl) dateEl.textContent = date;
    commentsDiv.innerHTML += commentDocument.body.innerHTML;
  });
  sendFrameHeight();
}

async function onFormSubmit(event) {
  event.preventDefault();
  const authorField = document.querySelector("[data-ezk='form-author']");
  const commentField = document.querySelector("[data-ezk='form-content']");
  const comment = { author: authorField.value, text: commentField.value };
  authorField.value = "";
  commentField.value = "";
  await fetch(apiURL, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: { "Content-Type": "application/json" },
  });
  await validate();
}

window.addEventListener("load", () => {
  initialise();
  validate();
});`;

export function generateCommentHTML(html: string, apiURL: string, isDark?: boolean) {
    if (typeof window !== "undefined") throw new Error("This function should be ran on the server");
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const script = document.createElement("script");
    script.textContent = extraScript(apiURL);
    document.body.appendChild(script);
    if (isDark) document.documentElement.classList.add("dark");
    return dom.serialize();
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

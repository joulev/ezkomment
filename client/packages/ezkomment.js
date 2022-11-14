/* eslint-disable import/no-anonymous-default-export */
import { format } from "https://unpkg.com/timeago.js?module";
import rehypeExternalLinks from "https://cdn.skypack.dev/rehype-external-links@1?min";
import rehypeRaw from "https://cdn.skypack.dev/rehype-raw@6?min";
import rehypeSanitize from "https://cdn.skypack.dev/rehype-sanitize@5?min";
import rehypeStringify from "https://cdn.skypack.dev/rehype-stringify@9?min";
import remarkGfm from "https://cdn.skypack.dev/remark-gfm@3?min";
import remarkParse from "https://cdn.skypack.dev/remark-parse@10?min";
import remarkRehype from "https://cdn.skypack.dev/remark-rehype@10?min";
import { unified } from "https://cdn.skypack.dev/unified@10?min";

/**
 * @param {string} md Markdown code
 * @returns HTML code
 */
async function md2html(md) {
    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeExternalLinks, { target: "_blank", rel: ["nofollow", "noopener", "noreferrer"] })
        .use(rehypeSanitize)
        .use(rehypeStringify);
    return String(await processor.process(md));
}

/** @param {{ pageId: string, getURL: string, postURL: string }} props */
export default function ({ pageId, getURL, postURL }) {
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
        const formEl = document.querySelector("[data-ezk=form]");
        if (!formEl) throw new Error("ezkomment error: no 'data-ezk=form' element found");
        formEl.addEventListener("submit", onFormSubmit);
    }

    async function validate() {
        const res = await fetch(getURL);
        if (!res.ok) throw new Error("ezkomment error: failed to fetch comments");
        /** @type {{ author: string, text: string, date: number }[]} */
        const comments = await res.json();
        const commentsDiv = document.querySelector("[data-ezk=comments]");
        if (!commentsDiv) throw new Error("ezkomment error: no 'data-ezk=comments' element found");
        if (COMMENTDIVCONTENT === "") COMMENTDIVCONTENT = commentsDiv.innerHTML;
        commentsDiv.innerHTML =
            comments.length > 0
                ? ""
                : "<div>There are no comments yet. Be the first to join the conversation.</div>";
        for (const { author, text, date } of comments) {
            const commentDocument = new DOMParser().parseFromString(COMMENTDIVCONTENT, "text/html");
            const authorEl = commentDocument.querySelector("[data-ezk='comment-author']");
            const contentEl = commentDocument.querySelector("[data-ezk='comment-content']");
            const dateEl = commentDocument.querySelector("[data-ezk='comment-date']");
            if (authorEl) authorEl.textContent = author && author.length > 0 ? author : "Anonymous";
            if (contentEl)
                contentEl.innerHTML =
                    text && text.length > 0 ? await md2html(text) : "(no comment body)"; // already rendered safely on server side
            if (dateEl) dateEl.textContent = format(date);
            commentsDiv.innerHTML += commentDocument.body.innerHTML;
        }
        sendFrameHeight();
    }

    /** @param {Event} event */
    async function onFormSubmit(event) {
        event.preventDefault();
        /** @type {HTMLInputElement | null} */
        const authorField = document.querySelector("[data-ezk='form-author']");
        if (!authorField)
            throw new Error("ezkomment error: no 'data-ezk=form-author' element found");
        /** @type {HTMLInputElement | null} */
        const commentField = document.querySelector("[data-ezk='form-content']");
        if (!commentField)
            throw new Error("ezkomment error: no 'data-ezk=form-content' element found");

        const comment = { author: authorField.value, text: commentField.value, pageId };
        authorField.value = "";
        commentField.value = "";
        await fetch(postURL, {
            method: "POST",
            body: JSON.stringify(comment),
            headers: { "Content-Type": "application/json" },
        });
        await validate();
    }

    window.addEventListener("load", () => {
        initialise();
        validate();
    });
}

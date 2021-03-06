/* eslint-disable import/no-anonymous-default-export */
// @ts-check
// @ts-ignore
import { format } from "https://unpkg.com/timeago.js?module";

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
        /** @type {{ data: { author: string, text: string, date: number }[] }} */
        const { data: comments } = await fetch(getURL).then(res => res.json());
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
                contentEl.innerHTML = text && text.length > 0 ? text : "(no comment body)"; // already rendered safely on server side
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

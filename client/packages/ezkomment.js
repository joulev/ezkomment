// We will pass the URL to fetch comments and post comments as keyword argument.

const ezkomment = ({ pageId, getURL, postURL }) => {
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
        const { data: comments } = await fetch(getURL).then(res => res.json());
        const commentsDiv = document.querySelector("[data-ezk=comments]");
        if (COMMENTDIVCONTENT === "") COMMENTDIVCONTENT = commentsDiv.innerHTML;
        commentsDiv.innerHTML =
            comments.length > 0
                ? ""
                : "<div>There are no comments yet. Be the first to join the conversation.</div>";
        comments.forEach(({ author, text, date }) => {
            const commentDocument = new DOMParser().parseFromString(COMMENTDIVCONTENT, "text/html");
            const authorEl = commentDocument.querySelector("[data-ezk='comment-author']");
            const contentEl = commentDocument.querySelector("[data-ezk='comment-content']");
            const dateEl = commentDocument.querySelector("[data-ezk='comment-date']");
            if (authorEl) authorEl.textContent = author && author.length > 0 ? author : "Anonymous";
            if (contentEl) contentEl.innerHTML = text; // already rendered safely on server side
            /**
             * With the current implementation, date is a Timestamp object, and will be render
             * as `[object Object]`
             *
             * I think I will process the data on the server.
             * Format is
             */
            if (dateEl) dateEl.textContent = new Date(date).toLocaleString("en-GB");
            commentsDiv.innerHTML += commentDocument.body.innerHTML;
        });
        sendFrameHeight();
    }

    async function onFormSubmit(event) {
        event.preventDefault();
        const authorField = document.querySelector("[data-ezk='form-author']");
        const commentField = document.querySelector("[data-ezk='form-content']");
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
};

export default ezkomment;

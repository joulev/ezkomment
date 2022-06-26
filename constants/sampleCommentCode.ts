const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      @import "https://unpkg.com/tailwindcss@3.1.4/src/css/preflight.css";
      :root {
        --body-color: #111;
        --border-color: #ccc;
        --muted-color: #888;
        --bg-color: #eee;
      }
      .dark {
        --body-color: #eee;
        --border-color: #444;
        --muted-color: #777;
        --bg-color: #111;
      }
      html,
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
          sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: var(--body-color);
      }
      code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
          "Courier New", monospace;
        font-size: 0.9rem;
      }
      main {
        display: flex;
        flex-direction: column;
      }
      main .comment {
        border-top-width: 1px;
        border-color: var(--border-color);
        padding: 1.5rem 0;
      }
      main .comment:last-child {
        border-bottom-width: 1px;
      }
      .comment__metadata {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      .comment__author {
        font-weight: bold;
        font-size: 1.1rem;
      }
      .comment__date {
        color: var(--muted-color);
      }
      .comment__content :is(p, ul, ol) {
        margin-bottom: 1.5rem;
      }
      .comment__content :is(p, ul, ol):last-child {
        margin-bottom: 0;
      }
      .comment__content ul {
        list-style-type: disc;
        list-style-position: inside;
        margin-left: 1.5rem;
      }
      .comment__content ol {
        list-style-type: decimal;
        list-style-position: inside;
        margin-left: 1.5rem;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1.5rem;
      }
      .form__author,
      .form__content {
        border-radius: 4px;
        border: 1px solid var(--border-color);
        padding: 0.5rem 0.75rem;
        background-color: transparent;
        transition-property: border-color;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      .form__author:focus,
      .form__content:focus {
        outline: none;
        border-color: var(--muted-color);
      }
      .form__info {
        color: var(--muted-color);
        font-size: 0.75rem;
      }
      .form__submit-button {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      button {
        padding: 0.5rem 2rem;
        font-size: 1rem;
        border-radius: 0.3rem;
        border-width: 1px;
        border-style: solid;
        transition-property: background-color color;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      form:invalid button {
        cursor: not-allowed;
        border-color: var(--border-color);
        background-color: var(--border-color);
        color: var(--muted-color);
      }
      form:valid button {
        cursor: pointer;
        border-color: var(--body-color);
        background-color: var(--body-color);
        color: var(--bg-color);
      }
      form:valid button:hover {
        background-color: transparent;
        color: var(--body-color);
      }
    </style>
  </head>
  <body>
    <main data-ezk="comments">
      <div class="comment">
        <div class="comment__metadata">
          <div data-ezk="comment-author" class="comment__author"></div>
          <div data-ezk="comment-date" class="comment__date"></div>
        </div>
        <div data-ezk="comment-content" class="comment__content"></div>
      </div>
    </main>
    <form data-ezk="form">
      <input
        data-ezk="form-author"
        class="form__author"
        placeholder="Display name (optional)"
        name="author"
      />
      <textarea
        data-ezk="form-content"
        class="form__content"
        placeholder="Comment here. Markdown is supported."
        name="content"
        required
      ></textarea>
      <div class="form__info">
        The comment section is moderated. Your comment will be displayed after it is approved by the
        site admin.
      </div>
      <div class="form__submit-button"><button type="submit">Post</button></div>
    </form>
  </body>
</html>
`;

export default html;

export const all = `<div class="container">
  <COMMENTS>
  <form>
    <input placeholder="Display name" name="name" required>
    <input placeholder="Email (optional)" name="email">
    <textarea placeholder="Content" name="content" required></textarea>
    <div class="form-bottom">
      <span>Styling with Markdown is supported</span>
      <button type="submit">Post</button>
    </div>
  </form>
</div>\n`;

export const comment = `<div class="comment">
  <div class="metadata">
    <div class="author"><AUTHOR></div>
    <div class="time"><TIME></div>
  </div>
  <div class="text">
    <CONTENT>
  </div>
</div>\n`;

export const styles = `:root {
  --body-color: #111;
  --border-color: #ccc;
  --muted-color: #888;
  --bg-color: #eee;
}
body.dark {
  --body-color: #eee;
  --border-color: #444;
  --muted-color: #777;
  --bg-color: #111;
}

html, body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.container {
  display: flex;
  flex-direction: column;
  color: var(--body-color);
}
.container > .comment {
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
}
.container > .comment:last-of-type {
  border-bottom: 1px solid var(--border-color);
}

.metadata {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
}

.author {
  font-weight: bold;
}
.time {
  color: var(--muted-color);
  font-size: .9rem;
}

.text {
  font-size: .9rem;
}
.text > *:last-child {
  margin-bottom: 0;
}

form {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

textarea, .form-bottom {
  grid-column: span 2 / span 2;
}

input, textarea {
  font-family: inherit;
  font-size: .9rem;
  background-color: transparent;
  color: var(--body-color);
  padding: .5rem .75rem;
  border-radius: .3rem;
  border: 1px solid var(--border-color);
  transition-property: border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--body-color);
}

.form-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.form-bottom span {
  font-size: .7rem;
  color: var(--muted-color);
}

.form-bottom button {
  padding: .5rem 2rem;
  font-size: 1rem;
  border-radius: .3rem;
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
  color: var(--muted-color)
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
}\n`;

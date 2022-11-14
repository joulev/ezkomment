# Customisation

> This feature assumes you have a basic knowledge of HTML and (browser) vanilla JavaScript.

All pages are given a default HTML template and styling by ezkomment. However, in many occasions you may want to restyle the comment section to make it fit your website design more. You can do so by tweaking the default template ezkomment gives you.

The template is a normal HTML file that will be used to render the comment section. ezkomment will determine certain HTML elements to add value to by searching for elements with the `data-ezk` attribute.

Templates are at the site level, in other words, you cannot configure templates for each individual page, but only for each site. You can configure it [in the customise page](/docs/customisation/customise-site-template).

You can also use this page to play and experiment with this feature with an editor and a preview frame provided.

## The comment section

The comment section is marked with `data-ezk="comments"`.

> One element with `data-ezk="comments"` is required. You _may_ add more than element, but at the current implementation only the first element will be considered, and it may break at any time. Therefore, please add **exactly one** `data-ezk="comments"` HTML element to the template.

The `innerHTML` of this HTML element is taken as one single comment, so when everything is rendered, this `innerHTML` will be replicated for every single (approved) comment that you have.

For example, if your ezkomment page has three comments and the template includes

```html
<div data-ezk="comments">
  <p>Hello world</p>
</div>
```

then in the rendered version, it will become

```html
<div data-ezk="comments">
  <p>Hello world</p>
  <p>Hello world</p>
  <p>Hello world</p>
</div>
```

Within this `innerHTML`, corresponding for one comment, you can have three elements:

- `data-ezk="comment-author"`: This element will be filled with the comment author name, or "Anonymous" if no author name is available.

- `data-ezk="comment-content"`: This element will be filled with the (sanitised) HTML of the comment (XSS attacks are not possible).

- `data-ezk="comment-date"`: This element will be filled with the comment date relative to the time it was fetched (e.g. 3 hours ago, 5 months ago, etc.)

Similar to `data-ezk="comments"`, for each of these `data-ezk` attribute values, only the first matching element is considered, and we recommend to use **exactly one** element with that value.

For example, with the following comments

```json
[
  {
    "author": null,
    "content": "<p>Hello, world</p>",
    "dateFromNow": "8 hours ago"
  },
  {
    "author": "John Doe",
    "content": "<p>Bye, <strong>Earth</strong></p>",
    "dateFromNow": "2 days ago"
  }
]
```

then the following section (part of the [default template](https://github.com/joulev/ezkomment/blob/prod/templates/default.html))

```html
<main data-ezk="comments">
  <div class="comment">
    <div class="comment__metadata">
      <div data-ezk="comment-author" class="comment__author"></div>
      <div data-ezk="comment-date" class="comment__date"></div>
    </div>
    <div data-ezk="comment-content" class="comment__content"></div>
  </div>
</main>
```

will be compiled to

```html
<main data-ezk="comments">
  <div class="comment">
    <div class="comment__metadata">
      <div data-ezk="comment-author" class="comment__author">Anonymous</div>
      <div data-ezk="comment-date" class="comment__date">8 hours ago</div>
    </div>
    <div data-ezk="comment-content" class="comment__content">
      <p>Hello, world</p>
    </div>
  </div>
  <div class="comment">
    <div class="comment__metadata">
      <div data-ezk="comment-author" class="comment__author">John Doe</div>
      <div data-ezk="comment-date" class="comment__date">2 days ago</div>
    </div>
    <div data-ezk="comment-content" class="comment__content">
      <p>Bye, <strong>Earth</strong></p>
    </div>
  </div>
</main>
```

## The submit form

The form is marked by a `<form>` element with `data-ezk="form"`. Once again, only the first element with this `data-ezk` attribute value will be considered, so once again, use **exactly one** `<form>` element with this value.

```html
<form data-ezk="form">
  <!-- this form is used to submit new comments -->
</form>
```

The form content should include two elements with the following `data-ezk` attribute values:

- `data-ezk="form-author"`: An input element for commenters to input their display name.

- `data-ezk="form-content"`: An input element for commenters to input their comment. Markdown is supported here. This `<input>` (or `<textarea>` if you want) should have a `required` attribute, since we require that every comment must include a comment body.

On load, this form will be assigned an event handler on submit (`addEventListener("submit", handler)`). This handler will send the `.value` of the above two elements to submit the comment.

The following HTML code, taken from the default template, is an example of such a form.

```html
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
    placeholder="Comment here. Basic Markdown syntaxes are supported."
    name="content"
    required
  ></textarea>
  <div class="form__info">
    The comment section may be moderated, so your comment may not appear immediately.
  </div>
  <div class="form__submit-button"><button type="submit">Post</button></div>
</form>
```

## How it goes altogether

We will use your template (or the default template) and include a small ES6 module (at most 6 kB) to handle several tasks:

- Periodically fetch new comments and [render it to the template](#the-comment-section)

- [Send the `EzkFrameHeight` message to the parent window](/docs/comments/embed#frame-height)

- [Add the submit listener to the form](#the-submit-form)

The module is necessary for the whole thing to work, therefore ezkomment comment sections **does not support browsers with JavaScript disabled**.

The module also exposes one constant named `ezkomment`, therefore please do not name your global variables `ezkomment`. In fact, for ease in transitioning to later versions of ezkomment, we recommend you to not use anything that includes `ezkomment` as variable names.

## Customise your template

Other than some requirements mentioned above, you are free to use any valid HTML code to write your template. Of course, you can style your template with CSS (`<style>`) however you want, and all JavaScript libraries can be used.

### Dark mode

When customising your template, you may want to add styling for dark modes too. That is possible: if you embed the page with `?dark` ([see more](/docs/comments/embed#dark-mode)), the `<html>` element will be given the class `dark`, so you can style like so (this is taken from the default template)

```css
:root {
  --body-color: #111;
  --border-color: #ccc;
  --muted-color: #888;
  --bg-color: #eee;
  --indigo: #6366f1;
}
.dark {
  --body-color: #eee;
  --border-color: #444;
  --muted-color: #777;
  --bg-color: #111;
}
```

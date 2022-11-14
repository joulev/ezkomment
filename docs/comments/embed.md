# Embed the comment section

As usual, you can add this one-liner to your HTML to embed the comment section.

```html
<!-- Plain HTML -->
<iframe src="https://ezkomment.joulev.dev/embed/⟨siteId⟩/⟨pageId⟩"></iframe>
```

If you use front-end frameworks, such as React, Vue, etc., consult their documentation on how to add the `<iframe>` tag to your page.

## Frame height

By default, [the height of `<iframe>` is 150 pixels](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-height). Due to security concerns, configuring the `<iframe>` height to automatically adjust according to `<iframe>` content [has been rather difficult](https://stackoverflow.com/q/9975810). ezkomment tackles this issue by providing a simple communication API based on [`Window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

Every time the comment section detects possible changes in content height, it will send a message to the parent document. The message has the following format:

```json
{
  "EzkFrameHeight": 123 // number
}
```

You can then use this number to dynamically update the `<iframe>` height accordingly. For example, in vanilla JavaScript you can do

```html
<iframe id="embedded-comments" src="https://ezkomment.joulev.dev/embed/⟨siteId⟩/⟨pageId⟩"></iframe>
<script>
  window.addEventListener("message", event => {
    if (event.data.hasOwnProperty("EzkFrameHeight"))
      document.getElementById("embedded-comments").style.height = event.data.EzkFrameHeight + "px";
  });
</script>
```

You can [see an example](https://ezkomment.joulev.dev/sample/index.html) and [its source code](https://github.com/joulev/ezkomment/blob/prod/public/sample/index.html) to see more.

React users can also see [the official ezkomment demo](https://demo.ezkomment.joulev.dev).

## Dark mode

ezkomment comment sections support dark mode variants. To use dark mode, you simply have to use `dark` URL param:

```
https://ezkomment.joulev.dev/embed/⟨siteId⟩/⟨pageId⟩?dark
                                                    ^^^^^
```
